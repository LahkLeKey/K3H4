import { Prisma, type PrismaClient } from "@prisma/client";
import { type FastifyInstance } from "fastify";
import { type RecordTelemetryFn } from "./types";

const serializeItem = (item: any) => ({
  ...item,
  quantity: Number(item.quantity),
});

export function registerWarehouseRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  server.get(
    "/warehouse/items",
    { preHandler: [server.authenticate] },
    async (request) => {
      const userId = (request.user as { sub: string }).sub;
      const items = await prisma.warehouseItem.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
      await recordTelemetry(request, { eventType: "warehouse.list", source: "api", payload: { count: items.length } });
      return { items: items.map(serializeItem) };
    },
  );

  server.post(
    "/warehouse/items",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as {
        sku?: string;
        description?: string;
        quantity?: number;
        location?: string;
        status?: string;
        freightLoadId?: string;
      } | undefined;

      const qty = Number(body?.quantity ?? 0);
      if (!body?.sku || !body.location) {
        return reply.status(400).send({ error: "sku and location are required" });
      }
      if (!Number.isFinite(qty) || qty < 0) {
        return reply.status(400).send({ error: "quantity must be a non-negative number" });
      }

      const freightLoadId = body.freightLoadId?.trim() || undefined;
      if (freightLoadId) {
        const load = await prisma.freightLoad.findFirst({ where: { id: freightLoadId, userId } });
        if (!load) return reply.status(404).send({ error: "Freight load not found" });
      }

      const item = await prisma.warehouseItem.create({
        data: {
          userId,
          sku: body.sku.trim(),
          description: body.description?.trim() || null,
          quantity: qty,
          location: body.location.trim(),
          status: body.status?.trim() || "stored",
          freightLoadId,
        },
      });

      await recordTelemetry(request, { eventType: "warehouse.create", source: "api", payload: { sku: body.sku, freightLoadId } });
      return { item: serializeItem(item) };
    },
  );

  server.patch(
    "/warehouse/items/:id",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const id = (request.params as { id: string }).id;
      const body = request.body as {
        description?: string;
        quantity?: number;
        location?: string;
        status?: string;
        freightLoadId?: string | null;
      } | undefined;

      const item = await prisma.warehouseItem.findFirst({ where: { id, userId } });
      if (!item) return reply.status(404).send({ error: "Item not found" });

      const qty = body?.quantity !== undefined ? Number(body.quantity) : undefined;
      if (qty !== undefined && (!Number.isFinite(qty) || qty < 0)) {
        return reply.status(400).send({ error: "quantity must be a non-negative number" });
      }

      const freightLoadId = body?.freightLoadId?.trim() || undefined;
      if (freightLoadId) {
        const load = await prisma.freightLoad.findFirst({ where: { id: freightLoadId, userId } });
        if (!load) return reply.status(404).send({ error: "Freight load not found" });
      }

      const updated = await prisma.warehouseItem.update({
        where: { id },
        data: {
          description: body?.description?.trim() ?? item.description,
          quantity: qty ?? item.quantity,
          location: body?.location?.trim() ?? item.location,
          status: body?.status?.trim() ?? item.status,
          freightLoadId: body?.freightLoadId === null ? null : freightLoadId ?? item.freightLoadId,
        },
      });

      await recordTelemetry(request, { eventType: "warehouse.update", source: "api", payload: { id, freightLoadId: updated.freightLoadId } });
      return { item: serializeItem(updated) };
    },
  );
}
