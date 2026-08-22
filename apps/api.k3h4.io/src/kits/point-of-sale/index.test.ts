import '../../test/vitest-setup';

import {Prisma} from '@prisma/client';
import {describe, expect, it, vi} from 'vitest';

import {recordBankLedgerEntry} from '../bank-ledger';
import {createPointOfSaleTicket, getPointOfSaleOverview} from './index';

vi.mock('../bank-ledger', () => ({recordBankLedgerEntry: vi.fn()}));

describe('Point of Sale Kit', () => {
  it('issues a ticket and credits the Bank ledger in one host transaction', async () => {
    vi.mocked(recordBankLedgerEntry).mockResolvedValue({
      id: 'ticket-1',
      createdAt: '2026-01-01T00:00:00.000Z',
    });
    const transaction = {
      actor: {
        findFirst: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({
          id: 'store-1', label: 'Main', metadata: {channel: 'In-store'},
        }),
      },
      user: {
        findUnique: vi.fn().mockResolvedValue({
          k3h4CoinBalance: new Prisma.Decimal('10.00'),
        }),
        update: vi.fn().mockResolvedValue({
          k3h4CoinBalance: new Prisma.Decimal('22.50'),
        }),
      },
    };

    const ticket = await createPointOfSaleTicket(transaction as any, {
      userId: 'user-1',
      storeName: 'Main',
      total: 12.5,
      items: [{name: 'Coffee', quantity: 1, price: 12.5}],
    });

    expect(transaction.user.update).toHaveBeenCalledWith({
      where: {id: 'user-1'},
      data: {k3h4CoinBalance: new Prisma.Decimal('22.5')},
    });
    expect(recordBankLedgerEntry).toHaveBeenCalledWith(
        transaction,
        expect.objectContaining({amount: '12.50', targetId: 'store-1'}));
    expect(ticket).toMatchObject({
      id: 'ticket-1', storeId: 'store-1', total: '12.50', itemsCount: 1,
    });
  });

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