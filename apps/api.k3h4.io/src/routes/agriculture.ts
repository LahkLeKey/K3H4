import { Prisma, PrismaClient } from "@prisma/client";
import { type FastifyInstance } from "fastify";
import { type RecordTelemetryFn } from "./types";

export function registerAgricultureRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  server.get(
    "/agriculture/overview",
    { preHandler: [server.authenticate] },
    async (request) => {
      const userId = (request.user as { sub: string }).sub;

      const [plots, tasks, shipments] = await Promise.all([
        prisma.agriculturePlot.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),
        prisma.agricultureTask.findMany({ where: { userId }, orderBy: [{ status: "asc" }, { dueDate: "asc" }] }),
        prisma.agricultureShipment.findMany({ where: { userId }, orderBy: { createdAt: "desc" } }),
      ]);

      await recordTelemetry(request, {
        eventType: "agriculture.overview.fetch",
        source: "api",
        payload: { plotCount: plots.length, taskCount: tasks.length, shipmentCount: shipments.length },
      });

      return { plots, tasks, shipments };
    },
  );

  server.post(
    "/agriculture/plots",
    { preHandler: [server.authenticate] },
    async (request) => {
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as { name: string; crop: string; stage?: string; acres: number; health?: string };
      const plot = await prisma.agriculturePlot.create({
        data: {
          userId,
          name: body.name,
          crop: body.crop,
          stage: body.stage || "Unknown",
          acres: new Prisma.Decimal(Number(body.acres).toFixed(2)),
          health: body.health || "Unknown",
        },
      });
      await recordTelemetry(request, { eventType: "agriculture.plot.create", source: "api", payload: { name: plot.name, crop: plot.crop } });
      return { plot };
    },
  );

  server.post(
    "/agriculture/tasks",
    { preHandler: [server.authenticate] },
    async (request) => {
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as { title: string; assignee?: string; dueDate?: string; status?: string };
      const task = await prisma.agricultureTask.create({
        data: {
          userId,
          title: body.title,
          assignee: body.assignee ?? null,
          dueDate: body.dueDate ? new Date(body.dueDate) : null,
          status: body.status || "pending",
        },
      });
      await recordTelemetry(request, { eventType: "agriculture.task.create", source: "api", payload: { status: task.status } });
      return { task };
    },
  );

  server.post(
    "/agriculture/shipments",
    { preHandler: [server.authenticate] },
    async (request) => {
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as { lot: string; destination: string; mode: string; eta?: string; freightLoadId?: string };
      const shipment = await prisma.agricultureShipment.create({
        data: {
          userId,
          lot: body.lot,
          destination: body.destination,
          mode: body.mode,
          eta: body.eta ? new Date(body.eta) : null,
          freightLoadId: body.freightLoadId ?? null,
        },
      });
      await recordTelemetry(request, {
        eventType: "agriculture.shipment.create",
        source: "api",
        payload: { mode: shipment.mode, lot: shipment.lot, freightLinked: Boolean(shipment.freightLoadId) },
      });
      return { shipment };
    },
  );
}
