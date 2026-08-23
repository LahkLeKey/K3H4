import type {FreightRoutingKit} from '../freight-routing';

export type AgriculturePayload = Record<string, any>;

export type AgricultureSlotSnapshot = {
  id: string;
  slotIndex: number;
  costPaid: string;
  plotId: string|null;
  slug: string|null;
  unlockedAt: Date;
};

export type CreateAgricultureShipmentCommand = {
  lot: string;
  destination: string;
  mode: string;
  eta?: string;
  freightLoadId?: string;
};

export type AgricultureOperationsErrorCode =
  'FREIGHT_LOAD_NOT_FOUND'|'INVALID_INPUT'|'NOT_FOUND'|'LIMIT_REACHED';

export class AgricultureOperationsError extends Error {
  constructor(
      public readonly code: AgricultureOperationsErrorCode, message: string) {
    super(message);
    this.name = 'AgricultureOperationsError';
  }
}

export interface AgricultureOperationsHost {
  getOverview(userId: string): Promise<AgriculturePayload>;
  getAnalytics(userId: string): Promise<AgriculturePayload>;
  listSlots(userId: string): Promise<AgriculturePayload>;
  unlockSlot(userId: string, command: AgriculturePayload): Promise<AgriculturePayload>;
  updateSlot(
      userId: string, slotId: string,
      command: AgriculturePayload): Promise<AgriculturePayload>;
  listPlots(userId: string): Promise<AgriculturePayload>;
  createPlot(userId: string, command: AgriculturePayload): Promise<{id: string}>;
  recordPlotCondition(
      userId: string, plotId: string,
      command: AgriculturePayload): Promise<AgriculturePayload>;
  listPlans(userId: string): Promise<AgriculturePayload>;
  createPlan(userId: string, command: AgriculturePayload): Promise<AgriculturePayload>;
  listTasks(userId: string, status?: string): Promise<AgriculturePayload>;
  createTask(userId: string, command: AgriculturePayload): Promise<AgriculturePayload>;
  updateTask(
      userId: string, taskId: string,
      command: AgriculturePayload): Promise<AgriculturePayload>;
  listInventory(userId: string): Promise<AgriculturePayload>;
  createInventoryItem(
      userId: string, command: AgriculturePayload): Promise<AgriculturePayload>;
  recordInventoryMovement(
      userId: string, command: AgriculturePayload): Promise<AgriculturePayload>;
  createShipment(
      userId: string,
      command: CreateAgricultureShipmentCommand): Promise<{id: string}>;
  listResources(): Promise<AgriculturePayload>;
}

export interface AgricultureOperationsKit {
  overview: {
    getOverview(userId: string): Promise<AgriculturePayload>;
    getAnalytics(userId: string): Promise<AgriculturePayload>;
  };
  plots: {
    listSlots(userId: string): Promise<AgriculturePayload>;
    getSlot(userId: string, slotId: string):
        Promise<AgricultureSlotSnapshot|null>;
    unlockSlot(userId: string, command: AgriculturePayload): Promise<AgriculturePayload>;
    updateSlot(
        userId: string, slotId: string,
        command: AgriculturePayload): Promise<AgriculturePayload>;
    listPlots(userId: string): Promise<AgriculturePayload>;
    createPlot(userId: string, command: AgriculturePayload): Promise<{id: string}>;
    recordCondition(
        userId: string, plotId: string,
        command: AgriculturePayload): Promise<AgriculturePayload>;
  };
  plans: {
    listPlans(userId: string): Promise<AgriculturePayload>;
    createPlan(userId: string, command: AgriculturePayload): Promise<AgriculturePayload>;
    listTasks(userId: string, status?: string): Promise<AgriculturePayload>;
    createTask(userId: string, command: AgriculturePayload): Promise<AgriculturePayload>;
    updateTask(
        userId: string, taskId: string,
        command: AgriculturePayload): Promise<AgriculturePayload>;
  };
  inventory: {
    list(userId: string): Promise<AgriculturePayload>;
    createItem(userId: string, command: AgriculturePayload): Promise<AgriculturePayload>;
    recordMovement(
        userId: string, command: AgriculturePayload): Promise<AgriculturePayload>;
  };
  shipments: {
    create(
        userId: string,
        command: CreateAgricultureShipmentCommand): Promise<{id: string}>;
  };
  resources: {
    list(): Promise<AgriculturePayload>;
  };
}

export function createAgricultureOperationsKit(dependencies: {
  host: AgricultureOperationsHost;
  freight: Pick<FreightRoutingKit, 'listLoads'>;
}): AgricultureOperationsKit {
  const {host, freight} = dependencies;
  return {
    overview: {
      getOverview: (userId) => host.getOverview(userId),
      getAnalytics: (userId) => host.getAnalytics(userId),
    },
    plots: {
      listSlots: (userId) => host.listSlots(userId),
      async getSlot(userId, slotId) {
        const result = await host.listSlots(userId);
        const slot = Array.isArray(result.slots) ?
            result.slots.find(
                (candidate: AgriculturePayload) => candidate.id === slotId) :
            null;
        if (!slot) return null;
        const name =
            typeof slot.plot?.name === 'string' ? slot.plot.name : null;
        const crop =
            typeof slot.plot?.crop === 'string' ? slot.plot.crop : null;
        return {
          id: slot.id,
          slotIndex: Number.isFinite(Number(slot.slotIndex)) ?
              Number(slot.slotIndex) :
              0,
          costPaid: slot.costPaid ? String(slot.costPaid) : '0.00',
          plotId: typeof slot.plotId === 'string' ? slot.plotId : null,
          slug: name && crop ? `${name} (${crop})` : name,
          unlockedAt: slot.unlockedAt instanceof Date ?
              slot.unlockedAt :
              new Date(slot.unlockedAt),
        };
      },
      unlockSlot: (userId, command) => host.unlockSlot(userId, command),
      updateSlot: (userId, slotId, command) =>
        host.updateSlot(userId, slotId, command),
      listPlots: (userId) => host.listPlots(userId),
      createPlot: (userId, command) => host.createPlot(userId, command),
      recordCondition: (userId, plotId, command) =>
        host.recordPlotCondition(userId, plotId, command),
    },
    plans: {
      listPlans: (userId) => host.listPlans(userId),
      createPlan: (userId, command) => host.createPlan(userId, command),
      listTasks: (userId, status) => host.listTasks(userId, status),
      createTask: (userId, command) => host.createTask(userId, command),
      updateTask: (userId, taskId, command) =>
        host.updateTask(userId, taskId, command),
    },
    inventory: {
      list: (userId) => host.listInventory(userId),
      createItem: (userId, command) => host.createInventoryItem(userId, command),
      recordMovement: (userId, command) =>
        host.recordInventoryMovement(userId, command),
    },
    shipments: {
      async create(userId, command) {
        const freightLoadId = command.freightLoadId?.trim() || undefined;
        if (freightLoadId) {
          const loads = await freight.listLoads(userId);
          if (!loads.some((load) => load.id === freightLoadId)) {
            throw new AgricultureOperationsError(
                'FREIGHT_LOAD_NOT_FOUND', 'Freight load not found');
          }
        }
        return host.createShipment(userId, {...command, freightLoadId});
      },
    },
    resources: {
      list: () => host.listResources(),
    },
  };
}
