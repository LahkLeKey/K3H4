import { Prisma, type PrismaClient } from "@prisma/client";
import { type FastifyInstance } from "fastify";
import { buildTelemetryBase } from "./telemetry";
import { type RecordTelemetryFn } from "./types";

const OSRM_BASE = process.env.OSRM_URL || "https://router.project-osrm.org";

const serializeLoad = (load: any) => ({
  ...load,
  distanceKm: load.distanceKm instanceof Prisma.Decimal ? load.distanceKm.toFixed(2) : load.distanceKm,
  cost: load.cost instanceof Prisma.Decimal ? load.cost.toFixed(2) : load.cost,
});

async function fetchOsrmRoute(origin: { lat: number; lng: number }, dest: { lat: number; lng: number }) {
  try {
    const coords = `${origin.lng},${origin.lat};${dest.lng},${dest.lat}`;
    const res = await fetch(`${OSRM_BASE}/route/v1/driving/${coords}?overview=full&geometries=geojson`);
    if (!res.ok) throw new Error(`OSRM ${res.status}`);
    const data = (await res.json()) as { routes?: Array<{ distance?: number; duration?: number; geometry?: any }> };
    const route = data.routes?.[0];
    if (!route?.distance || !route?.duration) throw new Error("Route unavailable");
    return {
      distanceKm: route.distance / 1000,
      durationMinutes: Math.round(route.duration / 60),
      geojson: route.geometry,
    };
  } catch (err) {
    return { distanceKm: 0, durationMinutes: 0, geojson: null };
  }
}

export function registerFreightRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  server.get(
    "/freight",
    { preHandler: [server.authenticate] },
    async (request) => {
      const userId = (request.user as { sub: string }).sub;
      const loads = await prisma.freightLoad.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: "freight.list",
        source: "api",
        payload: { count: loads.length },
      });
      return { loads: loads.map(serializeLoad) };
    },
  );

  server.post(
    "/freight",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as {
        title?: string;
        originName?: string;
        originLat?: number;
        originLng?: number;
        destinationName?: string;
        destinationLat?: number;
        destinationLng?: number;
        ratePerKm?: number;
      } | undefined;

      const required = [body?.title, body?.originName, body?.destinationName];
      if (required.some((v) => !v || String(v).trim().length === 0)) {
        return reply.status(400).send({ error: "title, originName, destinationName are required" });
      }
      const originLat = Number(body?.originLat);
      const originLng = Number(body?.originLng);
      const destinationLat = Number(body?.destinationLat);
      const destinationLng = Number(body?.destinationLng);
      if (![originLat, originLng, destinationLat, destinationLng].every((n) => Number.isFinite(n))) {
        return reply.status(400).send({ error: "origin/destination coordinates are required" });
      }

      const osrm = await fetchOsrmRoute({ lat: originLat, lng: originLng }, { lat: destinationLat, lng: destinationLng });
      const distance = osrm.distanceKm || 0;
      const ratePerKm = Number(body?.ratePerKm ?? 2);
      const cost = new Prisma.Decimal((distance * ratePerKm).toFixed(2));

      const load = await prisma.freightLoad.create({
        data: {
          userId,
          title: body?.title?.trim() || "Freight load",
          originName: body?.originName?.trim() || "Origin",
          originLat,
          originLng,
          destinationName: body?.destinationName?.trim() || "Destination",
          destinationLat,
          destinationLng,
          distanceKm: new Prisma.Decimal(distance.toFixed(2)),
          durationMinutes: osrm.durationMinutes,
          cost,
          status: "planning",
          routeGeoJson: osrm.geojson,
        },
      });

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: "freight.create",
        source: "api",
        payload: { distanceKm: distance, cost: cost.toFixed(2) },
      });

      return { load: serializeLoad(load) };
    },
  );

  server.post(
    "/freight/:id/complete",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const id = (request.params as { id: string }).id;

      const load = await prisma.freightLoad.findFirst({ where: { id, userId } });
      if (!load) return reply.status(404).send({ error: "Freight load not found" });
      if (load.status === "completed") return reply.status(400).send({ error: "Load already completed" });

      try {
        const { nextBalance, updated } = await prisma.$transaction(async (tx) => {
          const user = await tx.user.findUnique({ where: { id: userId }, select: { k3h4CoinBalance: true } });
          if (!user) throw new Error("User not found");

          const cost = new Prisma.Decimal(load.cost.toFixed(2));
          const nextBalance = user.k3h4CoinBalance.sub(cost);
          const savedUser = await tx.user.update({ where: { id: userId }, data: { k3h4CoinBalance: nextBalance } });
          await tx.bankTransaction.create({
            data: {
              userId,
              amount: cost,
              direction: "debit",
              kind: "freight_payment",
              note: `Freight load ${load.title}`,
              balanceAfter: savedUser.k3h4CoinBalance,
            },
          });

          const updated = await tx.freightLoad.update({ where: { id }, data: { status: "completed" } });
          return { nextBalance, updated };
        });

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: "freight.complete",
          source: "api",
          payload: { id, cost: load.cost.toFixed(2) },
        });

        return { load: serializeLoad(updated) };
      } catch (err) {
        request.log.error({ err }, "freight completion failed");
        return reply.status(400).send({ error: err instanceof Error ? err.message : "Unable to complete load" });
      }
    },
  );
}
