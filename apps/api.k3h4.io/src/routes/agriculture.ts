import {type Entity, EntityKind, LifecycleStatus, Prisma, type PrismaClient,} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {lifecycleStatusOrDefault, parseLifecycleStatus} from '../lib/status-utils';
import {AgricultureSlotSnapshot, buildAgricultureSlotSnapshotFromEntities, ensureAgricultureActor,} from '../services/agriculture-actor';

import {withTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const MAX_PLOT_SLOTS = 12;
const BASE_SLOT_COST = 100;
const SLOT_COST_STEP = 50;
const toDecimal = (value: unknown|undefined) => {
  if (value instanceof Prisma.Decimal) return value;
  if (typeof value === 'number') return new Prisma.Decimal(value);
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return null;
    return new Prisma.Decimal(parsed);
  }
  return null;
};

const metadataRecord = (value: Prisma.JsonValue|null|undefined) => {
  if (value && typeof value === 'object' && !Array.isArray(value))
    return value as Record<string, unknown>;
  return {} as Record<string, unknown>;
};

const toJsonValue = (record: Record<string, unknown>) => {
  return Object.keys(record).length ? (record as Prisma.InputJsonValue) :
                                      Prisma.JsonNull;
};

const parseDateValue = (value: unknown) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  const date = new Date(String(value));
  if (Number.isNaN(date.valueOf())) return null;
  return date;
};

const formatDateValue = (value: Date|null) =>
    value ? value.toISOString() : null;

const metadataString = (metadata: Record<string, unknown>, key: string) => {
  const value = metadata[key];
  if (typeof value === 'string') return value;
  if (value != null) return String(value);
  return null;
};

const metadataNumber = (metadata: Record<string, unknown>, key: string) => {
  const value = metadata[key];
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const metadataDecimal = (metadata: Record<string, unknown>, key: string) => {
  return toDecimal(metadata[key]);
};

const metadataLifecycle = (metadata: Record<string, unknown>, key: string) => {
  const value = metadataString(metadata, key);
  return value ? value as LifecycleStatus : null;
};

const computeSlotCost = (slotIndex: number) => {
  if (slotIndex <= 0) return new Prisma.Decimal(0);
  return new Prisma.Decimal(BASE_SLOT_COST + SLOT_COST_STEP * slotIndex);
};

const slotPlotDetails = (plot: Entity) => {
  const metadata = metadataRecord(plot.metadata);
  return {
    id: plot.id,
    name: metadataString(metadata, 'name') ?? null,
    crop: metadataString(metadata, 'crop') ?? null,
    stage: metadataString(metadata, 'stage') ?? null,
  };
};

const buildSlotPayload = (slot: Entity, plot?: Entity|null) => {
  const metadata = metadataRecord(slot.metadata);
  const costPaid = metadataString(metadata, 'costPaid') ?? '0.00';
  const slotIndex = metadataNumber(metadata, 'slotIndex');
  const slotInfo: AgricultureSlotSnapshot|{
    id: string;
    slotIndex: number;
    costPaid: string;
    plotId: string|null;
    slug: string|null;
    unlockedAt: Date;
  }
  = buildAgricultureSlotSnapshotFromEntities(slot, plot ?? null);
  return {
    id: slotInfo.id,
    slotIndex: Number.isFinite(slotIndex ?? NaN) ? slotIndex :
                                                   slotInfo.slotIndex,
    costPaid,
    unlockedAt: slotInfo.unlockedAt.toISOString(),
    plotId: slotInfo.plotId,
    plot: plot ? slotPlotDetails(plot) : null,
  };
};

type AgriculturePlotCreateBody = {
  name: string; crop: string;
  acres?: number | string;
  stage?: string;
  fieldCode?: string;
  soilType?: string;
  irrigationZone?: string;
  notes?: string;
};

const buildConditionPayload = (condition: Entity) => {
  const metadata = metadataRecord(condition.metadata);
  return {
    id: condition.id,
    recordedAt: condition.createdAt.toISOString(),
    temperature: metadataNumber(metadata, 'temperature') ?? null,
    moisture: metadataNumber(metadata, 'moisture') ?? null,
    ph: metadataString(metadata, 'ph') ?? null,
    notes: metadataString(metadata, 'notes') ?? null,
  };
};

const buildPlanPayload = (plan: Entity, tasks: Entity[]) => {
  const metadata = metadataRecord(plan.metadata);
  const startDate = parseDateValue(metadataString(metadata, 'startDate'));
  const targetHarvestDate =
      parseDateValue(metadataString(metadata, 'targetHarvestDate'));
  const endDate = parseDateValue(metadataString(metadata, 'endDate'));
  return {
    id: plan.id,
    crop: metadataString(metadata, 'crop'),
    phase: metadataString(metadata, 'phase'),
    status: metadataLifecycle(metadata, 'status') ?? LifecycleStatus.ACTIVE,
    startDate: startDate ? startDate.toISOString() : null,
    targetHarvestDate: targetHarvestDate ? targetHarvestDate.toISOString() :
                                           null,
    endDate: endDate ? endDate.toISOString() : null,
    notes: metadataString(metadata, 'notes') ?? null,
    tasks: tasks.map((task) => buildTaskPayload(task)),
  };
};

const buildPlotPayload =
    (plot: Entity, latestCondition: Entity|null, plans: Entity[],
     slotEntities: Entity[], slotToPlot: Map<string, Entity[]>) => {
      const metadata = metadataRecord(plot.metadata);
      const acres = metadataDecimal(metadata, 'acres');
      const conditionPayload =
          latestCondition ? buildConditionPayload(latestCondition) : null;
      const slotsForPlot = slotToPlot.get(plot.id) ?? [];
      const slotPayloads =
          slotsForPlot.map((slot) => buildSlotPayload(slot, plot));
      return {
        id: plot.id,
        name: metadataString(metadata, 'name'),
        fieldCode: metadataString(metadata, 'fieldCode') ?? null,
        crop: metadataString(metadata, 'crop'),
        stage: metadataString(metadata, 'stage'),
        acres: acres ? acres.toFixed(2) : '0.00',
        health: metadataString(metadata, 'health') ?? null,
        soilType: metadataString(metadata, 'soilType') ?? null,
        irrigationZone: metadataString(metadata, 'irrigationZone') ?? null,
        notes: metadataString(metadata, 'notes') ?? null,
        lastConditionAt: formatDateValue(
            parseDateValue(metadataString(metadata, 'lastConditionAt'))),
        latestCondition: conditionPayload,
        plans: plans.map(
            (plan) => ({
              id: plan.id,
              crop: metadataString(metadataRecord(plan.metadata), 'crop'),
              phase: metadataString(metadataRecord(plan.metadata), 'phase'),
              status:
                  metadataLifecycle(metadataRecord(plan.metadata), 'status') ??
                  LifecycleStatus.ACTIVE,
              startDate: formatDateValue(parseDateValue(
                  metadataString(metadataRecord(plan.metadata), 'startDate'))),
              targetHarvestDate: formatDateValue(parseDateValue(metadataString(
                  metadataRecord(plan.metadata), 'targetHarvestDate'))),
              endDate: formatDateValue(parseDateValue(
                  metadataString(metadataRecord(plan.metadata), 'endDate'))),
            })),
        slots: slotPayloads,
      };
    };

const buildTaskPayload = (task: Entity) => {
  const metadata = metadataRecord(task.metadata);
  return {
    id: task.id,
    title: metadataString(metadata, 'title'),
    assignee: metadataString(metadata, 'assignee'),
    priority: metadataNumber(metadata, 'priority') ?? 2,
    status: metadataString(metadata, 'status') ?? LifecycleStatus.ACTIVE,
    tags: metadata.tags ?? null,
    notes: metadataString(metadata, 'notes') ?? null,
    dueDate:
        formatDateValue(parseDateValue(metadataString(metadata, 'dueDate'))),
    plotId: metadataString(metadata, 'plotId'),
    cropPlanId: metadataString(metadata, 'cropPlanId'),
  };
};

const buildMovementPayload = (movement: Entity) => {
  const metadata = metadataRecord(movement.metadata);
  return {
    id: movement.id,
    type: metadataString(metadata, 'type'),
    quantity: metadataString(metadata, 'quantity') ?? '0.00',
    reason: metadataString(metadata, 'reason') ?? null,
    shipmentId: metadataString(metadata, 'shipmentId') ?? null,
    createdAt: movement.createdAt.toISOString(),
  };
};

const buildInventoryPayload = (inventory: Entity, movements: Entity[]) => {
  const metadata = metadataRecord(inventory.metadata);
  const total = metadataString(metadata, 'totalQuantity') ?? '0.00';
  return {
    id: inventory.id,
    sku: metadataString(metadata, 'sku'),
    description: metadataString(metadata, 'description') ?? null,
    totalQuantity: total,
    unit: metadataString(metadata, 'unit'),
    location: metadataString(metadata, 'location') ?? null,
    status: metadataString(metadata, 'status') ?? LifecycleStatus.STORED,
    movements: movements.map((movement) => buildMovementPayload(movement)),
  };
};

const buildShipmentPayload = (entity: Entity) => {
  const metadata = metadataRecord(entity.metadata);
  return {
    id: entity.id,
    lot: metadataString(metadata, 'lot'),
    destination: metadataString(metadata, 'destination'),
    mode: metadataString(metadata, 'mode'),
    eta: formatDateValue(parseDateValue(metadataString(metadata, 'eta'))),
    freightLoadId: metadataString(metadata, 'freightLoadId') ?? null,
  };
};

const serializeResource = (resource: any) => ({
  id: resource.id,
  title: resource.title,
  summary: resource.summary,
  url: resource.url,
  tags: resource.tags ?? [],
  source: resource.source ?? null,
});

const serializeResourceCategory = (category: any) => ({
  id: category.id,
  slug: category.slug,
  title: category.title,
  description: category.description ?? null,
  resources: category.resources ? category.resources.map(serializeResource) :
                                  [],
});

export function registerAgricultureRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get(
      '/agriculture/overview',
      {preHandler: [server.authenticate]},
      async (request) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const actor = await ensureAgricultureActor(prisma, userId);
        const [plotCount, taskCount, shipmentCount, slotCount, inventory] =
            await Promise.all([
              prisma.entity.count({
                where: {actorId: actor.id, kind: EntityKind.AGRICULTURE_PLOT},
              }),
              prisma.entity.count({
                where: {actorId: actor.id, kind: EntityKind.AGRICULTURE_TASK},
              }),
              prisma.entity.count({
                where:
                    {actorId: actor.id, kind: EntityKind.AGRICULTURE_SHIPMENT},
              }),
              prisma.entity.count({
                where: {actorId: actor.id, kind: EntityKind.AGRICULTURE_SLOT},
              }),
              prisma.entity.findMany({
                where: {
                  actorId: actor.id,
                  kind: EntityKind.AGRICULTURE_INVENTORY_ITEM
                },
              }),
            ]);
        const inventoryTotals = inventory.reduce((acc, stock) => {
          const metadata = metadataRecord(stock.metadata);
          const sku = metadataString(metadata, 'sku')?.toLowerCase();
          if (!sku) return acc;
          const qtyString = metadataString(metadata, 'totalQuantity') ?? '0.00';
          acc[sku] = qtyString;
          return acc;
        }, {} as Record<string, string>);
        await rt({
          eventType: 'agriculture.overview.fetch',
          source: 'api',
          payload: {},
        });
        return {
          plots: plotCount,
          tasks: taskCount,
          shipments: shipmentCount,
          unlockedSlots: slotCount,
          seeds: inventoryTotals.seeds ?? '0.00',
          fertilizer: inventoryTotals.fertilizer ?? '0.00',
          feed: inventoryTotals.feed ?? '0.00',
          harvest: inventoryTotals.harvest ?? '0.00',
          debt: '0.00',
          pnl: '0.00',
          burnRate: '0.00',
          receivables: '0.00',
        };
      },
  );

  server.get(
      '/agriculture/analytics',
      {preHandler: [server.authenticate]},
      async (request) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const actor = await ensureAgricultureActor(prisma, userId);
        const [totalPlots, planEntities, taskEntities, inventoryItems, shipments] =
            await Promise.all([
              prisma.entity.count({
                where: {actorId: actor.id, kind: EntityKind.AGRICULTURE_PLOT},
              }),
              prisma.entity.findMany({
                where: {
                  actorId: actor.id,
                  kind: EntityKind.AGRICULTURE_CROP_PLAN,
                },
              }),
              prisma.entity.findMany({
                where: {
                  actorId: actor.id,
                  kind: EntityKind.AGRICULTURE_TASK,
                },
              }),
              prisma.entity.findMany({
                where: {
                  actorId: actor.id,
                  kind: EntityKind.AGRICULTURE_INVENTORY_ITEM,
                },
              }),
              prisma.entity.findMany({
                where: {
                  actorId: actor.id,
                  kind: EntityKind.AGRICULTURE_SHIPMENT,
                },
              }),
            ]);
        const planPhaseCounts = planEntities.reduce((acc, plan) => {
          const metadata = metadataRecord(plan.metadata);
          const phase = metadataString(metadata, 'phase') ?? 'unknown';
          acc[phase] = (acc[phase] ?? 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        const taskStatusCounts = taskEntities.reduce((acc, task) => {
          const metadata = metadataRecord(task.metadata);
          const status = metadataString(metadata, 'status') ?? 'active';
          acc[status] = (acc[status] ?? 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        const sortedInventory = [...inventoryItems].sort((a, b) => {
          const aQty = toDecimal(metadataString(
                           metadataRecord(a.metadata), 'totalQuantity')) ??
              new Prisma.Decimal(0);
          const bQty = toDecimal(metadataString(
                           metadataRecord(b.metadata), 'totalQuantity')) ??
              new Prisma.Decimal(0);
          return bQty.comparedTo(aQty);
        });
        const inventoryHighlights = sortedInventory.slice(0, 3).map((item) => {
          const metadata = metadataRecord(item.metadata);
          return {
            sku: metadataString(metadata, 'sku'),
            totalQuantity: metadataString(metadata, 'totalQuantity') ?? '0.00',
            unit: metadataString(metadata, 'unit'),
          };
        });
        const shipmentCount = shipments
                                  .filter((shipment) => {
                                    const metadata =
                                        metadataRecord(shipment.metadata);
                                    return !!metadataString(metadata, 'eta');
                                  })
                                  .length;
        await rt({
          eventType: 'agriculture.analytics.fetch',
          source: 'api',
          payload: {},
        });
        return {
          totalPlots,
          planPhaseCounts,
          taskStatusCounts,
          inventoryHighlights,
          trackedShipments: shipmentCount,
          pnl: '0.00',
          burnRate: '0.00',
          receivables: '0.00',
          animalAlerts: 0,
          debt: '0.00',
        };
      },
  );

  server.get(
      '/agriculture/slots',
      {preHandler: [server.authenticate]},
      async (request) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const actor = await ensureAgricultureActor(prisma, userId);
        const slots = await prisma.entity.findMany({
          where: {actorId: actor.id, kind: EntityKind.AGRICULTURE_SLOT},
        });
        const plotIds =
            slots.map((slot) => slot.targetId).filter(Boolean) as string[];
        const plots = plotIds.length ?
            await prisma.entity.findMany({where: {id: {in : plotIds}}}) :
            [];
        const plotMap = new Map(plots.map((plot) => [plot.id, plot]));
        const sortedSlots = [...slots].sort((a, b) => {
          const aIndex =
              metadataNumber(metadataRecord(a.metadata), 'slotIndex') ?? 0;
          const bIndex =
              metadataNumber(metadataRecord(b.metadata), 'slotIndex') ?? 0;
          return aIndex - bIndex;
        });
        await rt({
          eventType: 'agriculture.slots.list',
          source: 'api',
          payload: {count: sortedSlots.length},
        });
        return {
          slots: sortedSlots.map(
              (slot) => buildSlotPayload(
                  slot, plotMap.get(slot.targetId ?? '') ?? null)),
        };
      },
  );

  server.post(
      '/agriculture/slots/unlock',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {costPaid?: number | string} | undefined;
        const actor = await ensureAgricultureActor(prisma, userId);
        const unlockedCount = await prisma.entity.count({
          where: {actorId: actor.id, kind: EntityKind.AGRICULTURE_SLOT},
        });
        if (unlockedCount >= MAX_PLOT_SLOTS)
          return reply.status(400).send({error: 'Maximum slots reached'});
        const slotIndex = unlockedCount;
        const costPaid =
            toDecimal(body?.costPaid) ?? computeSlotCost(slotIndex);
        const slot = await prisma.entity.create({
          data: {
            actorId: actor.id,
            kind: EntityKind.AGRICULTURE_SLOT,
            name: `slot-${slotIndex}`,
            metadata: toJsonValue({
              slotIndex,
              costPaid: costPaid.toFixed(2),
            }),
          },
        });
        await rt({
          eventType: 'agriculture.slot.unlock',
          source: 'api',
          payload: {
            slotIndex,
            costPaid: costPaid.toFixed(2),
          },
        });
        return buildSlotPayload(slot, null);
      },
  );

  server.patch(
      '/agriculture/slots/:id',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const slotId = (request.params as {id: string}).id;
        const body = request.body as {plotId?: string | null} | undefined;
        const actor = await ensureAgricultureActor(prisma, userId);
        const slot = await prisma.entity.findFirst({
          where: {
            id: slotId,
            actorId: actor.id,
            kind: EntityKind.AGRICULTURE_SLOT
          },
        });
        if (!slot) return reply.status(404).send({error: 'Slot not found'});
        const nextPlotId =
            body?.plotId === undefined ? slot.targetId : body.plotId ?? null;
        if (nextPlotId) {
          const plot = await prisma.entity.findFirst({
            where: {
              id: nextPlotId,
              actorId: actor.id,
              kind: EntityKind.AGRICULTURE_PLOT
            },
          });
          if (!plot) return reply.status(404).send({error: 'Plot not found'});
        }
        const updated = await prisma.entity.update({
          where: {id: slotId},
          data: {
            targetId: nextPlotId,
          },
        });
        let plot: Entity|null = null;
        if (updated.targetId) {
          plot =
              await prisma.entity.findUnique({where: {id: updated.targetId}});
        }
        await rt({
          eventType: 'agriculture.slot.update',
          source: 'api',
          payload: {slotId, plotId: nextPlotId},
        });
        return buildSlotPayload(updated, plot);
      },
  );

  server.get(
      '/agriculture/plots',
      {preHandler: [server.authenticate]},
      async (request) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const actor = await ensureAgricultureActor(prisma, userId);
        const plots = await prisma.entity.findMany({
          where: {actorId: actor.id, kind: EntityKind.AGRICULTURE_PLOT},
        });
        const plotIds = plots.map((plot) => plot.id);
        const conditionEntities = plotIds.length ?
            await prisma.entity.findMany({
              where: {
                actorId: actor.id,
                kind: EntityKind.AGRICULTURE_PLOT_CONDITION,
                targetId: {in : plotIds},
              },
              orderBy: {createdAt: 'desc'},
            }) :
            [];
        const latestCondition = new Map<string, Entity>();
        conditionEntities.forEach((condition) => {
          if (condition.targetId && !latestCondition.has(condition.targetId)) {
            latestCondition.set(condition.targetId, condition);
          }
        });
        const planEntities = plotIds.length ? await prisma.entity.findMany({
          where: {
            actorId: actor.id,
            kind: EntityKind.AGRICULTURE_CROP_PLAN,
            targetId: {in : plotIds},
          },
        }) :
                                              [];
        const plansByPlot = new Map<string, Entity[]>();
        planEntities.forEach((plan) => {
          if (!plan.targetId) return;
          const list = plansByPlot.get(plan.targetId) ?? [];
          list.push(plan);
          plansByPlot.set(plan.targetId, list);
        });
        const slotEntities = plotIds.length ? await prisma.entity.findMany({
          where: {
            actorId: actor.id,
            kind: EntityKind.AGRICULTURE_SLOT,
            targetId: {in : plotIds},
          },
        }) :
                                              [];
        const slotsByPlot = new Map<string, Entity[]>();
        slotEntities.forEach((slot) => {
          if (!slot.targetId) return;
          const list = slotsByPlot.get(slot.targetId) ?? [];
          list.push(slot);
          slotsByPlot.set(slot.targetId, list);
        });
        await rt({
          eventType: 'agriculture.plots.list',
          source: 'api',
          payload: {count: plots.length},
        });
        return {
          plots: plots.map(
              (plot) => buildPlotPayload(
                  plot,
                  latestCondition.get(plot.id) ?? null,
                  plansByPlot.get(plot.id) ?? [],
                  slotEntities,
                  slotsByPlot,
                  )),
        };
      },
  );

  server.post(
      '/agriculture/plots',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const body =
            request.body as Partial<AgriculturePlotCreateBody>| undefined;
        if (!body?.name || !body?.crop)
          return reply.status(400).send({error: 'name and crop are required'});
        const actor = await ensureAgricultureActor(prisma, userId);
        const plotBody = body as AgriculturePlotCreateBody;
        const name = plotBody.name.trim();
        const crop = plotBody.crop.trim();
        const acres = toDecimal(plotBody.acres ?? 0) ?? new Prisma.Decimal(0);
        const plot = await prisma.$transaction(async (tx) => {
          const createdPlot = await tx.entity.create({
            data: {
              actorId: actor.id,
              kind: EntityKind.AGRICULTURE_PLOT,
              name: `plot-${name}`,
              metadata: toJsonValue({
                name,
                crop,
                stage: (plotBody.stage?.trim() || 'planned'),
                acres: acres.toFixed(2),
                fieldCode: plotBody.fieldCode?.trim() || null,
                soilType: plotBody.soilType?.trim() || null,
                irrigationZone: plotBody.irrigationZone?.trim() || null,
                notes: plotBody.notes?.trim() || null,
              }),
            },
          });
          const openSlots = await tx.entity.findMany({
            where: {
              actorId: actor.id,
              kind: EntityKind.AGRICULTURE_SLOT,
              targetId: null,
            },
          });
          openSlots.sort((a, b) => {
            const aIndex =
                metadataNumber(metadataRecord(a.metadata), 'slotIndex') ?? 0;
            const bIndex =
                metadataNumber(metadataRecord(b.metadata), 'slotIndex') ?? 0;
            return aIndex - bIndex;
          });
          if (openSlots.length) {
            await tx.entity.update({
              where: {id: openSlots[0].id},
              data: {targetId: createdPlot.id},
            });
          }
          return createdPlot;
        });
        await rt({
          eventType: 'agriculture.plot.create',
          source: 'api',
          payload: {plotId: plot.id},
        });
        return {id: plot.id};
      },
  );

  server.post(
      '/agriculture/plots/:id/condition',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const plotId = (request.params as {id: string}).id;
        const body = request.body as {
          temperature?: number;
          moisture?: number;
          ph?: number|string;
          notes?: string;
        }
        |undefined;
        const actor = await ensureAgricultureActor(prisma, userId);
        const plot = await prisma.entity.findFirst({
          where: {
            id: plotId,
            actorId: actor.id,
            kind: EntityKind.AGRICULTURE_PLOT
          },
        });
        if (!plot) return reply.status(404).send({error: 'Plot not found'});
        const recordedAt = new Date();
        const condition = await prisma.$transaction(async (tx) => {
          const created = await tx.entity.create({
            data: {
              actorId: actor.id,
              kind: EntityKind.AGRICULTURE_PLOT_CONDITION,
              targetId: plotId,
              metadata: toJsonValue({
                temperature: body?.temperature ?? null,
                moisture: body?.moisture ?? null,
                ph: body?.ph !== undefined ? String(body.ph) : null,
                notes: body?.notes ?? null,
              }),
            },
          });
          await tx.entity.update({
            where: {id: plotId},
            data: {
              metadata: toJsonValue({
                ...metadataRecord(plot.metadata),
                lastConditionAt: recordedAt.toISOString(),
              }),
            },
          });
          return created;
        });
        await rt({
          eventType: 'agriculture.plot.condition',
          source: 'api',
          payload: {plotId},
        });
        return buildConditionPayload(condition);
      },
  );

  server.get(
      '/agriculture/plans',
      {preHandler: [server.authenticate]},
      async (request) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const actor = await ensureAgricultureActor(prisma, userId);
        const plans = await prisma.entity.findMany({
          where: {actorId: actor.id, kind: EntityKind.AGRICULTURE_CROP_PLAN},
          orderBy: {createdAt: 'desc'},
        });
        const tasks = await prisma.entity.findMany({
          where: {actorId: actor.id, kind: EntityKind.AGRICULTURE_TASK},
        });
        const tasksByPlan = new Map<string, Entity[]>();
        tasks.forEach((task) => {
          const metadata = metadataRecord(task.metadata);
          const planId = metadataString(metadata, 'cropPlanId');
          if (!planId) return;
          const list = tasksByPlan.get(planId) ?? [];
          list.push(task);
          tasksByPlan.set(planId, list);
        });
        await rt({
          eventType: 'agriculture.plans.list',
          source: 'api',
          payload: {count: plans.length},
        });
        return {
          plans: plans.map(
              (plan) => buildPlanPayload(plan, tasksByPlan.get(plan.id) ?? [])),
        };
      },
  );

  server.post(
      '/agriculture/plans',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          plotId?: string;
          crop?: string;
          phase?: string;
          status?: string;
          startDate?: string;
          targetHarvestDate?: string;
          endDate?: string;
          notes?: string;
        }
        |undefined;
        if (!body?.plotId)
          return reply.status(400).send({error: 'plotId is required'});
        if (!body?.crop || !body.startDate)
          return reply.status(400).send(
              {error: 'crop and startDate are required'});
        const actor = await ensureAgricultureActor(prisma, userId);
        const plot = await prisma.entity.findFirst({
          where: {
            id: body.plotId,
            actorId: actor.id,
            kind: EntityKind.AGRICULTURE_PLOT
          },
        });
        if (!plot) return reply.status(404).send({error: 'Plot not found'});
        const start = new Date(body.startDate);
        if (Number.isNaN(start.valueOf()))
          return reply.status(400).send({error: 'Invalid startDate'});
        const metadata: Record<string, unknown> = {
          crop: body.crop.trim(),
          phase: body.phase?.trim() || 'planned',
          status: lifecycleStatusOrDefault(body.status, LifecycleStatus.ACTIVE),
          startDate: start.toISOString(),
          targetHarvestDate: body.targetHarvestDate ?
              new Date(body.targetHarvestDate).toISOString() :
              null,
          endDate: body.endDate ? new Date(body.endDate).toISOString() : null,
          notes: body.notes?.trim() || null,
        };
        const plan = await prisma.entity.create({
          data: {
            actorId: actor.id,
            kind: EntityKind.AGRICULTURE_CROP_PLAN,
            targetId: body.plotId,
            metadata: toJsonValue(metadata),
          },
        });
        await rt({
          eventType: 'agriculture.plan.create',
          source: 'api',
          payload: {planId: plan.id},
        });
        return buildPlanPayload(plan, []);
      },
  );

  server.get(
      '/agriculture/tasks',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const actor = await ensureAgricultureActor(prisma, userId);
        const query = request.query as {status?: string};
        const tasks = await prisma.entity.findMany({
          where: {actorId: actor.id, kind: EntityKind.AGRICULTURE_TASK},
        });
        let filtered = tasks;
        if (query.status) {
          const status = parseLifecycleStatus(query.status);
          if (!status)
            return reply.status(400).send({error: 'Invalid status filter'});
          filtered = tasks.filter((task) => {
            const metadata = metadataRecord(task.metadata);
            return metadataString(metadata, 'status') === status;
          });
        }
        filtered.sort((a, b) => {
          const aPriority =
              metadataNumber(metadataRecord(a.metadata), 'priority') ?? 0;
          const bPriority =
              metadataNumber(metadataRecord(b.metadata), 'priority') ?? 0;
          return aPriority - bPriority;
        });
        await rt({
          eventType: 'agriculture.tasks.list',
          source: 'api',
          payload: {count: filtered.length},
        });
        return {tasks: filtered.map((task) => buildTaskPayload(task))};
      },
  );

  server.post(
      '/agriculture/tasks',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          title?: string;
          assignee?: string;
          plotId?: string;
          cropPlanId?: string;
          priority?: number|string;
          dueDate?: string;
          notes?: string;
          tags?: unknown;
        }
        |undefined;
        if (!body?.title)
          return reply.status(400).send({error: 'title is required'});
        const actor = await ensureAgricultureActor(prisma, userId);
        if (body?.cropPlanId) {
          const plan = await prisma.entity.findFirst({
            where: {
              id: body.cropPlanId,
              actorId: actor.id,
              kind: EntityKind.AGRICULTURE_CROP_PLAN
            },
          });
          if (!plan)
            return reply.status(404).send({error: 'Crop plan not found'});
        }
        const priorityValue = Number(body?.priority ?? 0);
        const normalizedPrior = Number.isFinite(priorityValue) ?
            Math.max(1, Math.min(5, Math.floor(priorityValue))) :
            2;
        const metadata: Record<string, unknown> = {
          title: body.title.trim(),
          assignee: body.assignee?.trim() || null,
          plotId: body.plotId ?? null,
          cropPlanId: body.cropPlanId ?? null,
          priority: normalizedPrior,
          status: LifecycleStatus.ACTIVE,
          dueDate: body.dueDate ? new Date(body.dueDate).toISOString() : null,
          notes: body.notes?.trim() || null,
          tags: body.tags ?? null,
        };
        const task = await prisma.entity.create({
          data: {
            actorId: actor.id,
            kind: EntityKind.AGRICULTURE_TASK,
            metadata: toJsonValue(metadata),
          },
        });
        await rt({
          eventType: 'agriculture.task.create',
          source: 'api',
          payload: {taskId: task.id},
        });
        return buildTaskPayload(task);
      },
  );

  server.patch(
      '/agriculture/tasks/:id',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const taskId = (request.params as {id: string}).id;
        const body = request.body as {
          status?: string;
          assignee?: string;
          priority?: number|string;
          dueDate?: string|null;
          notes?: string|null;
          tags?: unknown;
        }
        |undefined;
        const actor = await ensureAgricultureActor(prisma, userId);
        const task = await prisma.entity.findFirst({
          where: {
            id: taskId,
            actorId: actor.id,
            kind: EntityKind.AGRICULTURE_TASK
          },
        });
        if (!task) return reply.status(404).send({error: 'Task not found'});
        const metadata = metadataRecord(task.metadata);
        const updates: Record<string, unknown> = {...metadata};
        if (body?.status) {
          const statusValue = parseLifecycleStatus(body.status);
          if (!statusValue)
            return reply.status(400).send({error: 'Invalid status'});
          updates.status = statusValue;
        }
        if (body?.assignee !== undefined)
          updates.assignee = body.assignee?.trim() || null;
        if (body?.priority !== undefined) {
          const parsedPriority = Number(body.priority);
          if (Number.isFinite(parsedPriority)) {
            updates.priority =
                Math.max(1, Math.min(5, Math.floor(parsedPriority)));
          }
        }
        if (body?.dueDate !== undefined) {
          if (body.dueDate === null) {
            updates.dueDate = null;
          } else {
            const next = new Date(body.dueDate);
            if (Number.isNaN(next.valueOf()))
              return reply.status(400).send({error: 'Invalid dueDate'});
            updates.dueDate = next.toISOString();
          }
        }
        if (body?.notes !== undefined)
          updates.notes = body.notes?.trim() || null;
        if (body?.tags !== undefined) updates.tags = body.tags ?? null;
        const updated = await prisma.entity.update({
          where: {id: taskId},
          data: {metadata: toJsonValue(updates)},
        });
        await rt({
          eventType: 'agriculture.task.update',
          source: 'api',
          payload: {taskId},
        });
        return buildTaskPayload(updated);
      },
  );

  server.get(
      '/agriculture/inventory',
      {preHandler: [server.authenticate]},
      async (request) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const actor = await ensureAgricultureActor(prisma, userId);
        const inventory = await prisma.entity.findMany({
          where:
              {actorId: actor.id, kind: EntityKind.AGRICULTURE_INVENTORY_ITEM},
        });
        const inventoryIds = inventory.map((item) => item.id);
        const movements = inventoryIds.length ? await prisma.entity.findMany({
          where: {
            actorId: actor.id,
            kind: EntityKind.AGRICULTURE_INVENTORY_MOVEMENT,
            targetType: 'inventory',
            targetId: {in : inventoryIds},
          },
          orderBy: {createdAt: 'desc'},
        }) :
                                                [];
        const movementMap = new Map<string, Entity[]>();
        movements.forEach((movement) => {
          if (!movement.targetId) return;
          const list = movementMap.get(movement.targetId) ?? [];
          if (list.length < 5) list.push(movement);
          movementMap.set(movement.targetId, list);
        });
        await rt({
          eventType: 'agriculture.inventory.list',
          source: 'api',
          payload: {count: inventory.length},
        });
        return {
          inventory: inventory.map(
              (item) =>
                  buildInventoryPayload(item, movementMap.get(item.id) ?? [])),
        };
      },
  );

  server.post(
      '/agriculture/inventory',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          sku?: string;
          unit?: string;
          quantity?: number|string;
          location?: string;
          description?: string;
        }
        |undefined;
        if (!body?.sku || !body?.unit)
          return reply.status(400).send({error: 'sku and unit are required'});
        const quantity = toDecimal(body.quantity ?? 0) ?? new Prisma.Decimal(0);
        const actor = await ensureAgricultureActor(prisma, userId);
        const item = await prisma.entity.create({
          data: {
            actorId: actor.id,
            kind: EntityKind.AGRICULTURE_INVENTORY_ITEM,
            metadata: toJsonValue({
              sku: body.sku.trim(),
              unit: body.unit.trim(),
              description: body.description?.trim() || null,
              totalQuantity: quantity.toFixed(2),
              location: body.location?.trim() || null,
              status: LifecycleStatus.STORED,
            }),
          },
        });
        await rt({
          eventType: 'agriculture.inventory.create',
          source: 'api',
          payload: {sku: body.sku.trim()},
        });
        return buildInventoryPayload(item, []);
      },
  );

  server.post(
      '/agriculture/inventory/movements',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          inventoryId?: string;
          type?: string;
          direction?: 'inbound'|'outbound';
          quantity?: number|string;
          reason?: string;
          shipmentId?: string;
        }
        |undefined;
        if (!body?.inventoryId)
          return reply.status(400).send({error: 'inventoryId is required'});
        const actor = await ensureAgricultureActor(prisma, userId);
        const inventory = await prisma.entity.findFirst({
          where: {
            id: body.inventoryId,
            actorId: actor.id,
            kind: EntityKind.AGRICULTURE_INVENTORY_ITEM,
          },
        });
        if (!inventory)
          return reply.status(404).send({error: 'Inventory item not found'});
        const qty = toDecimal(body.quantity);
        if (!qty || qty.lte(0))
          return reply.status(400).send(
              {error: 'quantity must be a positive number'});
        const direction = body?.direction === 'outbound' ? -1 : 1;
        const delta = qty.mul(direction);
        const metadata = metadataRecord(inventory.metadata);
        const existingTotal =
            toDecimal(metadataString(metadata, 'totalQuantity')) ??
            new Prisma.Decimal(0);
        const nextTotal = existingTotal.add(delta);
        if (nextTotal.lt(0))
          return reply.status(400).send(
              {error: 'Insufficient inventory for outbound movement'});
        const movement = await prisma.$transaction(async (tx) => {
          const created = await tx.entity.create({
            data: {
              actorId: actor.id,
              kind: EntityKind.AGRICULTURE_INVENTORY_MOVEMENT,
              targetType: 'inventory',
              targetId: inventory.id,
              metadata: toJsonValue({
                type: body?.type?.trim() ||
                    (direction === -1 ? 'outbound' : 'inbound'),
                quantity: qty.toFixed(2),
                reason: body?.reason?.trim() || null,
                shipmentId: body?.shipmentId || null,
              }),
            },
          });
          await tx.entity.update({
            where: {id: inventory.id},
            data: {
              metadata: toJsonValue({
                ...metadata,
                totalQuantity: nextTotal.toFixed(2),
              }),
            },
          });
          return created;
        });
        await rt({
          eventType: 'agriculture.inventory.movement',
          source: 'api',
          payload: {inventoryId: inventory.id, movementId: movement.id},
        });
        return buildInventoryPayload(inventory, [movement]);
      },
  );

  server.post(
      '/agriculture/shipments',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          lot?: string;
          destination?: string;
          mode?: string;
          eta?: string;
          freightLoadId?: string;
        }
        |undefined;
        if (!body?.lot || !body?.destination || !body?.mode) {
          return reply.status(400).send(
              {error: 'lot, destination, and mode are required'});
        }
        const actor = await ensureAgricultureActor(prisma, userId);
        const shipment = await prisma.entity.create({
          data: {
            actorId: actor.id,
            kind: EntityKind.AGRICULTURE_SHIPMENT,
            metadata: toJsonValue({
              lot: body.lot.trim(),
              destination: body.destination.trim(),
              mode: body.mode.trim(),
              eta: body.eta ? new Date(body.eta).toISOString() : null,
              freightLoadId: body.freightLoadId || null,
            }),
          },
        });
        await rt({
          eventType: 'agriculture.shipment.create',
          source: 'api',
          payload: {shipmentId: shipment.id},
        });
        return {id: shipment.id};
      },
  );

  server.get(
      '/agriculture/resources',
      {preHandler: [server.authenticate]},
      async (request) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const categories = await prisma.agricultureResourceCategory.findMany({
          orderBy: {title: 'asc'},
          include: {resources: {orderBy: {title: 'asc'}}},
        });
        await rt({
          eventType: 'agriculture.resources.fetch',
          source: 'api',
          payload: {count: categories.length},
        });
        return {categories: categories.map(serializeResourceCategory)};
      },
  );
}
