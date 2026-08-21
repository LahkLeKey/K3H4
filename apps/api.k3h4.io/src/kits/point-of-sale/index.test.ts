import '../../test/vitest-setup';

import {Prisma} from '@prisma/client';
import {describe, expect, it} from 'vitest';

import {getPointOfSaleOverview} from './index';

describe('Point of Sale Kit', () => {
  it('summarizes stores, ticket revenue, and top items', async () => {
    const result = await getPointOfSaleOverview(
        {
          actor: {
            findMany: async () => [{
              id: 'store-1',
              label: 'Main',
              metadata: {channel: 'In-store'},
            }],
          },
          entity: {
            findMany: async () => [{
              id: 'ticket-1',
              metadata: {
                amount: '12.50',
                storeId: 'store-1',
                storeName: 'Main',
                channel: 'In-store',
                items: [{name: 'Coffee', quantity: 2, price: '6.25'}],
                itemsCount: 2,
              },
              createdAt: new Date('2026-01-01T00:00:00.000Z'),
            }],
          },
        } as any,
        'user-1');

    expect(result).toEqual({
      metrics: {grossRevenue: '12.50', tickets: 1, avgTicket: '12.50'},
      orders: [{
        store: 'Main',
        channel: 'In-store',
        tickets: 1,
        revenue: '12.50',
      }],
      topItems: [{name: 'Coffee', sold: 2, revenue: '12.50'}],
      stores: [{id: 'store-1', name: 'Main', channel: 'In-store'}],
    });
  });
});