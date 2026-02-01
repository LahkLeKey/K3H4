import {EntityKind, LifecycleStatus, Prisma, type PrismaClient, WarehouseCategory,} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {lifecycleStatusOrDefault, parseLifecycleStatus} from '../lib/status-utils';
import {AgricultureSlotSnapshot, resolveAgricultureSlotSnapshot,} from '../services/agriculture-actor';
import {findFreightLoad} from '../services/freight-actor';
import {buildWarehouseItemPayload, ensureWarehouseActor} from '../services/warehouse-actor';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const cloneMetadata = (value?: Record<string, unknown>|null) => {
  if (value && typeof value === 'object' && !Array.isArray(value))
    return {...value};
  return {} as Record<string, unknown>;
};

const metadataRecord = (value: Prisma.JsonValue|null|undefined) => {
  if (value && typeof value === 'object' && !Array.isArray(value))
    return value as Record<string, unknown>;
  return {} as Record<string, unknown>;
};

const metadataString = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  if (typeof value === 'string') return value;
  if (value != null) return String(value);
  return null;
};

const toJsonValue = (record: Record<string, unknown>) => {
  return Object.keys(record).length ? (record as Prisma.InputJsonValue) :
                                      Prisma.JsonNull;
};

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
        const rt = buildTelemetryBase(request);
        const userId = (request.user as {sub: string}).sub;
        const actor = await ensureWarehouseActor(prisma, userId);
        const items = await prisma.entity.findMany({
          where: {actorId: actor.id, kind: EntityKind.WAREHOUSE_ITEM},
          orderBy: {createdAt: 'desc'},
        });
        await recordTelemetry(request, {
          ...rt,
          eventType: 'warehouse.list',
          source: 'api',
          payload: {count: items.length},
        });
        return {
          items: items.map((item) => buildWarehouseItemPayload(item, userId))
        };
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

        const freightLoadId = body?.freightLoadId?.trim() || undefined;
        if (freightLoadId) {
          const load = await findFreightLoad(prisma, userId, freightLoadId);
          if (!load) {
            return reply.status(404).send({error: 'Freight load not found'});
          }
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

        const metadata = cloneMetadata(body?.metadata);
        metadata.sku = body.sku.trim();
        metadata.description = body.description?.trim() ?? null;
        metadata.quantity = qty;
        metadata.location = body.location.trim();
        const status =
            lifecycleStatusOrDefault(body?.status, LifecycleStatus.STORED);
        metadata.status = status;
        metadata.freightLoadId = freightLoadId ?? null;
        metadata.category = category;
        if (category === WarehouseCategory.AGRICULTURE) {
          metadata.source = 'agriculture';
          if (agricultureSlot) metadata.slot = agricultureSlot;
        } else {
          metadata.source = 'manual';
        }

        const actor = await ensureWarehouseActor(prisma, userId);
        const entity = await prisma.entity.create({
          data: {
            actorId: actor.id,
            kind: EntityKind.WAREHOUSE_ITEM,
            source: 'k3h4-warehouse',
            metadata: toJsonValue(metadata),
          },
        });

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'warehouse.create',
          source: 'api',
          payload: {sku: body.sku, freightLoadId},
        });
        return {item: buildWarehouseItemPayload(entity, userId)};
      },
  );

  server.delete(
      '/warehouse/items/:id',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const id = (request.params as {id: string}).id;
        const actor = await ensureWarehouseActor(prisma, userId);
        const entity = await prisma.entity.findFirst({
          where: {
            id,
            actorId: actor.id,
            kind: EntityKind.WAREHOUSE_ITEM,
          },
        });
        if (!entity) return reply.status(404).send({error: 'Item not found'});
        await prisma.entity.delete({where: {id}});
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
          sku?: string;
          description?: string|null;
          quantity?: number;
          location?: string;
          status?: string;
          freightLoadId?: string|null;
          category?: string;
          metadata?: Record<string, unknown>|null;
          agricultureSlotId?: string|null;
        }
        |undefined;

        const actor = await ensureWarehouseActor(prisma, userId);
        const entity = await prisma.entity.findFirst({
          where: {
            id,
            actorId: actor.id,
            kind: EntityKind.WAREHOUSE_ITEM,
          },
        });
        if (!entity) return reply.status(404).send({error: 'Item not found'});

        const qty =
            body?.quantity !== undefined ? Number(body.quantity) : undefined;
        if (qty !== undefined && (!Number.isFinite(qty) || qty < 0)) {
          return reply.status(400).send(
              {error: 'quantity must be a non-negative number'});
        }

        let freightLoadId: string|null|undefined = undefined;
        if (body?.freightLoadId === null) {
          freightLoadId = null;
        } else if (body?.freightLoadId) {
          freightLoadId = body.freightLoadId.trim() || undefined;
        }
        if (freightLoadId) {
          const load = await findFreightLoad(prisma, userId, freightLoadId);
          if (!load) {
            return reply.status(404).send({error: 'Freight load not found'});
          }
        }

        const existingMetadata = metadataRecord(entity.metadata);
        const mergedMetadata = {
          ...existingMetadata,
          ...cloneMetadata(body?.metadata ?? undefined),
        };
        if (body?.sku) mergedMetadata.sku = body.sku.trim();
        if (body?.description !== undefined)
          mergedMetadata.description = body.description?.trim() ?? null;
        if (body?.location) mergedMetadata.location = body.location.trim();
        if (qty !== undefined) mergedMetadata.quantity = qty;
        if (freightLoadId !== undefined)
          mergedMetadata.freightLoadId = freightLoadId;

        const existingCategory = normalizeCategory(
            metadataString(existingMetadata, 'category') ??
            WarehouseCategory.OTHER);
        const category = body?.category ? normalizeCategory(body.category) :
                                          existingCategory;
        mergedMetadata.category = category;

        let nextStatus =
            (metadataString(existingMetadata, 'status') as LifecycleStatus) ??
            LifecycleStatus.STORED;
        if (body?.status !== undefined) {
          const parsedStatus = parseLifecycleStatus(body.status);
          if (!parsedStatus)
            return reply.status(400).send({error: 'Invalid status'});
          nextStatus = parsedStatus;
        }
        mergedMetadata.status = nextStatus;

        let agricultureSlot: AgricultureSlotSnapshot|null = null;
        if (body?.agricultureSlotId) {
          agricultureSlot = await resolveAgricultureSlotSnapshot(
              prisma, userId, body.agricultureSlotId);
          if (!agricultureSlot) {
            return reply.status(404).send(
                {error: 'Agriculture slot not found'});
          }
        }

        if (category === WarehouseCategory.AGRICULTURE) {
          mergedMetadata.source = 'agriculture';
          if (agricultureSlot) mergedMetadata.slot = agricultureSlot;
        } else {
          mergedMetadata.source = 'manual';
          delete mergedMetadata.slot;
        }

        const updated = await prisma.entity.update({
          where: {id},
          data: {metadata: toJsonValue(mergedMetadata)},
        });
        const telemetryFreightId =
            metadataString(mergedMetadata, 'freightLoadId') || undefined;
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'warehouse.update',
          source: 'api',
          payload: {id, freightLoadId: telemetryFreightId},
        });
        return {item: buildWarehouseItemPayload(updated, userId)};
      },
  );
}
