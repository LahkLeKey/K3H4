import { Prisma, type PrismaClient } from "@prisma/client";
import { type FastifyInstance } from "fastify";
import { enqueueOverpass } from "../lib/overpass-queue";
import { type RecordTelemetryFn } from "./types";

const OSRM_BASE = process.env.OSRM_URL || "https://router.project-osrm.org";
const OVERPASS_URL = "https://overpass-api.de/api/interpreter";
const ROUTE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours
const POI_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

const clampDecimals = (value: number, places = 5) => Number(value.toFixed(places));

const routeSignature = (o: { lat: number; lng: number }, d: { lat: number; lng: number }) =>
  [clampDecimals(o.lat), clampDecimals(o.lng), clampDecimals(d.lat), clampDecimals(d.lng)].join(":");

const poiSignature = (center: { lat: number; lng: number }, radiusM: number, kinds: string[]) => {
  const sortedKinds = [...kinds].sort().join(",");
  return [clampDecimals(center.lat), clampDecimals(center.lng), radiusM, sortedKinds].join(":");
};

async function fetchOsrmRoute(origin: { lat: number; lng: number }, dest: { lat: number; lng: number }) {
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
}

async function fetchOverpass(center: { lat: number; lng: number }, radiusM: number, kinds: string[], signature: string) {
  const sortedKinds = [...kinds].sort();
  const filters = sortedKinds.map((k) => `node[amenity=${k}](around:${radiusM},${center.lat},${center.lng});`).join("\n");
  const query = `[out:json][timeout:10];(${filters});out center 50;`;
  const body = new URLSearchParams({ data: query }).toString();
  const data = await enqueueOverpass(OVERPASS_URL, body, signature);
  return (data?.elements ?? []) as any[];
}

export function registerGeoRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  const db = prisma as any;
  server.get(
    "/geo/route",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const query = request.query as any;
      const originLat = Number(query.originLat);
      const originLng = Number(query.originLng);
      const destinationLat = Number(query.destinationLat);
      const destinationLng = Number(query.destinationLng);
      if (![originLat, originLng, destinationLat, destinationLng].every((n) => Number.isFinite(n))) {
        return reply.status(400).send({ error: "originLat, originLng, destinationLat, destinationLng are required" });
      }

      const signature = routeSignature({ lat: originLat, lng: originLng }, { lat: destinationLat, lng: destinationLng });
      const now = new Date();

      const cached = await db.geoRouteCache.findFirst({ where: { signature, expiresAt: { gt: now } } });
      if (cached) {
        await recordTelemetry(request, { eventType: "geo.route.cached", source: "api", payload: { signature } });
        return {
          distanceKm: Number(cached.distanceKm),
          durationMinutes: cached.durationMinutes,
          geojson: cached.geojson,
          cached: true,
        };
      }

      try {
        const osrm = await fetchOsrmRoute({ lat: originLat, lng: originLng }, { lat: destinationLat, lng: destinationLng });
        await db.geoRouteCache.upsert({
          where: { signature },
          update: {
            distanceKm: new Prisma.Decimal(osrm.distanceKm.toFixed(4)),
            durationMinutes: osrm.durationMinutes,
            geojson: osrm.geojson,
            expiresAt: new Date(Date.now() + ROUTE_TTL_MS),
            userId,
          },
          create: {
            signature,
            provider: "osrm",
            originLat: new Prisma.Decimal(originLat.toFixed(6)),
            originLng: new Prisma.Decimal(originLng.toFixed(6)),
            destinationLat: new Prisma.Decimal(destinationLat.toFixed(6)),
            destinationLng: new Prisma.Decimal(destinationLng.toFixed(6)),
            distanceKm: new Prisma.Decimal(osrm.distanceKm.toFixed(4)),
            durationMinutes: osrm.durationMinutes,
            geojson: osrm.geojson,
            expiresAt: new Date(Date.now() + ROUTE_TTL_MS),
            userId,
          },
        });

        await recordTelemetry(request, { eventType: "geo.route.fetched", source: "api", payload: { signature } });
        return { ...osrm, cached: false };
      } catch (err) {
        return reply.status(502).send({ error: err instanceof Error ? err.message : "OSRM unavailable" });
      }
    },
  );

  server.get(
    "/geo/pois",
    async (request, reply) => {
      const query = request.query as any;
      const lat = Number(query.lat);
      const lng = Number(query.lng);
      const radiusM = Number(query.radiusM ?? 1800);
      const kinds = typeof query.kinds === "string" && query.kinds.trim().length > 0 ? query.kinds.split(",") : ["bank", "atm", "restaurant", "cafe", "fuel", "bus_station", "train_station"];

      let userId: string | null = null;
      const hasAuth = typeof request.headers.authorization === "string" && request.headers.authorization.trim().length > 0;
      if (hasAuth) {
        try {
          await request.jwtVerify();
          userId = (request.user as { sub?: string })?.sub ?? null;
        } catch (err) {
          request.log.debug({ err }, "geo pois optional auth failed");
        }
      }

      if (![lat, lng, radiusM].every((n) => Number.isFinite(n))) {
        return reply.status(400).send({ error: "lat, lng, radiusM are required" });
      }

      const signature = poiSignature({ lat, lng }, radiusM, kinds);
      const now = new Date();

      const cached = await db.geoPoiCache.findFirst({ where: { signature, expiresAt: { gt: now } } });
      if (cached) {
        await recordTelemetry(request, { eventType: "geo.poi.cached", source: "api", payload: { signature, count: cached.count } });
        return { pois: cached.pois, count: cached.count, cached: true };
      }

      try {
        const elements = await fetchOverpass({ lat, lng }, radiusM, kinds, signature);
        const pois = elements.map((feat) => ({
          id: `${feat.id}`,
          name: feat.tags?.name ?? feat.tags?.amenity ?? "poi",
          kind: feat.tags?.amenity,
          lat: feat.lat,
          lng: feat.lon,
        }));

        await db.geoPoiCache.upsert({
          where: { signature },
          update: {
            pois,
            count: pois.length,
            expiresAt: new Date(Date.now() + POI_TTL_MS),
            userId,
          },
          create: {
            signature,
            centerLat: new Prisma.Decimal(lat.toFixed(6)),
            centerLng: new Prisma.Decimal(lng.toFixed(6)),
            radiusM,
            kinds: kinds.join(","),
            pois,
            count: pois.length,
            expiresAt: new Date(Date.now() + POI_TTL_MS),
            userId,
          },
        });

        await recordTelemetry(request, { eventType: "geo.poi.fetched", source: "api", payload: { signature, count: pois.length } });
        return { pois, count: pois.length, cached: false };
      } catch (err) {
        return reply.status(502).send({ error: err instanceof Error ? err.message : "Overpass unavailable" });
      }
    },
  );

  // Client geo/POI status logging for telemetry/loading bars
  server.post(
    "/geo/status",
    async (request, reply) => {
      const body = request.body as {
        status?: string;
        poiStatus?: string;
        centerLat?: number;
        centerLng?: number;
        error?: string;
      };

      const status = body?.status?.trim();
      if (!status) return reply.status(400).send({ error: "status is required" });

      const centerLat = typeof body.centerLat === "number" && Number.isFinite(body.centerLat) ? body.centerLat : null;
      const centerLng = typeof body.centerLng === "number" && Number.isFinite(body.centerLng) ? body.centerLng : null;

      let userId: string | null = null;
      const hasAuth = typeof request.headers.authorization === "string" && request.headers.authorization.length > 0;
      if (hasAuth) {
        try {
          await request.jwtVerify();
          userId = (request.user as { sub?: string })?.sub ?? null;
        } catch (err) {
          // ignore auth failures; status logging is allowed unauthenticated
        }
      }

      try {
        await prisma.geoStatusLog.create({
          data: {
            userId,
            status,
            poiStatus: body?.poiStatus?.trim() || null,
            centerLat: centerLat !== null ? new Prisma.Decimal(centerLat.toFixed(6)) : null,
            centerLng: centerLng !== null ? new Prisma.Decimal(centerLng.toFixed(6)) : null,
            error: body?.error?.slice(0, 512) || null,
            userAgent: request.headers["user-agent"]?.toString().slice(0, 512) ?? null,
          },
        });

        await recordTelemetry(request, {
          eventType: "geo.status",
          source: "api",
          payload: {
            status,
            poiStatus: body?.poiStatus,
            hasCenter: Boolean(centerLat !== null && centerLng !== null),
          },
        });

        return { ok: true };
      } catch (err) {
        request.log.error({ err }, "geo status log failed");
        return reply.status(500).send({ error: "unable to log status" });
      }
    },
  );
}
