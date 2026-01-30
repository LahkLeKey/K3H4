import {Prisma} from '@prisma/client';
import Fastify from 'fastify';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {registerFreightRoutes} from '../freight';
import {type RecordTelemetryFn} from '../types';

const recordTelemetry = vi.fn() as unknown as RecordTelemetryFn;
const userId = 'user-1';
const nativeFetch = globalThis.fetch;

function buildServer(prisma: any) {
  const server = Fastify();
  server.decorate('authenticate', async (request: any) => {
    request.user = {sub: userId};
  });
  registerFreightRoutes(server as any, prisma as any, recordTelemetry);
  return server;
}

describe('freight routes', () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
    globalThis.fetch = nativeFetch;
  });

  afterEach(() => {
    globalThis.fetch = nativeFetch;
  });

  it('lists loads', async () => {
    const prisma = {
      freightLoad: {
        findMany: vi.fn().mockResolvedValue([{
          id: 'l1',
          distanceKm: new Prisma.Decimal('10'),
          cost: new Prisma.Decimal('20'),
          createdAt: new Date()
        }])
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({method: 'GET', url: '/freight'});
    expect(res.statusCode).toBe(200);
    expect(res.json().loads).toHaveLength(1);
  });

  it('creates a load with osrm data', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () =>
          ({routes: [{distance: 10000, duration: 600, geometry: {}}]}),
    });
    globalThis.fetch = fetchMock;

    const geoDirection = {
      findUnique: vi.fn().mockResolvedValue(null),
      upsert: vi.fn().mockResolvedValue({}),
    };

    const prisma = {
      freightLoad: {
        create: vi.fn().mockResolvedValue({
          id: 'l1',
          distanceKm: new Prisma.Decimal('10'),
          cost: new Prisma.Decimal('20'),
          createdAt: new Date()
        })
      },
      geoDirection,
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/freight',
      payload: {
        title: 'Load',
        originName: 'A',
        originLat: 1,
        originLng: 1,
        destinationName: 'B',
        destinationLat: 2,
        destinationLng: 2,
        ratePerKm: 2,
      },
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.freightLoad.create).toHaveBeenCalled();
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'freight.create'}));
  });

  it('returns 502 when osrm fails', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network'));
    globalThis.fetch = fetchMock;

    const prisma = {
      freightLoad: {
        create: vi.fn().mockResolvedValue({
          id: 'l2',
          distanceKm: new Prisma.Decimal('0'),
          cost: new Prisma.Decimal('0'),
          createdAt: new Date()
        }),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/freight',
      payload: {
        title: 'Fallback',
        originName: 'A',
        originLat: 1,
        originLng: 1,
        destinationName: 'B',
        destinationLat: 2,
        destinationLng: 2
      },
    });

    expect(res.statusCode).toBe(502);
    expect(prisma.freightLoad.create).not.toHaveBeenCalled();
  });

  it('returns 502 when osrm returns empty route', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
        {ok: true, json: async () => ({routes: []})} as Response);
    globalThis.fetch = fetchMock;
    const prisma = {
      freightLoad: {
        create: vi.fn().mockResolvedValue({
          id: 'l3',
          distanceKm: new Prisma.Decimal('0'),
          cost: new Prisma.Decimal('0'),
          createdAt: new Date()
        })
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/freight',
      payload: {
        title: 'Empty',
        originName: 'A',
        originLat: 1,
        originLng: 1,
        destinationName: 'B',
        destinationLat: 2,
        destinationLng: 2
      },
    });
    expect(res.statusCode).toBe(502);
    expect(prisma.freightLoad.create).not.toHaveBeenCalled();
  });

  it('rejects invalid coordinates', async () => {
    const prisma = {freightLoad: {create: vi.fn()}};
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/freight',
      payload: {
        title: 'Bad',
        originName: 'A',
        destinationName: 'B',
        originLat: 'NaN',
        originLng: 1,
        destinationLat: 2,
        destinationLng: 3
      },
    });
    expect(res.statusCode).toBe(400);
  });

  it('rejects missing required text fields', async () => {
    const prisma = {freightLoad: {create: vi.fn()}};
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/freight',
      payload: {
        title: '',
        originName: '',
        destinationName: '',
        originLat: 1,
        originLng: 1,
        destinationLat: 2,
        destinationLng: 2
      },
    });
    expect(res.statusCode).toBe(400);
  });

  it('completes a load and debits balance', async () => {
    const txUser = {
      findUnique: vi.fn().mockResolvedValue(
          {k3h4CoinBalance: new Prisma.Decimal('500.00')}),
      update: vi.fn().mockResolvedValue(
          {k3h4CoinBalance: new Prisma.Decimal('480.00')}),
    };
    const txActor = {
      findFirst: vi.fn().mockResolvedValue({id: 'actor-1'}),
      create: vi.fn()
    };
    const txEntity = {
      create: vi.fn().mockResolvedValue({
        id: 'txn-1',
        direction: 'DEBIT',
        kind: 'FREIGHT_PAYMENT',
        metadata: {
          amount: '20.00',
          balanceAfter: '480.00',
          direction: 'debit',
          kind: 'freight_payment',
          note: 'Freight load loadname'
        },
        createdAt: new Date()
      })
    };
    const txFreight = {
      update: vi.fn().mockResolvedValue(
          {id: 'l1', status: 'completed', cost: new Prisma.Decimal('20')})
    };

    const prisma = {
      freightLoad: {
        findFirst: vi.fn().mockResolvedValue({
          id: 'l1',
          userId,
          status: 'planning',
          cost: new Prisma.Decimal('20.00')
        })
      },
      user: txUser,
      actor: txActor,
      entity: txEntity,
      $transaction: vi.fn(async (cb) => cb({
                            user: txUser,
                            actor: txActor,
                            entity: txEntity,
                            freightLoad: txFreight
                          } as any)),
    };
    const server = buildServer(prisma);
    const res =
        await server.inject({method: 'POST', url: '/freight/l1/complete'});
    expect(res.statusCode).toBe(200);
    expect(txEntity.create).toHaveBeenCalled();
    expect(txFreight.update).toHaveBeenCalled();
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'freight.complete'}));
  });

  it('rejects missing load', async () => {
    const prisma = {
      freightLoad: {findFirst: vi.fn().mockResolvedValue(null)},
      user: {},
      actor: {findFirst: vi.fn(), create: vi.fn()},
      entity: {create: vi.fn()},
      $transaction: vi.fn(),
    };
    const server = buildServer(prisma);
    const res =
        await server.inject({method: 'POST', url: '/freight/missing/complete'});
    expect(res.statusCode).toBe(404);
  });

  it('rejects already completed load', async () => {
    const prisma = {
      freightLoad: {
        findFirst: vi.fn().mockResolvedValue({
          id: 'l1',
          userId,
          status: 'completed',
          cost: new Prisma.Decimal('1')
        })
      },
      user: {},
      actor: {findFirst: vi.fn(), create: vi.fn()},
      entity: {create: vi.fn()},
      $transaction: vi.fn(),
    };
    const server = buildServer(prisma);
    const res =
        await server.inject({method: 'POST', url: '/freight/l1/complete'});
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when completion transaction fails', async () => {
    const prisma = {
      freightLoad: {
        findFirst: vi.fn().mockResolvedValue({
          id: 'l1',
          userId,
          status: 'planning',
          cost: new Prisma.Decimal('5')
        })
      },
      $transaction: vi.fn(async () => {
        throw new Error('tx failed');
      }),
      user: {},
      actor: {findFirst: vi.fn(), create: vi.fn()},
      entity: {create: vi.fn()},
      freightLoadUpdate: {},
    };
    const server = buildServer(prisma);
    const res =
        await server.inject({method: 'POST', url: '/freight/l1/complete'});
    expect(res.statusCode).toBe(400);
  });
});
