import '../../test/vitest-setup';

import {describe, expect, it, vi} from 'vitest';

import {createWarehouseInventoryKit} from './index';

const item = {
  id: 'item-1',
  userId: 'user-1',
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

const buildDependencies = () => ({
  host: {
    listItems: vi.fn().mockResolvedValue([item]),
    findItem: vi.fn(),
    createItem: vi.fn(),
    updateItem: vi.fn(),
    deleteItem: vi.fn(),
  },
  freight: {getLoad: vi.fn()},
  agriculture: {getSlot: vi.fn()},
});

describe('Warehouse inventory Kit', () => {
  it('lists inventory through the host boundary', async () => {
    const dependencies = buildDependencies();
    const warehouse = createWarehouseInventoryKit(dependencies);

    await expect(warehouse.listItems('user-1')).resolves.toEqual([item]);
    expect(dependencies.host.listItems).toHaveBeenCalledWith('user-1');
  });

  it('creates stock with read-only freight and agriculture attachments',
     async () => {
       const dependencies = buildDependencies();
       const slot = {
         id: 'slot-1',
         slotIndex: 2,
         costPaid: '150.00',
         plotId: 'plot-1',
         slug: 'North Field (Corn)',
         unlockedAt: new Date('2026-01-01T00:00:00.000Z'),
       };
       dependencies.freight.getLoad.mockResolvedValue({id: 'load-1'});
       dependencies.agriculture.getSlot.mockResolvedValue(slot);
       dependencies.host.createItem.mockResolvedValue(item);
       const warehouse = createWarehouseInventoryKit(dependencies);

       await warehouse.createItem({
         userId: 'user-1',
         sku: ' SKU-1 ',
         description: ' Seed ',
         quantity: 5,
         location: ' A-1 ',
         freightLoadId: ' load-1 ',
         category: 'AGRICULTURE',
         agricultureSlotId: 'slot-1',
         metadata: {batch: 'spring'},
       });

       expect(dependencies.freight.getLoad)
           .toHaveBeenCalledWith('user-1', 'load-1');
       expect(dependencies.agriculture.getSlot)
           .toHaveBeenCalledWith('user-1', 'slot-1');
       expect(dependencies.host.createItem).toHaveBeenCalledWith('user-1', {
         batch: 'spring',
         sku: 'SKU-1',
         description: 'Seed',
         quantity: 5,
         location: 'A-1',
         status: 'STORED',
         freightLoadId: 'load-1',
         category: 'AGRICULTURE',
         source: 'agriculture',
         slot,
       });
     });

  it('updates stock and location while removing stale attachments',
     async () => {
       const dependencies = buildDependencies();
       const existing = {
         ...item,
         freightLoadId: 'load-1',
         category: 'AGRICULTURE',
         metadata: {
           ...item.metadata,
           freightLoadId: 'load-1',
           category: 'AGRICULTURE',
           source: 'agriculture',
           slot: {id: 'slot-1'},
           untouched: true,
         },
       };
       dependencies.host.findItem.mockResolvedValue(existing);
       dependencies.host.updateItem.mockResolvedValue({
         ...existing,
         quantity: 8,
         location: 'B-2',
         freightLoadId: null,
         category: 'OTHER',
       });
       const warehouse = createWarehouseInventoryKit(dependencies);

       await warehouse.updateItem({
         userId: 'user-1',
         itemId: 'item-1',
         quantity: 8,
         location: ' B-2 ',
         freightLoadId: null,
         category: 'OTHER',
       });

       expect(dependencies.host.updateItem)
           .toHaveBeenCalledWith('user-1', 'item-1', {
             ...item.metadata,
             quantity: 8,
             location: 'B-2',
             freightLoadId: null,
             category: 'OTHER',
             source: 'manual',
             untouched: true,
           });
     });

  it('clears an agriculture slot without changing the item category',
     async () => {
       const dependencies = buildDependencies();
       const existing = {
         ...item,
         category: 'AGRICULTURE',
         metadata: {
           ...item.metadata,
           category: 'AGRICULTURE',
           source: 'agriculture',
           slot: {id: 'slot-1'},
         },
       };
       dependencies.host.findItem.mockResolvedValue(existing);
       dependencies.host.updateItem.mockResolvedValue(existing);
       const warehouse = createWarehouseInventoryKit(dependencies);

       await warehouse.updateItem({
         userId: 'user-1',
         itemId: 'item-1',
         agricultureSlotId: null,
       });

       expect(dependencies.agriculture.getSlot).not.toHaveBeenCalled();
       expect(dependencies.host.updateItem)
           .toHaveBeenCalledWith('user-1', 'item-1', {
             ...item.metadata,
             category: 'AGRICULTURE',
             source: 'agriculture',
           });
     });

  it('rejects missing attachments without writing inventory', async () => {
    const dependencies = buildDependencies();
    dependencies.freight.getLoad.mockResolvedValue(null);
    const warehouse = createWarehouseInventoryKit(dependencies);

    await expect(warehouse.createItem({
      userId: 'user-1',
      sku: 'SKU-1',
      location: 'A-1',
      freightLoadId: 'missing',
    })).rejects.toEqual(expect.objectContaining({
      code: 'FREIGHT_LOAD_NOT_FOUND',
      message: 'Freight load not found',
    }));
    expect(dependencies.host.createItem).not.toHaveBeenCalled();
  });

  it('rejects a missing agriculture slot without writing inventory',
     async () => {
       const dependencies = buildDependencies();
       dependencies.agriculture.getSlot.mockResolvedValue(null);
       const warehouse = createWarehouseInventoryKit(dependencies);

       await expect(warehouse.createItem({
         userId: 'user-1',
         sku: 'SKU-1',
         location: 'A-1',
         category: 'AGRICULTURE',
         agricultureSlotId: 'missing',
       })).rejects.toEqual(expect.objectContaining({
         code: 'AGRICULTURE_SLOT_NOT_FOUND',
         message: 'Agriculture slot not found',
       }));
       expect(dependencies.host.createItem).not.toHaveBeenCalled();
     });
});