import {LifecycleStatus, Prisma, type PrismaClient, WarehouseCategory} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {lifecycleStatusOrDefault, parseLifecycleStatus} from '../lib/status-utils';
import {AgricultureSlotSnapshot, resolveAgricultureSlotSnapshot,} from '../services/agriculture-actor';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const serializeItem = (item: any) => ({
  ...item,
  quantity: Number(item.quantity),
  category: item.category,
  metadata: item.metadata ?? null,
});

const normalizeCategory = (value?: string) =>
    value === WarehouseCategory.AGRICULTURE ? WarehouseCategory.AGRICULTURE :
                                              WarehouseCategory.OTHER;

export function registerWarehouseRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get(
      '/warehouse/items',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const items = await prisma.warehouseItem.findMany(
            {where: {userId}, orderBy: {createdAt: 'desc'}});
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'warehouse.list',
          source: 'api',
          payload: {count: items.length},
        });
        return {items: items.map(serializeItem)};
      },
  );

  server.post(
      '/warehouse/items',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          sku?: string;
          description?: string;
          quantity?: number;
          location?: string;
          status?: string;
          freightLoadId?: string;
          category?: string;
          metadata?: Record<string, unknown>;
          agricultureSlotId?: string;
        }
        |undefined;

        const qty = Number(body?.quantity ?? 0);
        if (!body?.sku || !body.location) {
          return reply.status(400).send(
              {error: 'sku and location are required'});
        }
        if (!Number.isFinite(qty) || qty < 0) {
          return reply.status(400).send(
              {error: 'quantity must be a non-negative number'});
        }

        const freightLoadId = body.freightLoadId?.trim() || undefined;
        if (freightLoadId) {
          const load = await prisma.freightLoad.findFirst(
              {where: {id: freightLoadId, userId}});
          if (!load)
            return reply.status(404).send({error: 'Freight load not found'});
        }

        const category = normalizeCategory(body?.category);
        let agricultureSlot: AgricultureSlotSnapshot|null = null;
        if (category === WarehouseCategory.AGRICULTURE &&
            body?.agricultureSlotId) {
          agricultureSlot = await resolveAgricultureSlotSnapshot(
              prisma, userId, body.agricultureSlotId);
          if (!agricultureSlot) {
            return reply.status(404).send(
                {error: 'Agriculture slot not found'});
          }
        }
        const baseMetadata = body?.metadata &&
                typeof body.metadata === 'object' &&
                !Array.isArray(body.metadata) ?
            {...body.metadata} :
            {} as Record<string, unknown>;
        if (category === WarehouseCategory.AGRICULTURE) {
          baseMetadata.source = 'agriculture';
          if (agricultureSlot) baseMetadata.slot = agricultureSlot;
        } else {
          baseMetadata.source = 'manual';
        }

        const metadataPayload = Object.keys(baseMetadata).length ?
            (baseMetadata as Prisma.InputJsonValue) :
            Prisma.JsonNull;
        const item = await prisma.warehouseItem.create({
          data: {
            userId,
            sku: body.sku.trim(),
            description: body.description?.trim() || null,
            quantity: qty,
            location: body.location.trim(),
            status:
                lifecycleStatusOrDefault(body.status, LifecycleStatus.STORED),
            freightLoadId,
            category,
            metadata: metadataPayload,
          },
        });

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'warehouse.create',
          source: 'api',
          payload: {sku: body.sku, freightLoadId},
        });
        return {item: serializeItem(item)};
      },
  );

  server.delete(
      '/warehouse/items/:id',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const id = (request.params as {id: string}).id;
        const item =
            await prisma.warehouseItem.findFirst({where: {id, userId}});
        if (!item) return reply.status(404).send({error: 'Item not found'});
        await prisma.warehouseItem.delete({where: {id}});
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'warehouse.delete',
          source: 'api',
          payload: {id},
        });
        return {success: true};
      },
  );

  server.patch(
      '/warehouse/items/:id',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const id = (request.params as {id: string}).id;
        const body = request.body as {
          description?: string;
          quantity?: number;
          location?: string;
          status?: string;
          freightLoadId?: string|null;
          category?: string;
          metadata?: Record<string, unknown>|null;
          agricultureSlotId?: string|null;
        }
        |undefined;

        const item =
            await prisma.warehouseItem.findFirst({where: {id, userId}});
        if (!item) return reply.status(404).send({error: 'Item not found'});

        const qty =
            body?.quantity !== undefined ? Number(body.quantity) : undefined;
        if (qty !== undefined && (!Number.isFinite(qty) || qty < 0)) {
          return reply.status(400).send(
              {error: 'quantity must be a non-negative number'});
        }

        const freightLoadId = body?.freightLoadId?.trim() || undefined;
        if (freightLoadId) {
          const load = await prisma.freightLoad.findFirst(
              {where: {id: freightLoadId, userId}});
          if (!load)
            return reply.status(404).send({error: 'Freight load not found'});
        }

        const category =
            body?.category ? normalizeCategory(body.category) : item.category;
        let agricultureSlot: AgricultureSlotSnapshot|null = null;
        if (category === WarehouseCategory.AGRICULTURE &&
            body?.agricultureSlotId) {
          agricultureSlot = await resolveAgricultureSlotSnapshot(
              prisma, userId, body.agricultureSlotId);
          if (!agricultureSlot) {
            return reply.status(404).send(
                {error: 'Agriculture slot not found'});
          }
        }
        const existingMetadata = item.metadata &&
                typeof item.metadata === 'object' &&
                !Array.isArray(item.metadata) ?
            {...item.metadata} :
            {};
        const metadataSource = body?.metadata &&
                typeof body.metadata === 'object' &&
                !Array.isArray(body.metadata) ?
            {...body.metadata} :
            existingMetadata;
        if (category === WarehouseCategory.AGRICULTURE) {
          metadataSource.source = 'agriculture';
          if (agricultureSlot) metadataSource.slot = agricultureSlot;
        } else {
          metadataSource.source = 'manual';
        }

        let nextStatus = item.status;
        if (body?.status !== undefined) {
          const parsedStatus = parseLifecycleStatus(body.status);
          if (!parsedStatus)
            return reply.status(400).send({error: 'Invalid status'});
          nextStatus = parsedStatus;
        }

        const metadataPayload = Object.keys(metadataSource).length ?
            (metadataSource as Prisma.InputJsonValue) :
            Prisma.JsonNull;
        const updated = await prisma.warehouseItem.update({
          where: {id},
          data: {
            description: body?.description?.trim() ?? item.description,
            quantity: qty ?? item.quantity,
            location: body?.location?.trim() ?? item.location,
            status: nextStatus,
            freightLoadId: body?.freightLoadId === null ?
                null :
                freightLoadId ?? item.freightLoadId,
            category,
            metadata: metadataPayload,
          },
        });

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'warehouse.update',
          source: 'api',
          payload: {id, freightLoadId: updated.freightLoadId},
        });
        return {item: serializeItem(updated)};
      },
  );
}
