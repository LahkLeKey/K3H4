import '../../test/vitest-setup';

import Fastify from 'fastify';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {WarehouseInventoryError} from '../../kits/warehouse-inventory';
import {createPrismaWarehouseInventoryKit} from '../../kits/warehouse-inventory/prisma-adapter';
import {type RecordTelemetryFn} from '../types';
import {registerWarehouseRoutes} from '../warehouse';

vi.mock(
    '../../kits/warehouse-inventory/prisma-adapter',
    () => ({
      createPrismaWarehouseInventoryKit: vi.fn(),
    }));

const recordTelemetry = vi.fn<RecordTelemetryFn>();
const userId = 'user-1';
const warehouse = {
  listItems: vi.fn(),
  createItem: vi.fn(),
  updateItem: vi.fn(),
  deleteItem: vi.fn(),
};
const createWarehouseKitMock =
    createPrismaWarehouseInventoryKit as unknown as ReturnType<typeof vi.fn>;

const item = {
  id: 'item-1',
  userId,
  sku: 'SKU-1',
  description: null,
  quantity: 5,
  location: 'A-1',
  status: 'STORED',
  freightLoadId: null,
  category: 'OTHER',
  metadata: {
    sku: 'SKU-1',
    quantity: 5,
    location: 'A-1',
    status: 'STORED',
    category: 'OTHER',
  },
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

function buildServer() {
  const server = Fastify();
  server.decorate('authenticate', async (request: any) => {
    request.user = {sub: userId};
  });
  registerWarehouseRoutes(server as any, {} as any, recordTelemetry);
  return server;
}

describe('warehouse routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    createWarehouseKitMock.mockReturnValue(warehouse as any);
  });

  it('lists items and records the existing telemetry event', async () => {
    warehouse.listItems.mockResolvedValue([item]);
    const response = await buildServer().inject({
      method: 'GET',
      url: '/warehouse/items',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({items: [item]});
    expect(warehouse.listItems).toHaveBeenCalledWith(userId);
    expect(recordTelemetry)
        .toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
          eventType: 'warehouse.list',
          source: 'api',
          payload: {count: 1},
        }));
  });

  it('creates an item and preserves response and telemetry shapes',
     async () => {
       warehouse.createItem.mockResolvedValue(
           {...item, freightLoadId: 'load-1'});
       const response = await buildServer().inject({
         method: 'POST',
         url: '/warehouse/items',
         payload: {
           sku: 'SKU-1',
           location: 'A-1',
           quantity: 5,
           freightLoadId: ' load-1 ',
         },
       });

       expect(response.statusCode).toBe(200);
       expect(response.json()).toEqual({
         item: {
           ...item,
           freightLoadId: 'load-1',
         }
       });
       expect(warehouse.createItem).toHaveBeenCalledWith({
         userId,
         sku: 'SKU-1',
         location: 'A-1',
         quantity: 5,
         freightLoadId: ' load-1 ',
       });
       expect(recordTelemetry)
           .toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
             eventType: 'warehouse.create',
             source: 'api',
             payload: {sku: 'SKU-1', freightLoadId: 'load-1'},
           }));
     });

  it.each([
    ['INVALID_ITEM', 'sku and location are required', 400],
    ['INVALID_QUANTITY', 'quantity must be a non-negative number', 400],
    ['INVALID_STATUS', 'Invalid status', 400],
    ['ITEM_NOT_FOUND', 'Item not found', 404],
    ['FREIGHT_LOAD_NOT_FOUND', 'Freight load not found', 404],
    ['AGRICULTURE_SLOT_NOT_FOUND', 'Agriculture slot not found', 404],
  ] as const)('maps %s Kit errors', async (code, message, status) => {
    warehouse.createItem.mockRejectedValue(
        new WarehouseInventoryError(code, message));
    const response = await buildServer().inject({
      method: 'POST',
      url: '/warehouse/items',
      payload: {sku: 'SKU-1', location: 'A-1'},
    });

    expect(response.statusCode).toBe(status);
    expect(response.json()).toEqual({error: message});
    expect(recordTelemetry).not.toHaveBeenCalled();
  });

  it('updates an item and records the resolved freight attachment',
     async () => {
       warehouse.updateItem.mockResolvedValue({
         ...item,
         quantity: 8,
         freightLoadId: 'load-2',
       });
       const response = await buildServer().inject({
         method: 'PATCH',
         url: '/warehouse/items/item-1',
         payload: {quantity: 8, freightLoadId: 'load-2'},
       });

       expect(response.statusCode).toBe(200);
       expect(response.json().item.quantity).toBe(8);
       expect(warehouse.updateItem).toHaveBeenCalledWith({
         userId,
         itemId: 'item-1',
         quantity: 8,
         freightLoadId: 'load-2',
       });
       expect(recordTelemetry)
           .toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
             eventType: 'warehouse.update',
             source: 'api',
             payload: {id: 'item-1', freightLoadId: 'load-2'},
           }));
     });

  it('deletes an item and preserves the success response', async () => {
    warehouse.deleteItem.mockResolvedValue(undefined);
    const response = await buildServer().inject({
      method: 'DELETE',
      url: '/warehouse/items/item-1',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({success: true});
    expect(warehouse.deleteItem).toHaveBeenCalledWith(userId, 'item-1');
    expect(recordTelemetry)
        .toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
          eventType: 'warehouse.delete',
          source: 'api',
          payload: {id: 'item-1'},
        }));
  });
});
