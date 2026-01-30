import '../../test/vitest-setup.ts';

import {Prisma} from '@prisma/client';
import Fastify from 'fastify';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import * as bankActor from '../../services/bank-actor';
import {registerPointOfSaleRoutes} from '../point-of-sale';
import {type RecordTelemetryFn} from '../types';

const recordTelemetry = vi.fn() as unknown as RecordTelemetryFn;
const userId = 'user-1';

function buildServer(prisma: any) {
  const server = Fastify();
  server.decorate('authenticate', async (request: any) => {
    request.user = {sub: userId};
  });
  registerPointOfSaleRoutes(server as any, prisma as any, recordTelemetry);
  return server;
}

const makeTransactionMocks = () => {
  const txActor = {
    findFirst: vi.fn().mockResolvedValue(null),
    update: vi.fn().mockResolvedValue(null),
    create: vi.fn().mockResolvedValue({
      id: 'new-store',
      label: 'Main',
      metadata: {channel: 'In-store'},
    }),
  };
  const txUser = {
    findUnique: vi.fn().mockResolvedValue({
      k3h4CoinBalance: new Prisma.Decimal('10.00'),
    }),
    update: vi.fn().mockResolvedValue({
      k3h4CoinBalance: new Prisma.Decimal('25.00'),
    }),
  };
  const transactionSpy = vi.fn().mockImplementation(
      async (callback: (tx: any) => Promise<any>) =>
          callback({actor: txActor, user: txUser}));
  return {transactionSpy, txActor, txUser};
};

describe('Point of Sale routes', () => {
  let recordBankTransactionEntitySpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    recordTelemetry.mockClear();
    recordBankTransactionEntitySpy =
        vi.spyOn(bankActor, 'recordBankTransactionEntity').mockResolvedValue({
          id: 'txn-1',
          metadata: {
            amount: '15.00',
            storeId: 'store-1',
            storeName: 'Main',
            channel: 'In-store',
            status: 'CLOSED',
            itemsCount: 1,
            items: [{name: 'Snack', quantity: 1, price: '15.00'}],
          },
          createdAt: new Date('2025-01-01T00:00:00Z'),
        } as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns overview aggregates', async () => {
    const stores = [
      {id: 'store-1', label: 'Main', metadata: {channel: 'In-store'}},
      {id: 'store-2', label: 'Mobile', metadata: {channel: 'Delivery'}},
    ];
    const entities = [
      {
        id: 'ticket-1',
        metadata: {
          amount: '25.00',
          storeId: 'store-1',
          storeName: 'Main',
          channel: 'In-store',
          status: 'CLOSED',
          itemsCount: 1,
          items: [{name: 'Snack', quantity: 1, price: '25.00'}],
        },
        createdAt: new Date('2025-01-02T00:00:00Z'),
      },
      {
        id: 'ticket-2',
        metadata: {
          amount: '35.00',
          storeId: 'store-2',
          storeName: 'Mobile',
          channel: 'Delivery',
          status: 'CLOSED',
          itemsCount: 2,
          items: [
            {name: 'Burrito', quantity: 1, price: '20.00'},
            {name: 'Soda', quantity: 1, price: '15.00'},
          ],
        },
        createdAt: new Date('2025-01-03T00:00:00Z'),
      },
    ];
    const prisma = {
      actor: {findMany: vi.fn().mockResolvedValue(stores)},
      entity: {findMany: vi.fn().mockResolvedValue(entities)}
    };
    const server = buildServer(prisma);
    const res =
        await server.inject({method: 'GET', url: '/point-of-sale/overview'});
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.metrics.grossRevenue).toBe('60.00');
    expect(body.metrics.tickets).toBe(2);
    expect(body.orders).toHaveLength(2);
    expect(body.topItems.some((item: any) => item.name === 'Snack')).toBe(true);
    expect(body.stores).toEqual([
      {id: 'store-1', name: 'Main', channel: 'In-store'},
      {id: 'store-2', name: 'Mobile', channel: 'Delivery'},
    ]);
    expect(recordTelemetry)
        .toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
          eventType: 'point-of-sale.overview.fetch'
        }));
  });

  it('creates a ticket for a new store', async () => {
    const {transactionSpy, txActor, txUser} = makeTransactionMocks();
    recordBankTransactionEntitySpy.mockResolvedValueOnce({
      id: 'ticket-entity',
      metadata: {
        amount: '12.50',
        storeId: 'new-store',
        storeName: 'Acme',
        channel: 'In-store',
        status: 'CLOSED',
        itemsCount: 1,
        items: [{name: 'Popcorn', quantity: 1, price: '12.50'}],
      },
      createdAt: new Date('2025-01-04T00:00:00Z'),
    } as any);
    const prisma = {$transaction: transactionSpy};
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/point-of-sale/tickets',
      payload: {
        storeName: 'Acme',
        total: 12.5,
        items: [{name: 'Popcorn', quantity: 1, price: 12.5}],
      },
    });
    expect(res.statusCode).toBe(200);
    expect(transactionSpy).toHaveBeenCalled();
    expect(txActor.create)
        .toHaveBeenCalledWith(
            expect.objectContaining(
                {data: expect.objectContaining({label: 'Acme'})}),
        );
    expect(txUser.update).toHaveBeenCalled();
    expect(recordTelemetry)
        .toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
          eventType: 'point-of-sale.ticket.create'
        }));
    expect(res.json().ticket.id).toBe('ticket-entity');
  });

  it('updates store channel when existing store is provided', async () => {
    const {transactionSpy, txActor} = makeTransactionMocks();
    const existingStore = {
      id: 'store-2',
      label: 'Legacy Lake',
      metadata: {channel: 'In-store'},
    };
    txActor.findFirst.mockResolvedValue(existingStore);
    txActor.update.mockResolvedValue({
      ...existingStore,
      metadata: {channel: 'Delivery'},
    });
    recordBankTransactionEntitySpy.mockResolvedValueOnce({
      id: 'ticket-entity-2',
      metadata: {
        amount: '23.00',
        storeId: 'store-2',
        storeName: 'Legacy Lake',
        channel: 'Delivery',
        status: 'CLOSED',
        itemsCount: 1,
        items: [{name: 'Coffee', quantity: 1, price: '23.00'}],
      },
      createdAt: new Date('2025-01-05T00:00:00Z'),
    } as any);
    const prisma = {$transaction: transactionSpy};
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/point-of-sale/tickets',
      payload: {
        storeId: 'store-2',
        channel: 'Delivery',
        total: 23,
        items: [{name: 'Coffee', price: 23, quantity: 1}],
      },
    });
    expect(res.statusCode).toBe(200);
    expect(txActor.findFirst).toHaveBeenCalled();
    expect(txActor.update).toHaveBeenCalled();
    expect(txActor.create).not.toHaveBeenCalled();
    expect(res.json().ticket.channel).toBe('Delivery');
  });

  it('rejects tickets without a total', async () => {
    const prisma = {$transaction: vi.fn()};
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/point-of-sale/tickets',
      payload: {storeName: 'Main'},
    });
    expect(res.statusCode).toBe(400);
  });

  it('creates a store record', async () => {
    const prisma = {
      actor: {
        create: vi.fn().mockResolvedValue({
          id: 'store-popup',
          label: 'Popup',
          metadata: {channel: 'Delivery'},
        }),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/point-of-sale/stores',
      payload: {name: 'Popup', channel: 'Delivery'},
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.actor.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({label: 'Popup'})
    }));
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'point-of-sale.store.create'}));
  });

  it('rejects when store information is missing', async () => {
    const {transactionSpy, txActor, txUser} = makeTransactionMocks();
    txActor.findFirst.mockResolvedValue(null);
    const prisma = {$transaction: transactionSpy};
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/point-of-sale/tickets',
      payload: {total: 5},
    });
    expect(res.statusCode).toBe(400);
    expect(txActor.create).not.toHaveBeenCalled();
    expect(txUser.update).not.toHaveBeenCalled();
  });
});
