import {LIFECYCLE_STATUSES, WAREHOUSE_CATEGORIES} from '../../lib/domain-constants';
import {lifecycleStatusOrDefault, parseLifecycleStatus} from '../../lib/status-utils';
import type {AgricultureOperationsKit} from '../agriculture-operations';
import type {FreightRoutingKit} from '../freight-routing';

export type WarehouseItem = {
  id: string; userId: string; sku: string; description: string | null;
  quantity: number;
  location: string;
  status: string;
  freightLoadId: string | null;
  category: string;
  metadata: Record<string, unknown>| null;
  createdAt: string;
  updatedAt: string;
};

export interface WarehouseInventoryHost {
  listItems(userId: string): Promise<WarehouseItem[]>;
  findItem(userId: string, itemId: string): Promise<WarehouseItem|null>;
  createItem(userId: string, metadata: Record<string, unknown>):
      Promise<WarehouseItem>;
  updateItem(userId: string, itemId: string, metadata: Record<string, unknown>):
      Promise<WarehouseItem>;
  deleteItem(userId: string, itemId: string): Promise<boolean>;
}

export interface WarehouseInventoryKit {
  listItems(userId: string): Promise<WarehouseItem[]>;
  createItem(command: CreateWarehouseItemCommand): Promise<WarehouseItem>;
  updateItem(command: UpdateWarehouseItemCommand): Promise<WarehouseItem>;
  deleteItem(userId: string, itemId: string): Promise<void>;
}

export type CreateWarehouseItemCommand = {
  userId: string;
  sku?: string;
  description?: string;
  quantity?: number;
  location?: string;
  status?: string;
  freightLoadId?: string;
  category?: string;
  metadata?: Record<string, unknown>;
  agricultureSlotId?: string;
};

export type UpdateWarehouseItemCommand = {
  userId: string; itemId: string;
  sku?: string;
  description?: string | null;
  quantity?: number;
  location?: string;
  status?: string;
  freightLoadId?: string | null;
  category?: string;
  metadata?: Record<string, unknown>| null;
  agricultureSlotId?: string | null;
};

export type WarehouseInventoryErrorCode =
    'INVALID_ITEM'|'INVALID_QUANTITY'|'INVALID_STATUS'|'ITEM_NOT_FOUND'|
    'FREIGHT_LOAD_NOT_FOUND'|'AGRICULTURE_SLOT_NOT_FOUND';

export class WarehouseInventoryError extends Error {
  constructor(
      public readonly code: WarehouseInventoryErrorCode, message: string) {
    super(message);
    this.name = 'WarehouseInventoryError';
  }
}

const normalizeCategory = (value?: string) =>
    value === WAREHOUSE_CATEGORIES.AGRICULTURE ?
    WAREHOUSE_CATEGORIES.AGRICULTURE :
    WAREHOUSE_CATEGORIES.OTHER;

export const createWarehouseInventoryKit = (dependencies: {
  host: WarehouseInventoryHost; freight: Pick<FreightRoutingKit, 'getLoad'>;
  agriculture: Pick<AgricultureOperationsKit['plots'], 'getSlot'>;
}): WarehouseInventoryKit => {
  const requireFreightLoad = async (userId: string, loadId?: string) => {
    const freightLoadId = loadId?.trim() || undefined;
    if (freightLoadId &&
        !await dependencies.freight.getLoad(userId, freightLoadId)) {
      throw new WarehouseInventoryError(
          'FREIGHT_LOAD_NOT_FOUND', 'Freight load not found');
    }
    return freightLoadId;
  };

  return {
    listItems: (userId) => dependencies.host.listItems(userId),
    async createItem(command) {
      if (!command.sku || !command.location) {
        throw new WarehouseInventoryError(
            'INVALID_ITEM', 'sku and location are required');
      }
      const quantity = Number(command.quantity ?? 0);
      if (!Number.isFinite(quantity) || quantity < 0) {
        throw new WarehouseInventoryError(
            'INVALID_QUANTITY', 'quantity must be a non-negative number');
      }

      const freightLoadId =
          await requireFreightLoad(command.userId, command.freightLoadId);
      const category = normalizeCategory(command.category);
      let slot = null;
      if (category === WAREHOUSE_CATEGORIES.AGRICULTURE &&
          command.agricultureSlotId) {
        slot = await dependencies.agriculture.getSlot(
            command.userId, command.agricultureSlotId);
        if (!slot) {
          throw new WarehouseInventoryError(
              'AGRICULTURE_SLOT_NOT_FOUND', 'Agriculture slot not found');
        }
      }

      const metadata: Record<string, unknown> = {...command.metadata};
      metadata.sku = command.sku.trim();
      metadata.description = command.description?.trim() ?? null;
      metadata.quantity = quantity;
      metadata.location = command.location.trim();
      metadata.status =
          lifecycleStatusOrDefault(command.status, LIFECYCLE_STATUSES.STORED);
      metadata.freightLoadId = freightLoadId ?? null;
      metadata.category = category;
      if (category === WAREHOUSE_CATEGORIES.AGRICULTURE) {
        metadata.source = 'agriculture';
        if (slot) metadata.slot = slot;
      } else {
        metadata.source = 'manual';
      }
      return dependencies.host.createItem(command.userId, metadata);
    },
    async updateItem(command) {
      const item =
          await dependencies.host.findItem(command.userId, command.itemId);
      if (!item) {
        throw new WarehouseInventoryError('ITEM_NOT_FOUND', 'Item not found');
      }

      const quantity =
          command.quantity === undefined ? undefined : Number(command.quantity);
      if (quantity !== undefined &&
          (!Number.isFinite(quantity) || quantity < 0)) {
        throw new WarehouseInventoryError(
            'INVALID_QUANTITY', 'quantity must be a non-negative number');
      }

      let freightLoadId: string|null|undefined;
      if (command.freightLoadId === null) {
        freightLoadId = null;
      } else if (command.freightLoadId) {
        freightLoadId = command.freightLoadId.trim() || undefined;
      }
      if (freightLoadId) {
        await requireFreightLoad(command.userId, freightLoadId);
      }

      const existingMetadata = item.metadata ?? {};
      const metadata: Record<string, unknown> = {
        ...existingMetadata,
        ...(command.metadata ?? {}),
      };
      if (command.sku) metadata.sku = command.sku.trim();
      if (command.description !== undefined) {
        metadata.description = command.description?.trim() ?? null;
      }
      if (command.location) metadata.location = command.location.trim();
      if (quantity !== undefined) metadata.quantity = quantity;
      if (freightLoadId !== undefined) metadata.freightLoadId = freightLoadId;

      const existingCategory = normalizeCategory(
          typeof existingMetadata.category === 'string' ?
              existingMetadata.category :
              undefined);
      const category = command.category ? normalizeCategory(command.category) :
                                          existingCategory;
      metadata.category = category;

      let status = typeof existingMetadata.status === 'string' ?
          existingMetadata.status :
          LIFECYCLE_STATUSES.STORED;
      if (command.status !== undefined) {
        const parsedStatus = parseLifecycleStatus(command.status);
        if (!parsedStatus) {
          throw new WarehouseInventoryError('INVALID_STATUS', 'Invalid status');
        }
        status = parsedStatus;
      }
      metadata.status = status;

      let slot = null;
      if (command.agricultureSlotId) {
        slot = await dependencies.agriculture.getSlot(
            command.userId, command.agricultureSlotId);
        if (!slot) {
          throw new WarehouseInventoryError(
              'AGRICULTURE_SLOT_NOT_FOUND', 'Agriculture slot not found');
        }
      }
      if (category === WAREHOUSE_CATEGORIES.AGRICULTURE) {
        metadata.source = 'agriculture';
        if (slot) metadata.slot = slot;
      } else {
        metadata.source = 'manual';
        delete metadata.slot;
      }

      return dependencies.host.updateItem(
          command.userId, command.itemId, metadata);
    },
    async deleteItem(userId, itemId) {
      if (!await dependencies.host.deleteItem(userId, itemId)) {
        throw new WarehouseInventoryError('ITEM_NOT_FOUND', 'Item not found');
      }
    },
  };
};