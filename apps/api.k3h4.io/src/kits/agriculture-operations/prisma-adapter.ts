import {type Entity, Prisma, type PrismaClient} from '@prisma/client';

import {
  buildAgricultureSlotSnapshotFromEntities,
  ensureAgricultureActor,
} from '../../actors/Agriculture/Agriculture';
import {ensureGeoActor} from '../../actors/Geo/Geo';
import {ACTOR_TYPES, ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {LIFECYCLE_STATUSES, type LifecycleStatus} from '../../lib/domain-constants';
import {lifecycleStatusOrDefault, parseLifecycleStatus} from '../../lib/status-utils';
import {createPrismaFreightRoutingKit} from '../freight-routing/prisma-adapter';

import {
  AgricultureOperationsError,
  type AgricultureOperationsHost,
  createAgricultureOperationsKit,
  type CreateAgricultureShipmentCommand,
} from './index';

const MAX_PLOT_SLOTS = 12;
const BASE_SLOT_COST = 100;
const SLOT_COST_STEP = 50;
const RESOURCE_ACTOR_SOURCE = 'agriculture-resources';
const RESOURCE_ACTOR_LABEL = 'Agriculture Resources';
const RESOURCE_CATEGORY_TARGET = 'agriculture-resource-category';

const toDecimal = (value: unknown) => {
  if (value instanceof Prisma.Decimal) return value;
  if (typeof value === 'number') return new Prisma.Decimal(value);
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return new Prisma.Decimal(parsed);
  }
  return null;
};

const metadataRecord = (value: Prisma.JsonValue|null|undefined) =>
  value && typeof value === 'object' && !Array.isArray(value) ?
    value as Record<string, unknown> :
    {};

const toJsonValue = (record: Record<string, unknown>) =>
  Object.keys(record).length ? record as Prisma.InputJsonValue : Prisma.JsonNull;

const metadataString = (metadata: Record<string, unknown>, key: string) => {
  const value = metadata[key];
  if (typeof value === 'string') return value;
  return value == null ? null : String(value);
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

const metadataStringArray =
    (metadata: Record<string, unknown>, key: string) => {
      const value = metadata[key];
      if (Array.isArray(value)) {
        return value.map((entry) => {
          if (typeof entry === 'string') return entry.trim();
          if (typeof entry === 'number') return String(entry);
          return null;
        }).filter((entry): entry is string => !!entry);
      }
      if (typeof value === 'string' && value.trim()) return [value.trim()];
      return [];
    };

const parseDateValue = (value: unknown) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  const date = new Date(String(value));
  return Number.isNaN(date.valueOf()) ? null : date;
};

const formatDateValue = (value: Date|null) => value?.toISOString() ?? null;
const metadataLifecycle = (metadata: Record<string, unknown>, key: string) =>
  metadataString(metadata, key) as LifecycleStatus|null;

const fail = (
    code: 'INVALID_INPUT'|'NOT_FOUND'|'LIMIT_REACHED', message: string): never => {
  throw new AgricultureOperationsError(code, message);
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
  const snapshot = buildAgricultureSlotSnapshotFromEntities(slot, plot ?? null);
  const slotIndex = metadataNumber(metadata, 'slotIndex');
  return {
    id: snapshot.id,
    slotIndex: Number.isFinite(slotIndex ?? NaN) ? slotIndex : snapshot.slotIndex,
    costPaid: metadataString(metadata, 'costPaid') ?? '0.00',
    unlockedAt: snapshot.unlockedAt.toISOString(),
    plotId: snapshot.plotId,
    plot: plot ? slotPlotDetails(plot) : null,
  };
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

const buildTaskPayload = (task: Entity) => {
  const metadata = metadataRecord(task.metadata);
  return {
    id: task.id,
    title: metadataString(metadata, 'title'),
    assignee: metadataString(metadata, 'assignee'),
    priority: metadataNumber(metadata, 'priority') ?? 2,
    status: metadataString(metadata, 'status') ?? LIFECYCLE_STATUSES.ACTIVE,
    tags: metadata.tags ?? null,
    notes: metadataString(metadata, 'notes') ?? null,
    dueDate: formatDateValue(parseDateValue(metadataString(metadata, 'dueDate'))),
    plotId: metadataString(metadata, 'plotId'),
    cropPlanId: metadataString(metadata, 'cropPlanId'),
  };
};

const buildPlanPayload = (plan: Entity, tasks: Entity[]) => {
  const metadata = metadataRecord(plan.metadata);
  return {
    id: plan.id,
    crop: metadataString(metadata, 'crop'),
    phase: metadataString(metadata, 'phase'),
    status: metadataLifecycle(metadata, 'status') ?? LIFECYCLE_STATUSES.ACTIVE,
    startDate: formatDateValue(parseDateValue(metadataString(metadata, 'startDate'))),
    targetHarvestDate: formatDateValue(
        parseDateValue(metadataString(metadata, 'targetHarvestDate'))),
    endDate: formatDateValue(parseDateValue(metadataString(metadata, 'endDate'))),
    notes: metadataString(metadata, 'notes') ?? null,
    tasks: tasks.map(buildTaskPayload),
  };
};

const buildPlotPayload = (
    plot: Entity, latestCondition: Entity|null, plans: Entity[],
    slotsByPlot: Map<string, Entity[]>) => {
  const metadata = metadataRecord(plot.metadata);
  const acres = toDecimal(metadata.acres);
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
    latestCondition: latestCondition ? buildConditionPayload(latestCondition) : null,
    plans: plans.map((plan) => {
      const planMetadata = metadataRecord(plan.metadata);
      return {
        id: plan.id,
        crop: metadataString(planMetadata, 'crop'),
        phase: metadataString(planMetadata, 'phase'),
        status: metadataLifecycle(planMetadata, 'status') ?? LIFECYCLE_STATUSES.ACTIVE,
        startDate: formatDateValue(parseDateValue(metadataString(planMetadata, 'startDate'))),
        targetHarvestDate: formatDateValue(
            parseDateValue(metadataString(planMetadata, 'targetHarvestDate'))),
        endDate: formatDateValue(parseDateValue(metadataString(planMetadata, 'endDate'))),
      };
    }),
    slots: (slotsByPlot.get(plot.id) ?? []).map((slot) => buildSlotPayload(slot, plot)),
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
  return {
    id: inventory.id,
    sku: metadataString(metadata, 'sku'),
    description: metadataString(metadata, 'description') ?? null,
    totalQuantity: metadataString(metadata, 'totalQuantity') ?? '0.00',
    unit: metadataString(metadata, 'unit'),
    location: metadataString(metadata, 'location') ?? null,
    status: metadataString(metadata, 'status') ?? LIFECYCLE_STATUSES.STORED,
    movements: movements.map(buildMovementPayload),
  };
};

const ensureResourceActor = async (prisma: PrismaClient) => {
  const actor = await prisma.actor.findFirst({
    where: {
      type: ACTOR_TYPES.AGRICULTURE_RESOURCE_LIBRARY,
      source: RESOURCE_ACTOR_SOURCE,
    },
  });
  return actor ?? prisma.actor.create({
    data: {
      type: ACTOR_TYPES.AGRICULTURE_RESOURCE_LIBRARY,
      label: RESOURCE_ACTOR_LABEL,
      source: RESOURCE_ACTOR_SOURCE,
    },
  });
};

export const createPrismaAgricultureOperationsHost =
    (prisma: PrismaClient): AgricultureOperationsHost => ({
      async getOverview(userId) {
        const actor = await ensureAgricultureActor(prisma, userId);
        const [plots, tasks, shipments, unlockedSlots, inventory] = await Promise.all([
          prisma.entity.count({where: {actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_PLOT}}),
          prisma.entity.count({where: {actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_TASK}}),
          prisma.entity.count({where: {actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_SHIPMENT}}),
          prisma.entity.count({where: {actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_SLOT}}),
          prisma.entity.findMany({where: {
            actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_INVENTORY_ITEM,
          }}),
        ]);
        const totals = inventory.reduce((result, item) => {
          const metadata = metadataRecord(item.metadata);
          const sku = metadataString(metadata, 'sku')?.toLowerCase();
          if (sku) result[sku] = metadataString(metadata, 'totalQuantity') ?? '0.00';
          return result;
        }, {} as Record<string, string>);
        return {
          plots, tasks, shipments, unlockedSlots,
          seeds: totals.seeds ?? '0.00',
          fertilizer: totals.fertilizer ?? '0.00',
          feed: totals.feed ?? '0.00',
          harvest: totals.harvest ?? '0.00',
          debt: '0.00', pnl: '0.00', burnRate: '0.00', receivables: '0.00',
        };
      },

      async getAnalytics(userId) {
        const actor = await ensureAgricultureActor(prisma, userId);
        const [totalPlots, plans, tasks, inventory, shipments] = await Promise.all([
          prisma.entity.count({where: {actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_PLOT}}),
          prisma.entity.findMany({where: {actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_CROP_PLAN}}),
          prisma.entity.findMany({where: {actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_TASK}}),
          prisma.entity.findMany({where: {actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_INVENTORY_ITEM}}),
          prisma.entity.findMany({where: {actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_SHIPMENT}}),
        ]);
        const planPhaseCounts = plans.reduce((result, plan) => {
          const phase = metadataString(metadataRecord(plan.metadata), 'phase') ?? 'unknown';
          result[phase] = (result[phase] ?? 0) + 1;
          return result;
        }, {} as Record<string, number>);
        const taskStatusCounts = tasks.reduce((result, task) => {
          const status = metadataString(metadataRecord(task.metadata), 'status') ?? 'active';
          result[status] = (result[status] ?? 0) + 1;
          return result;
        }, {} as Record<string, number>);
        const inventoryHighlights = [...inventory].sort((left, right) => {
          const leftQuantity = toDecimal(metadataString(metadataRecord(left.metadata), 'totalQuantity')) ?? new Prisma.Decimal(0);
          const rightQuantity = toDecimal(metadataString(metadataRecord(right.metadata), 'totalQuantity')) ?? new Prisma.Decimal(0);
          return rightQuantity.comparedTo(leftQuantity);
        }).slice(0, 3).map((item) => {
          const metadata = metadataRecord(item.metadata);
          return {
            sku: metadataString(metadata, 'sku'),
            totalQuantity: metadataString(metadata, 'totalQuantity') ?? '0.00',
            unit: metadataString(metadata, 'unit'),
          };
        });
        return {
          totalPlots, planPhaseCounts, taskStatusCounts, inventoryHighlights,
          trackedShipments: shipments.filter((shipment) =>
            !!metadataString(metadataRecord(shipment.metadata), 'eta')).length,
          pnl: '0.00', burnRate: '0.00', receivables: '0.00',
          animalAlerts: 0, debt: '0.00',
        };
      },

      async listSlots(userId) {
        const actor = await ensureAgricultureActor(prisma, userId);
        const slots = await prisma.entity.findMany({where: {
          actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_SLOT,
        }});
        const plotIds = slots.map((slot) => slot.targetId).filter(Boolean) as string[];
        const plots = plotIds.length ?
          await prisma.entity.findMany({where: {id: {in: plotIds}}}) : [];
        const plotMap = new Map(plots.map((plot) => [plot.id, plot]));
        slots.sort((left, right) =>
          (metadataNumber(metadataRecord(left.metadata), 'slotIndex') ?? 0) -
          (metadataNumber(metadataRecord(right.metadata), 'slotIndex') ?? 0));
        return {slots: slots.map((slot) =>
          buildSlotPayload(slot, plotMap.get(slot.targetId ?? '') ?? null))};
      },

      async unlockSlot(userId, command) {
        const actor = await ensureAgricultureActor(prisma, userId);
        const slotIndex = await prisma.entity.count({where: {
          actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_SLOT,
        }});
        if (slotIndex >= MAX_PLOT_SLOTS) fail('LIMIT_REACHED', 'Maximum slots reached');
        const defaultCost = slotIndex <= 0 ? 0 : BASE_SLOT_COST + SLOT_COST_STEP * slotIndex;
        const costPaid = toDecimal(command.costPaid) ?? new Prisma.Decimal(defaultCost);
        const slot = await prisma.entity.create({data: {
          actorId: actor.id,
          kind: ENTITY_KINDS.AGRICULTURE_SLOT,
          name: `slot-${slotIndex}`,
          metadata: toJsonValue({slotIndex, costPaid: costPaid.toFixed(2)}),
        }});
        return buildSlotPayload(slot, null);
      },

      async updateSlot(userId, slotId, command) {
        const actor = await ensureAgricultureActor(prisma, userId);
        const slot = await prisma.entity.findFirst({where: {
          id: slotId, actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_SLOT,
        }});
        if (!slot)
          throw new AgricultureOperationsError('NOT_FOUND', 'Slot not found');
        const plotId = command.plotId === undefined ? slot.targetId : command.plotId ?? null;
        if (plotId) {
          const plot = await prisma.entity.findFirst({where: {
            id: plotId, actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_PLOT,
          }});
          if (!plot) fail('NOT_FOUND', 'Plot not found');
        }
        const updated = await prisma.entity.update({
          where: {id: slotId}, data: {targetId: plotId},
        });
        const plot = updated.targetId ?
          await prisma.entity.findUnique({where: {id: updated.targetId}}) : null;
        return buildSlotPayload(updated, plot);
      },

      async listPlots(userId) {
        const actor = await ensureAgricultureActor(prisma, userId);
        const plots = await prisma.entity.findMany({where: {
          actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_PLOT,
        }});
        const plotIds = plots.map((plot) => plot.id);
        const conditions = plotIds.length ? await prisma.entity.findMany({
          where: {
            actorId: actor.id,
            kind: ENTITY_KINDS.AGRICULTURE_PLOT_CONDITION,
            targetId: {in: plotIds},
          },
          orderBy: {createdAt: 'desc'},
        }) : [];
        const plans = plotIds.length ? await prisma.entity.findMany({where: {
          actorId: actor.id,
          kind: ENTITY_KINDS.AGRICULTURE_CROP_PLAN,
          targetId: {in: plotIds},
        }}) : [];
        const slots = plotIds.length ? await prisma.entity.findMany({where: {
          actorId: actor.id,
          kind: ENTITY_KINDS.AGRICULTURE_SLOT,
          targetId: {in: plotIds},
        }}) : [];
        const latestCondition = new Map<string, Entity>();
        const plansByPlot = new Map<string, Entity[]>();
        const slotsByPlot = new Map<string, Entity[]>();
        for (const condition of conditions) {
          if (condition.targetId && !latestCondition.has(condition.targetId))
            latestCondition.set(condition.targetId, condition);
        }
        for (const plan of plans) {
          if (plan.targetId)
            plansByPlot.set(plan.targetId, [...(plansByPlot.get(plan.targetId) ?? []), plan]);
        }
        for (const slot of slots) {
          if (slot.targetId)
            slotsByPlot.set(slot.targetId, [...(slotsByPlot.get(slot.targetId) ?? []), slot]);
        }
        return {plots: plots.map((plot) => buildPlotPayload(
          plot, latestCondition.get(plot.id) ?? null,
          plansByPlot.get(plot.id) ?? [], slotsByPlot))};
      },

      async createPlot(userId, command) {
        if (!command.name || !command.crop)
          fail('INVALID_INPUT', 'name and crop are required');
        const actor = await ensureAgricultureActor(prisma, userId);
        const name = String(command.name).trim();
        const crop = String(command.crop).trim();
        const acres = toDecimal(command.acres ?? 0) ?? new Prisma.Decimal(0);
        const plot = await prisma.$transaction(async (tx) => {
          const created = await tx.entity.create({data: {
            actorId: actor.id,
            kind: ENTITY_KINDS.AGRICULTURE_PLOT,
            name: `plot-${name}`,
            metadata: toJsonValue({
              name, crop, stage: String(command.stage ?? '').trim() || 'planned',
              acres: acres.toFixed(2),
              fieldCode: String(command.fieldCode ?? '').trim() || null,
              soilType: String(command.soilType ?? '').trim() || null,
              irrigationZone: String(command.irrigationZone ?? '').trim() || null,
              notes: String(command.notes ?? '').trim() || null,
            }),
          }});
          const openSlots = await tx.entity.findMany({where: {
            actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_SLOT, targetId: null,
          }});
          openSlots.sort((left, right) =>
            (metadataNumber(metadataRecord(left.metadata), 'slotIndex') ?? 0) -
            (metadataNumber(metadataRecord(right.metadata), 'slotIndex') ?? 0));
          if (openSlots.length)
            await tx.entity.update({where: {id: openSlots[0].id}, data: {targetId: created.id}});
          return created;
        });
        return {id: plot.id};
      },

      async recordPlotCondition(userId, plotId, command) {
        const actor = await ensureAgricultureActor(prisma, userId);
        const plot = await prisma.entity.findFirst({where: {
          id: plotId, actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_PLOT,
        }});
        if (!plot)
          throw new AgricultureOperationsError('NOT_FOUND', 'Plot not found');
        const recordedAt = new Date();
        const condition = await prisma.$transaction(async (tx) => {
          const created = await tx.entity.create({data: {
            actorId: actor.id,
            kind: ENTITY_KINDS.AGRICULTURE_PLOT_CONDITION,
            targetId: plotId,
            metadata: toJsonValue({
              temperature: command.temperature ?? null,
              moisture: command.moisture ?? null,
              ph: command.ph !== undefined ? String(command.ph) : null,
              notes: command.notes ?? null,
            }),
          }});
          await tx.entity.update({where: {id: plotId}, data: {metadata: toJsonValue({
            ...metadataRecord(plot.metadata), lastConditionAt: recordedAt.toISOString(),
          })}});
          return created;
        });
        return buildConditionPayload(condition);
      },

      async listPlans(userId) {
        const actor = await ensureAgricultureActor(prisma, userId);
        const plans = await prisma.entity.findMany({
          where: {actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_CROP_PLAN},
          orderBy: {createdAt: 'desc'},
        });
        const tasks = await prisma.entity.findMany({where: {
          actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_TASK,
        }});
        const tasksByPlan = new Map<string, Entity[]>();
        for (const task of tasks) {
          const planId = metadataString(metadataRecord(task.metadata), 'cropPlanId');
          if (planId)
            tasksByPlan.set(planId, [...(tasksByPlan.get(planId) ?? []), task]);
        }
        return {plans: plans.map((plan) =>
          buildPlanPayload(plan, tasksByPlan.get(plan.id) ?? []))};
      },

      async createPlan(userId, command) {
        if (!command.plotId) fail('INVALID_INPUT', 'plotId is required');
        if (!command.crop || !command.startDate)
          fail('INVALID_INPUT', 'crop and startDate are required');
        const actor = await ensureAgricultureActor(prisma, userId);
        const plot = await prisma.entity.findFirst({where: {
          id: command.plotId, actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_PLOT,
        }});
        if (!plot) fail('NOT_FOUND', 'Plot not found');
        const startDate = new Date(command.startDate);
        if (Number.isNaN(startDate.valueOf())) fail('INVALID_INPUT', 'Invalid startDate');
        const plan = await prisma.entity.create({data: {
          actorId: actor.id,
          kind: ENTITY_KINDS.AGRICULTURE_CROP_PLAN,
          targetId: command.plotId,
          metadata: toJsonValue({
            crop: String(command.crop).trim(),
            phase: String(command.phase ?? '').trim() || 'planned',
            status: lifecycleStatusOrDefault(command.status, LIFECYCLE_STATUSES.ACTIVE),
            startDate: startDate.toISOString(),
            targetHarvestDate: command.targetHarvestDate ?
              new Date(command.targetHarvestDate).toISOString() : null,
            endDate: command.endDate ? new Date(command.endDate).toISOString() : null,
            notes: String(command.notes ?? '').trim() || null,
          }),
        }});
        return buildPlanPayload(plan, []);
      },

      async listTasks(userId, statusFilter) {
        const actor = await ensureAgricultureActor(prisma, userId);
        const tasks = await prisma.entity.findMany({where: {
          actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_TASK,
        }});
        let filtered = tasks;
        if (statusFilter) {
          const status = parseLifecycleStatus(statusFilter);
          if (!status) fail('INVALID_INPUT', 'Invalid status filter');
          filtered = tasks.filter((task) =>
            metadataString(metadataRecord(task.metadata), 'status') === status);
        }
        filtered.sort((left, right) =>
          (metadataNumber(metadataRecord(left.metadata), 'priority') ?? 0) -
          (metadataNumber(metadataRecord(right.metadata), 'priority') ?? 0));
        return {tasks: filtered.map(buildTaskPayload)};
      },

      async createTask(userId, command) {
        if (!command.title) fail('INVALID_INPUT', 'title is required');
        const actor = await ensureAgricultureActor(prisma, userId);
        if (command.cropPlanId) {
          const plan = await prisma.entity.findFirst({where: {
            id: command.cropPlanId,
            actorId: actor.id,
            kind: ENTITY_KINDS.AGRICULTURE_CROP_PLAN,
          }});
          if (!plan) fail('NOT_FOUND', 'Crop plan not found');
        }
        const priority = Number(command.priority ?? 0);
        const task = await prisma.entity.create({data: {
          actorId: actor.id,
          kind: ENTITY_KINDS.AGRICULTURE_TASK,
          metadata: toJsonValue({
            title: String(command.title).trim(),
            assignee: String(command.assignee ?? '').trim() || null,
            plotId: command.plotId ?? null,
            cropPlanId: command.cropPlanId ?? null,
            priority: Number.isFinite(priority) ?
              Math.max(1, Math.min(5, Math.floor(priority))) : 2,
            status: LIFECYCLE_STATUSES.ACTIVE,
            dueDate: command.dueDate ? new Date(command.dueDate).toISOString() : null,
            notes: String(command.notes ?? '').trim() || null,
            tags: command.tags ?? null,
          }),
        }});
        return buildTaskPayload(task);
      },

      async updateTask(userId, taskId, command) {
        const actor = await ensureAgricultureActor(prisma, userId);
        const task = await prisma.entity.findFirst({where: {
          id: taskId, actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_TASK,
        }});
        if (!task)
          throw new AgricultureOperationsError('NOT_FOUND', 'Task not found');
        const updates = {...metadataRecord(task.metadata)};
        if (command.status) {
          const status = parseLifecycleStatus(command.status);
          if (!status) fail('INVALID_INPUT', 'Invalid status');
          updates.status = status;
        }
        if (command.assignee !== undefined)
          updates.assignee = String(command.assignee ?? '').trim() || null;
        if (command.priority !== undefined) {
          const priority = Number(command.priority);
          if (Number.isFinite(priority))
            updates.priority = Math.max(1, Math.min(5, Math.floor(priority)));
        }
        if (command.dueDate !== undefined) {
          if (command.dueDate === null) updates.dueDate = null;
          else {
            const dueDate = new Date(command.dueDate);
            if (Number.isNaN(dueDate.valueOf())) fail('INVALID_INPUT', 'Invalid dueDate');
            updates.dueDate = dueDate.toISOString();
          }
        }
        if (command.notes !== undefined)
          updates.notes = String(command.notes ?? '').trim() || null;
        if (command.tags !== undefined) updates.tags = command.tags ?? null;
        const updated = await prisma.entity.update({
          where: {id: taskId}, data: {metadata: toJsonValue(updates)},
        });
        return buildTaskPayload(updated);
      },

      async listInventory(userId) {
        const actor = await ensureAgricultureActor(prisma, userId);
        const inventory = await prisma.entity.findMany({where: {
          actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_INVENTORY_ITEM,
        }});
        const inventoryIds = inventory.map((item) => item.id);
        const movements = inventoryIds.length ? await prisma.entity.findMany({
          where: {
            actorId: actor.id,
            kind: ENTITY_KINDS.AGRICULTURE_INVENTORY_MOVEMENT,
            targetType: 'inventory',
            targetId: {in: inventoryIds},
          },
          orderBy: {createdAt: 'desc'},
        }) : [];
        const movementMap = new Map<string, Entity[]>();
        for (const movement of movements) {
          if (!movement.targetId) continue;
          const bucket = movementMap.get(movement.targetId) ?? [];
          if (bucket.length < 5) bucket.push(movement);
          movementMap.set(movement.targetId, bucket);
        }
        return {inventory: inventory.map((item) =>
          buildInventoryPayload(item, movementMap.get(item.id) ?? []))};
      },

      async createInventoryItem(userId, command) {
        if (!command.sku || !command.unit)
          fail('INVALID_INPUT', 'sku and unit are required');
        const actor = await ensureAgricultureActor(prisma, userId);
        const quantity = toDecimal(command.quantity ?? 0) ?? new Prisma.Decimal(0);
        const item = await prisma.entity.create({data: {
          actorId: actor.id,
          kind: ENTITY_KINDS.AGRICULTURE_INVENTORY_ITEM,
          metadata: toJsonValue({
            sku: String(command.sku).trim(),
            unit: String(command.unit).trim(),
            description: String(command.description ?? '').trim() || null,
            totalQuantity: quantity.toFixed(2),
            location: String(command.location ?? '').trim() || null,
            status: LIFECYCLE_STATUSES.STORED,
          }),
        }});
        return buildInventoryPayload(item, []);
      },

      async recordInventoryMovement(userId, command) {
        if (!command.inventoryId) fail('INVALID_INPUT', 'inventoryId is required');
        const actor = await ensureAgricultureActor(prisma, userId);
        const inventory = await prisma.entity.findFirst({where: {
          id: command.inventoryId,
          actorId: actor.id,
          kind: ENTITY_KINDS.AGRICULTURE_INVENTORY_ITEM,
        }});
        if (!inventory) {
          throw new AgricultureOperationsError(
              'NOT_FOUND', 'Inventory item not found');
        }
        const quantity = toDecimal(command.quantity);
        if (!quantity || quantity.lte(0)) {
          throw new AgricultureOperationsError(
              'INVALID_INPUT', 'quantity must be a positive number');
        }
        const direction = command.direction === 'outbound' ? -1 : 1;
        const metadata = metadataRecord(inventory.metadata);
        const current = toDecimal(metadataString(metadata, 'totalQuantity')) ?? new Prisma.Decimal(0);
        const next = current.add(quantity.mul(direction));
        if (next.lt(0))
          fail('INVALID_INPUT', 'Insufficient inventory for outbound movement');
        const movement = await prisma.$transaction(async (tx) => {
          const created = await tx.entity.create({data: {
            actorId: actor.id,
            kind: ENTITY_KINDS.AGRICULTURE_INVENTORY_MOVEMENT,
            targetType: 'inventory',
            targetId: inventory.id,
            metadata: toJsonValue({
              type: String(command.type ?? '').trim() ||
                (direction === -1 ? 'outbound' : 'inbound'),
              quantity: quantity.toFixed(2),
              reason: String(command.reason ?? '').trim() || null,
              shipmentId: command.shipmentId ?? null,
            }),
          }});
          await tx.entity.update({where: {id: inventory.id}, data: {
            metadata: toJsonValue({...metadata, totalQuantity: next.toFixed(2)}),
          }});
          return created;
        });
        return buildInventoryPayload(inventory, [movement]);
      },

      async createShipment(userId, command: CreateAgricultureShipmentCommand) {
        const actor = await ensureAgricultureActor(prisma, userId);
        const shipment = await prisma.entity.create({data: {
          actorId: actor.id,
          kind: ENTITY_KINDS.AGRICULTURE_SHIPMENT,
          metadata: toJsonValue({
            lot: command.lot.trim(),
            destination: command.destination.trim(),
            mode: command.mode.trim(),
            eta: command.eta ? new Date(command.eta).toISOString() : null,
            freightLoadId: command.freightLoadId ?? null,
          }),
        }});
        return {id: shipment.id};
      },

      async listResources() {
        const actor = await ensureResourceActor(prisma);
        const categories = await prisma.entity.findMany({
          where: {actorId: actor.id, kind: ENTITY_KINDS.AGRICULTURE_RESOURCE_CATEGORY},
          orderBy: {name: 'asc'},
        });
        const categoryIds = categories.map((category) => category.id);
        const resources = categoryIds.length ? await prisma.entity.findMany({
          where: {
            actorId: actor.id,
            kind: ENTITY_KINDS.AGRICULTURE_RESOURCE,
            targetType: RESOURCE_CATEGORY_TARGET,
            targetId: {in: categoryIds},
          },
          orderBy: {name: 'asc'},
        }) : [];
        const resourcesByCategory = new Map<string, Entity[]>();
        for (const resource of resources) {
          if (resource.targetId)
            resourcesByCategory.set(resource.targetId, [
              ...(resourcesByCategory.get(resource.targetId) ?? []), resource,
            ]);
        }
        return {categories: categories.map((category) => {
          const metadata = metadataRecord(category.metadata);
          return {
            id: category.id,
            slug: metadataString(metadata, 'slug') ?? null,
            title: category.name ?? metadataString(metadata, 'title') ??
              metadataString(metadata, 'slug') ?? category.id,
            description: metadataString(metadata, 'description') ?? null,
            resources: (resourcesByCategory.get(category.id) ?? []).map((resource) => {
              const resourceMetadata = metadataRecord(resource.metadata);
              return {
                id: resource.id,
                title: resource.name ?? metadataString(resourceMetadata, 'title') ??
                  metadataString(resourceMetadata, 'slug') ?? resource.id,
                summary: metadataString(resourceMetadata, 'summary') ?? null,
                url: metadataString(resourceMetadata, 'url') ?? null,
                tags: metadataStringArray(resourceMetadata, 'tags'),
                source: metadataString(resourceMetadata, 'source') ?? null,
              };
            }),
          };
        })};
      },
    });

export const createPrismaAgricultureOperationsKit = (prisma: PrismaClient) => {
  const freight = createPrismaFreightRoutingKit(
      prisma, async (userId) => (await ensureGeoActor(prisma, userId)).id);
  return createAgricultureOperationsKit({
    host: createPrismaAgricultureOperationsHost(prisma),
    freight,
  });
};