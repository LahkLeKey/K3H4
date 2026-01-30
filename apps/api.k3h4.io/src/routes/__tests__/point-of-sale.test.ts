import {Prisma} from '@prisma/client';
import Fastify from 'fastify';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import * as bankActor from '../../services/bank-actor';
import {registerPointOfSaleRoutes} from '../point-of-sale';
import {type RecordTelemetryFn} from '../types';

const recordTelemetry = vi.fn() as unknown as RecordTelemetryFn;
const userId = 'user-1';

function buildServer(mocks: any) {
  const server = Fastify();
  server.decorate('authenticate', async (request: any) => {
    request.user = {sub: userId};
  });
  registerPointOfSaleRoutes(server as any, mocks as any, recordTelemetry);
  return server;
}

const buildTransactionMocks = () => {
  const createdTicket = {
    id: 't1',
    itemsCount: 1,
    total: new Prisma.Decimal('10.00'),
    lineItems: [] as Array<unknown>,
  };
  const ticketCreate = vi.fn().mockResolvedValue(createdTicket);
  const txUser = {
    findUnique: vi.fn().mockResolvedValue(
        {k3h4CoinBalance: new Prisma.Decimal('0.00')}),
    update: vi.fn().mockResolvedValue(
        {k3h4CoinBalance: new Prisma.Decimal('10.00')}),
  };
  const transactionSpy = vi.fn().mockImplementation(
      async (cb: (tx: unknown) => Promise<unknown>) => {
        return cb({user: txUser, posTicket: {create: ticketCreate}} as any);
      });
  return {transactionSpy, ticketCreate, txUser, createdTicket};
};

describe('Point of Sale routes', () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
    vi.restoreAllMocks();
    vi.spyOn(bankActor, 'recordBankTransactionEntity')
        .mockResolvedValue({} as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns overview aggregates', async () => {
    const prisma = {
      posStore: {
        findMany: vi.fn().mockResolvedValue(
            [{id: 's1', name: 'Main', channel: 'In-store'}])
      },
      posTicket: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: 't1',
            userId,
            storeId: 's1',
            channel: 'In-store',
            total: new Prisma.Decimal('50'),
            store: {name: 'Main'}
          },
          {
            id: 't2',
            userId,
            storeId: 's1',
            channel: 'Delivery',
            total: new Prisma.Decimal('30'),
            store: {name: 'Main'}
          },
        ]),
      },
      posLineItem: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: 'l1',
            name: 'Burger',
            quantity: 2,
            price: new Prisma.Decimal('10'),
            ticket: {userId}
          },
        ]),
      },
    };
    const server = buildServer(prisma);
    const res =
        await server.inject({method: 'GET', url: '/point-of-sale/overview'});
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.metrics.tickets).toBe(2);
    expect(body.orders.length).toBe(2);
    expect(recordTelemetry)
        .toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
          eventType: 'point-of-sale.overview.fetch'
        }));
  });

  it('handles empty overview data', async () => {
    const prisma = {
      posStore: {findMany: vi.fn().mockResolvedValue([])},
      posTicket: {findMany: vi.fn().mockResolvedValue([])},
      posLineItem: {findMany: vi.fn().mockResolvedValue([])},
    };
    const server = buildServer(prisma);
    const res =
        await server.inject({method: 'GET', url: '/point-of-sale/overview'});
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.metrics.grossRevenue).toBe('0.00');
    expect(body.orders).toHaveLength(0);
    expect(body.topItems).toHaveLength(0);
  });

  it('creates a ticket with new store', async () => {
    const {transactionSpy, ticketCreate} = buildTransactionMocks();
    const prisma = {
      posStore: {
        findFirst: vi.fn().mockResolvedValue(null),
        upsert: vi.fn().mockResolvedValue(
            {id: 's1', name: 'Main', channel: 'In-store'}),
      },
      posTicket: {create: ticketCreate},
      $transaction: transactionSpy,
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/point-of-sale/tickets',
      payload: {
        storeName: 'Main',
        total: 10,
        items: [{name: 'Burger', price: 10, quantity: 1}]
      },
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.posStore.upsert).toHaveBeenCalled();
    expect(ticketCreate).toHaveBeenCalled();
    expect(transactionSpy).toHaveBeenCalled();
  });

  it('creates a ticket with existing store id', async () => {
    const {transactionSpy, ticketCreate} = buildTransactionMocks();
    const prisma = {
      posStore: {
        findFirst: vi.fn().mockResolvedValue(
            {id: 's2', name: 'Existing', channel: 'Delivery'}),
      },
      posTicket: {create: ticketCreate},
      $transaction: transactionSpy,
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/point-of-sale/tickets',
      payload: {
        storeId: 's2',
        total: 5,
        items: [{name: 'Fries', price: 5, quantity: 1}]
      },
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.posStore.findFirst).toHaveBeenCalled();
    expect(ticketCreate).toHaveBeenCalled();
    expect(transactionSpy).toHaveBeenCalled();
  });

  it('creates a store', async () => {
    const prisma = {
      posStore: {
        create: vi.fn().mockResolvedValue(
            {id: 's1', name: 'Popup', channel: 'Delivery'}),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/point-of-sale/stores',
      payload: {name: 'Popup', channel: 'Delivery'}
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.posStore.create).toHaveBeenCalled();
  });

  it('rejects ticket without total', async () => {
    const prisma = {
      posStore: {findFirst: vi.fn(), upsert: vi.fn()},
      posTicket: {create: vi.fn()}
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/point-of-sale/tickets',
      payload: {storeName: 'Main'}
    });
    expect(res.statusCode).toBe(400);
  });

  it('rejects ticket without store', async () => {
    const prisma = {
      posStore: {findFirst: vi.fn(), upsert: vi.fn()},
      posTicket: {create: vi.fn()}
    };
    const server = buildServer(prisma);
    const res = await server.inject(
        {method: 'POST', url: '/point-of-sale/tickets', payload: {total: 10}});
    expect(res.statusCode).toBe(400);
  });
});
