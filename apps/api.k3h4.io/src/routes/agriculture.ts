import { Prisma, type PrismaClient } from "@prisma/client";
import { type FastifyInstance } from "fastify";
import { withTelemetryBase } from "./telemetry";
import { type RecordTelemetryFn } from "./types";

const decimalToString = (value: Prisma.Decimal | null | undefined) => {
  if (value instanceof Prisma.Decimal) return value.toFixed(2);
  return "0.00";
};

const MAX_PLOT_SLOTS = 12;
const BASE_SLOT_COST = 100;
const SLOT_COST_STEP = 50;

const toDecimal = (value: unknown | undefined) => {
  if (value instanceof Prisma.Decimal) return value;
  if (typeof value === "number") return new Prisma.Decimal(value.toFixed(2));
  if (typeof value === "string") {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return null;
    return new Prisma.Decimal(parsed.toFixed(2));
  }
  return null;
};

const computeSlotCost = (slotIndex: number) => {
  if (slotIndex <= 0) return new Prisma.Decimal(0);
  return new Prisma.Decimal(BASE_SLOT_COST + SLOT_COST_STEP * slotIndex);
};

const serializeTask = (task: any) => ({
  id: task.id,
  title: task.title,
  assignee: task.assignee,
  priority: task.priority,
  status: task.status,
  tags: task.tags ?? null,
  notes: task.notes ?? null,
  dueDate: task.dueDate ? task.dueDate.toISOString() : null,
  plotId: task.plotId,
  cropPlanId: task.cropPlanId,
});

const serializePlan = (plan: any) => ({
  id: plan.id,
  crop: plan.crop,
  phase: plan.phase,
  status: plan.status,
  startDate: plan.startDate.toISOString(),
  targetHarvestDate: plan.targetHarvestDate ? plan.targetHarvestDate.toISOString() : null,
  endDate: plan.endDate ? plan.endDate.toISOString() : null,
  notes: plan.notes ?? null,
  plotId: plan.plotId,
  tasks: plan.tasks ? plan.tasks.map(serializeTask) : [],
});

const serializePlot = (plot: any) => {
  const latestCondition = plot.conditions?.[0];
  return {
    id: plot.id,
    name: plot.name,
    fieldCode: plot.fieldCode,
    crop: plot.crop,
    stage: plot.stage,
    acres: plot.acres.toFixed(2),
    health: plot.health,
    soilType: plot.soilType,
    irrigationZone: plot.irrigationZone,
    notes: plot.notes,
    lastConditionAt: plot.lastConditionAt ? plot.lastConditionAt.toISOString() : null,
    latestCondition: latestCondition
      ? {
          recordedAt: latestCondition.recordedAt.toISOString(),
          temperature: latestCondition.temperature ?? null,
          moisture: latestCondition.moisture ?? null,
          ph: latestCondition.ph instanceof Prisma.Decimal ? latestCondition.ph.toFixed(2) : null,
          notes: latestCondition.notes ?? null,
        }
      : null,
    plans: plot.cropPlans
      ? plot.cropPlans.map((plan: any) => ({
          id: plan.id,
          crop: plan.crop,
          phase: plan.phase,
          status: plan.status,
          startDate: plan.startDate.toISOString(),
          targetHarvestDate: plan.targetHarvestDate ? plan.targetHarvestDate.toISOString() : null,
          endDate: plan.endDate ? plan.endDate.toISOString() : null,
        }))
      : [],
    slots: plot.slots ? plot.slots.map(serializeSlot) : [],
  };
};

const serializeInventory = (inventory: any) => ({
  id: inventory.id,
  sku: inventory.sku,
  description: inventory.description,
  totalQuantity: inventory.totalQuantity instanceof Prisma.Decimal ? inventory.totalQuantity.toFixed(2) : "0.00",
  unit: inventory.unit,
  location: inventory.location,
  status: inventory.status,
  movements: inventory.movements
    ? inventory.movements.map((movement: any) => ({
        id: movement.id,
        type: movement.type,
        quantity: movement.quantity instanceof Prisma.Decimal ? movement.quantity.toFixed(2) : "0.00",
        reason: movement.reason,
        shipmentId: movement.shipmentId,
        createdAt: movement.createdAt.toISOString(),
      }))
    : [],
});

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
  resources: category.resources ? category.resources.map(serializeResource) : [],
});

const serializeSlot = (slot: any) => ({
  id: slot.id,
  slotIndex: slot.slotIndex,
  costPaid: slot.costPaid instanceof Prisma.Decimal ? slot.costPaid.toFixed(2) : "0.00",
  unlockedAt: slot.unlockedAt.toISOString(),
  plotId: slot.plotId ?? null,
  plot: slot.plot
    ? {
        id: slot.plot.id,
        name: slot.plot.name,
        crop: slot.plot.crop,
        stage: slot.plot.stage,
      }
    : null,
});

export function registerAgricultureRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  server.get(
    "/agriculture/overview",
    { preHandler: [server.authenticate] },
    async (request) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const [plots, tasks, shipments, slots, inventorySummary] = await Promise.all([
        prisma.agriculturePlot.findMany({ where: { userId } }),
        prisma.agricultureTask.findMany({ where: { userId } }),
        prisma.agricultureShipment.findMany({ where: { userId } }),
        prisma.agricultureSlot.count({ where: { userId } }),
        prisma.agricultureInventory.groupBy({
          by: ["sku"],
          where: { userId },
          _sum: { totalQuantity: true },
        }),
      ]);
      const inventory = inventorySummary.reduce((acc, row) => {
        acc[row.sku.toLowerCase()] = row._sum.totalQuantity instanceof Prisma.Decimal ? row._sum.totalQuantity.toFixed(2) : "0.00";
        return acc;
      }, {} as Record<string, string>);
      await rt({ eventType: "agriculture.overview.fetch", source: "api", payload: {} });
      return {
        plots: plots.length,
        tasks: tasks.length,
        shipments: shipments.length,
        unlockedSlots: slots,
        seeds: inventory.seeds ?? "0.00",
        fertilizer: inventory.fertilizer ?? "0.00",
        feed: inventory.feed ?? "0.00",
        harvest: inventory.harvest ?? "0.00",
        debt: "0.00",
        pnl: "0.00",
        burnRate: "0.00",
        receivables: "0.00",
      };
    },
  );

  server.get(
    "/agriculture/slots",
    { preHandler: [server.authenticate] },
    async (request) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const slots = await prisma.agricultureSlot.findMany({
        where: { userId },
        orderBy: { slotIndex: "asc" },
        include: { plot: { select: { id: true, name: true, crop: true, stage: true } } },
      });
      await rt({ eventType: "agriculture.slots.list", source: "api", payload: { count: slots.length } });
      return { slots: slots.map(serializeSlot) };
    },
  );

  server.post(
    "/agriculture/slots/unlock",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as { costPaid?: number | string } | undefined;

      const unlockedCount = await prisma.agricultureSlot.count({ where: { userId } });
      if (unlockedCount >= MAX_PLOT_SLOTS) return reply.status(400).send({ error: "Maximum slots reached" });

      const slotIndex = unlockedCount;
      const costPaid = toDecimal(body?.costPaid) ?? computeSlotCost(slotIndex);

      const slot = await prisma.agricultureSlot.create({
        data: {
          userId,
          slotIndex,
          costPaid,
        },
        include: { plot: { select: { id: true, name: true, crop: true, stage: true } } },
      });

      await rt({
        eventType: "agriculture.slot.unlock",
        source: "api",
        payload: { slotIndex, costPaid: costPaid instanceof Prisma.Decimal ? costPaid.toString() : `${costPaid}` },
      });

      return serializeSlot(slot);
    },
  );

  server.patch(
    "/agriculture/slots/:id",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const slotId = (request.params as { id: string }).id;
      const body = request.body as { plotId?: string | null } | undefined;

      const slot = await prisma.agricultureSlot.findFirst({
        where: { id: slotId, userId },
        include: { plot: { select: { id: true, name: true, crop: true, stage: true } } },
      });
      if (!slot) return reply.status(404).send({ error: "Slot not found" });

      const nextPlotId = body?.plotId === undefined ? slot.plotId : body.plotId ?? null;
      if (nextPlotId) {
        const plot = await prisma.agriculturePlot.findFirst({ where: { id: nextPlotId, userId } });
        if (!plot) return reply.status(404).send({ error: "Plot not found for slot" });
      }

      const updated = await prisma.agricultureSlot.update({
        where: { id: slotId },
        data: { plotId: nextPlotId },
        include: { plot: { select: { id: true, name: true, crop: true, stage: true } } },
      });

      await rt({ eventType: "agriculture.slot.update", source: "api", payload: { slotId, plotId: nextPlotId } });

      return serializeSlot(updated);
    },
  );

  server.get(
    "/agriculture/plots",
    { preHandler: [server.authenticate] },
    async (request) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const plots = await prisma.agriculturePlot.findMany({
        where: { userId },
        include: {
          cropPlans: {
            orderBy: { startDate: "desc" },
            take: 3,
            select: {
              id: true,
              crop: true,
              phase: true,
              status: true,
              startDate: true,
              targetHarvestDate: true,
              endDate: true,
            },
          },
          conditions: {
            orderBy: { recordedAt: "desc" },
            take: 1,
          },
          slots: true,
        },
      });
      await rt({ eventType: "agriculture.plots.list", source: "api", payload: { count: plots.length } });
      return { plots: plots.map(serializePlot) };
    },
  );

  server.post(
    "/agriculture/plots",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as { name?: string; crop?: string; acres?: number | string; stage?: string; fieldCode?: string; soilType?: string; irrigationZone?: string; notes?: string } | undefined;
      if (!body?.name || !body?.crop) return reply.status(400).send({ error: "name and crop are required" });
      const acres = toDecimal(body.acres ?? 0) ?? new Prisma.Decimal(0);
      const plot = await prisma.$transaction(async (tx) => {
        const createdPlot = await tx.agriculturePlot.create({
          data: {
            userId,
            name: body.name.trim(),
            crop: body.crop.trim(),
            stage: body.stage?.trim() || "planned",
            acres,
            fieldCode: body.fieldCode?.trim() || null,
            soilType: body.soilType?.trim() || null,
            irrigationZone: body.irrigationZone?.trim() || null,
            notes: body.notes?.trim() || null,
          },
        });

        const openSlot = await tx.agricultureSlot.findFirst({ where: { userId, plotId: null }, orderBy: { slotIndex: "asc" } });
        if (openSlot) {
          await tx.agricultureSlot.update({ where: { id: openSlot.id }, data: { plotId: createdPlot.id } });
        }

        return createdPlot;
      });
      await rt({ eventType: "agriculture.plot.create", source: "api", payload: { plotId: plot.id } });
      return { id: plot.id };
    },
  );

  server.post(
    "/agriculture/plots/:id/condition",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const plotId = (request.params as { id: string }).id;
      const body = request.body as {
        temperature?: number;
        moisture?: number;
        ph?: number | string;
        notes?: string;
      } | undefined;

      const plot = await prisma.agriculturePlot.findFirst({ where: { id: plotId, userId } });
      if (!plot) return reply.status(404).send({ error: "Plot not found" });

      const recordedAt = new Date();
      const created = await prisma.$transaction(async (tx) => {
        const condition = await tx.agriculturePlotCondition.create({
          data: {
            userId,
            plotId,
            recordedAt,
            temperature: typeof body?.temperature === "number" ? body.temperature : null,
            moisture: typeof body?.moisture === "number" ? body.moisture : null,
            ph: toDecimal(body?.ph),
            notes: body?.notes ?? null,
          },
        });
        await tx.agriculturePlot.update({ where: { id: plotId }, data: { lastConditionAt: recordedAt } });
        return condition;
      });

      await rt({ eventType: "agriculture.plot.condition", source: "api", payload: { plotId } });
      return {
        id: created.id,
        recordedAt: created.recordedAt.toISOString(),
        temperature: created.temperature,
        moisture: created.moisture,
        ph: created.ph ? created.ph.toFixed(2) : null,
        notes: created.notes,
      };
    },
  );

  server.get(
    "/agriculture/plans",
    { preHandler: [server.authenticate] },
    async (request) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const plans = await prisma.agricultureCropPlan.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: { tasks: { orderBy: { dueDate: "asc" } } },
      });
      await rt({ eventType: "agriculture.plans.list", source: "api", payload: { count: plans.length } });
      return { plans: plans.map(serializePlan) };
    },
  );

  server.post(
    "/agriculture/plans",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as {
        plotId?: string;
        crop?: string;
        phase?: string;
        status?: string;
        startDate?: string;
        targetHarvestDate?: string;
        endDate?: string;
        notes?: string;
      } | undefined;

      const plotId = body?.plotId;
      if (!plotId) return reply.status(400).send({ error: "plotId is required" });
      const plot = await prisma.agriculturePlot.findFirst({ where: { id: plotId, userId } });
      if (!plot) return reply.status(404).send({ error: "Plot not found" });

      if (!body?.crop || !body.startDate) {
        return reply.status(400).send({ error: "crop and startDate are required" });
      }

      const start = new Date(body.startDate);
      if (Number.isNaN(start.valueOf())) return reply.status(400).send({ error: "Invalid startDate" });

      const plan = await prisma.agricultureCropPlan.create({
        data: {
          userId,
          plotId,
          crop: body.crop.trim(),
          phase: body.phase?.trim() || "planned",
          status: body.status?.trim() || "active",
          startDate: start,
          targetHarvestDate: body.targetHarvestDate ? new Date(body.targetHarvestDate) : null,
          endDate: body.endDate ? new Date(body.endDate) : null,
          notes: body.notes?.trim() || null,
        },
      });

      await rt({ eventType: "agriculture.plan.create", source: "api", payload: { planId: plan.id } });
      return serializePlan({ ...plan, tasks: [] });
    },
  );

  server.get(
    "/agriculture/tasks",
    { preHandler: [server.authenticate] },
    async (request) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const query = request.query as { status?: string };
      const where: Prisma.AgricultureTaskWhereInput = { userId };
      if (query.status) where.status = query.status;
      const tasks = await prisma.agricultureTask.findMany({ where, orderBy: { priority: "asc" } });
      await rt({ eventType: "agriculture.tasks.list", source: "api", payload: { count: tasks.length } });
      return { tasks: tasks.map(serializeTask) };
    },
  );

  server.post(
    "/agriculture/tasks",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as {
        title?: string;
        assignee?: string;
        plotId?: string;
        cropPlanId?: string;
        priority?: number | string;
        dueDate?: string;
        notes?: string;
        tags?: unknown;
      } | undefined;

      if (!body?.title) return reply.status(400).send({ error: "title is required" });
      if (body?.cropPlanId && !(await prisma.agricultureCropPlan.findFirst({ where: { id: body.cropPlanId, userId } }))) {
        return reply.status(404).send({ error: "Crop plan not found" });
      }

      const priorityValue = body?.priority !== undefined ? Number(body.priority) : NaN;
      const normalizedPriority = Number.isFinite(priorityValue) ? Math.max(1, Math.min(5, Math.floor(priorityValue))) : 2;

      const task = await prisma.agricultureTask.create({
        data: {
          userId,
          title: body.title.trim(),
          assignee: body.assignee?.trim() || null,
          plotId: body.plotId || null,
          cropPlanId: body.cropPlanId || null,
          priority: normalizedPriority,
          dueDate: body?.dueDate ? new Date(body.dueDate) : null,
          notes: body?.notes?.trim() || null,
          tags: body?.tags ?? null,
        },
      });

      await rt({ eventType: "agriculture.task.create", source: "api", payload: { taskId: task.id } });
      return serializeTask(task);
    },
  );

  server.patch(
    "/agriculture/tasks/:id",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const taskId = (request.params as { id: string }).id;
      const body = request.body as {
        status?: string;
        assignee?: string;
        priority?: number | string;
        dueDate?: string;
        notes?: string;
        tags?: unknown;
      } | undefined;

      const task = await prisma.agricultureTask.findFirst({ where: { id: taskId, userId } });
      if (!task) return reply.status(404).send({ error: "Task not found" });

      const updates: Prisma.AgricultureTaskUpdateInput = {};
      if (body?.status) updates.status = body.status.trim();
      if (body?.assignee) updates.assignee = body.assignee.trim();
      const requestedPriority = body?.priority !== undefined ? Number(body.priority) : NaN;
      if (Number.isFinite(requestedPriority)) {
        updates.priority = Math.max(1, Math.min(5, Math.floor(requestedPriority)));
      }
      if (body?.dueDate) {
        const next = new Date(body.dueDate);
        if (Number.isNaN(next.valueOf())) return reply.status(400).send({ error: "Invalid dueDate" });
        updates.dueDate = next;
      }
      if (body?.notes !== undefined) updates.notes = body.notes?.trim() || null;
      if (body?.tags !== undefined) updates.tags = body.tags ?? null;

      const updated = await prisma.agricultureTask.update({ where: { id: taskId }, data: updates });
      await rt({ eventType: "agriculture.task.update", source: "api", payload: { taskId } });
      return serializeTask(updated);
    },
  );

  server.get(
    "/agriculture/inventory",
    { preHandler: [server.authenticate] },
    async (request) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const inventory = await prisma.agricultureInventory.findMany({
        where: { userId },
        include: { movements: { orderBy: { createdAt: "desc" }, take: 5 } },
      });
      await rt({ eventType: "agriculture.inventory.list", source: "api", payload: { count: inventory.length } });
      return { inventory: inventory.map(serializeInventory) };
    },
  );

  server.post(
    "/agriculture/inventory",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as {
        sku?: string;
        unit?: string;
        quantity?: number | string;
        location?: string;
        description?: string;
      } | undefined;

      if (!body?.sku || !body.unit) return reply.status(400).send({ error: "sku and unit are required" });
      const quantity = toDecimal(body.quantity ?? 0) ?? new Prisma.Decimal(0);

      const item = await prisma.agricultureInventory.create({
        data: {
          userId,
          sku: body.sku.trim(),
          unit: body.unit.trim(),
          description: body.description?.trim() || null,
          totalQuantity: quantity,
          location: body.location?.trim() || null,
        },
      });

      await rt({ eventType: "agriculture.inventory.create", source: "api", payload: { sku: item.sku } });
      return serializeInventory({ ...item, movements: [] });
    },
  );

  server.post(
    "/agriculture/inventory/movements",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as {
        inventoryId?: string;
        type?: string;
        direction?: "inbound" | "outbound";
        quantity?: number | string;
        reason?: string;
        shipmentId?: string;
      } | undefined;

      if (!body?.inventoryId) return reply.status(400).send({ error: "inventoryId is required" });
      const inventory = await prisma.agricultureInventory.findFirst({ where: { id: body.inventoryId, userId } });
      if (!inventory) return reply.status(404).send({ error: "Inventory item not found" });

      const quantity = toDecimal(body.quantity);
      if (!quantity || quantity.lte(0)) return reply.status(400).send({ error: "quantity must be a positive number" });

      const direction = body?.direction === "outbound" ? -1 : 1;
      const delta = quantity.mul(direction);
      const nextTotal = inventory.totalQuantity.add(delta);
      if (nextTotal.lt(0)) {
        return reply.status(400).send({ error: "Insufficient inventory for outbound movement" });
      }

      const movement = await prisma.$transaction(async (tx) => {
        const created = await tx.agricultureInventoryMovement.create({
          data: {
            userId,
            inventoryId: inventory.id,
            shipmentId: body?.shipmentId || null,
            type: body?.type?.trim() || (direction === -1 ? "outbound" : "inbound"),
            quantity,
            reason: body?.reason?.trim() || null,
          },
        });
        await tx.agricultureInventory.update({ where: { id: inventory.id }, data: { totalQuantity: nextTotal } });
        return created;
      });

      await rt({ eventType: "agriculture.inventory.movement", source: "api", payload: { inventoryId: inventory.id, movementId: movement.id } });
      return serializeInventory({ ...inventory, totalQuantity: nextTotal, movements: [movement] });
    },
  );

  server.post(
    "/agriculture/shipments",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as {
        lot?: string;
        destination?: string;
        mode?: string;
        eta?: string;
        freightLoadId?: string;
      } | undefined;

      if (!body?.lot || !body?.destination || !body?.mode) {
        return reply.status(400).send({ error: "lot, destination, and mode are required" });
      }

      const shipment = await prisma.agricultureShipment.create({
        data: {
          userId,
          lot: body.lot.trim(),
          destination: body.destination.trim(),
          mode: body.mode.trim(),
          eta: body.eta ? new Date(body.eta) : null,
          freightLoadId: body.freightLoadId || null,
        },
      });

      await rt({ eventType: "agriculture.shipment.create", source: "api", payload: { shipmentId: shipment.id } });
      return { id: shipment.id };
    },
  );

  server.get(
    "/agriculture/resources",
    { preHandler: [server.authenticate] },
    async (request) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const categories = await prisma.agricultureResourceCategory.findMany({
        orderBy: { title: "asc" },
        include: { resources: { orderBy: { title: "asc" } } },
      });
      await rt({ eventType: "agriculture.resources.fetch", source: "api", payload: { count: categories.length } });
      return { categories: categories.map(serializeResourceCategory) };
    },
  );

  server.get(
    "/agriculture/analytics",
    { preHandler: [server.authenticate] },
    async (request) => {
      const rt = withTelemetryBase(recordTelemetry, request);
      const userId = (request.user as { sub: string }).sub;
      const [totalPlots, planPhases, taskStatuses, inventoryItems, shipmentCount] = await Promise.all([
        prisma.agriculturePlot.count({ where: { userId } }),
        prisma.agricultureCropPlan.groupBy({
          by: ["phase"],
          where: { userId },
          _count: { phase: true },
        }),
        prisma.agricultureTask.groupBy({
          by: ["status"],
          where: { userId },
          _count: { status: true },
        }),
        prisma.agricultureInventory.findMany({ where: { userId }, orderBy: { totalQuantity: "desc" }, take: 3 }),
        prisma.agricultureShipment.count({ where: { userId, eta: { not: null } } }),
      ]);

      const phases = planPhases.reduce((acc, phase) => {
        acc[phase.phase] = phase._count.phase;
        return acc;
      }, {} as Record<string, number>);
      const statuses = taskStatuses.reduce((acc, status) => {
        acc[status.status] = status._count.status;
        return acc;
      }, {} as Record<string, number>);

      await rt({ eventType: "agriculture.analytics.fetch", source: "api", payload: {} });
      return {
        totalPlots,
        planPhaseCounts: phases,
        taskStatusCounts: statuses,
        inventoryHighlights: inventoryItems.map((item) => ({
          sku: item.sku,
          totalQuantity: decimalToString(item.totalQuantity),
          unit: item.unit,
        })),
        trackedShipments: shipmentCount,
        pnl: "0.00",
        burnRate: "0.00",
        receivables: "0.00",
        animalAlerts: 0,
        debt: "0.00",
      };
    },
  );
}
