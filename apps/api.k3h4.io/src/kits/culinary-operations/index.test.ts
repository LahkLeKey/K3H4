import '../../test/vitest-setup';

import {describe, expect, it, vi} from 'vitest';

vi.mock('../../services/culinary-ledger', () => ({
  createCulinaryMenuItem: vi.fn().mockResolvedValue({id: 'menu-1', name: 'Soup'}),
  createCulinaryPrepTask: vi.fn(),
  createCulinarySupplierNeed: vi.fn(),
  loadCulinaryMenuItems: vi.fn(),
  loadCulinaryPrepTasks: vi.fn(),
  loadCulinarySupplierNeeds: vi.fn(),
}));

import {createCulinaryMenuItem, getCulinaryOverview} from './index';

describe('Culinary operations Kit', () => {
  it('combines kitchen ledgers with the Point of Sale overview', async () => {
    const prisma = {} as any;
    const culinary = {
      menuItems: [{id: 'menu-1'}],
      prepTasks: [{id: 'prep-1'}],
      supplierNeeds: [{id: 'need-1'}],
    };
    const pointOfSale = {
      metrics: {grossRevenue: '42.00', tickets: 1, avgTicket: '42.00'},
      orders: [],
      topItems: [],
      stores: [],
    };

    const result = await getCulinaryOverview(prisma, 'user-1', {
      loadMenuItems: vi.fn().mockResolvedValue(culinary.menuItems),
      loadPrepTasks: vi.fn().mockResolvedValue(culinary.prepTasks),
      loadSupplierNeeds: vi.fn().mockResolvedValue(culinary.supplierNeeds),
      loadPointOfSaleOverview: vi.fn().mockResolvedValue(pointOfSale),
    });

    expect(result).toEqual({...culinary, pointOfSale});
  });

  it('creates a menu item through the Kit command interface', async () => {
    const transaction = {} as any;
    await expect(createCulinaryMenuItem(transaction, 'user-1', {
      name: 'Soup',
      prepMinutes: 15,
      cost: 4,
      price: 12,
    })).resolves.toEqual(expect.objectContaining({name: 'Soup'}));
  });
});