import '../../test/vitest-setup';

import {Prisma} from '@prisma/client';
import Fastify from 'fastify';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {createFreightLoad, findFreightLoad, loadFreightLoads, markFreightLoadCompleted,} from '../../actors/Freight/Freight';
import type {FreightLoadPayload} from '../../actors/Freight/Freight';
import {ensureGeoActor} from '../../actors/Geo/Geo';
import {LIFECYCLE_STATUSES} from '../../lib/domain-constants';
import {readGeoDirectionCache, writeGeoDirectionCache,} from '../../services/geo-direction-cache';
import {registerFreightRoutes} from '../freight';
import {type RecordTelemetryFn} from '../types';

const recordTelemetry = vi.fn<RecordTelemetryFn>();
const userId = 'user-1';
const createLoadPayload = (overrides: Partial<FreightLoadPayload> = {}) => ({
  id: 'l1',
  userId,
  title: 'Freight load',
  originName: 'Origin',
  originLat: 1,
  originLng: 1,
  destinationName: 'Destination',
  destinationLat: 2,
  destinationLng: 2,
  distanceKm: 10,
  durationMinutes: 10,
  cost: 20,
  status: LIFECYCLE_STATUSES.PLANNING,
  routeGeoJson: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});
vi.mock('../../actors/Geo/Geo', () => ({
                                  ensureGeoActor: vi.fn(),
                                }));
vi.mock('../../services/geo-direction-cache', () => ({
                                                readGeoDirectionCache: vi.fn(),
                                                writeGeoDirectionCache: vi.fn(),
                                              }));
vi.mock('../../actors/Freight/Freight', () => ({
                                          loadFreightLoads: vi.fn(),
                                          createFreightLoad: vi.fn(),
                                          findFreightLoad: vi.fn(),
                                          markFreightLoadCompleted: vi.fn(),
                                        }));
const nativeFetch = globalThis.fetch;
const ensureGeoActorMock =
    ensureGeoActor as unknown as ReturnType<typeof vi.fn>;
const readGeoDirectionCacheMock =
    readGeoDirectionCache as unknown as ReturnType<typeof vi.fn>;
const writeGeoDirectionCacheMock =
    writeGeoDirectionCache as unknown as ReturnType<typeof vi.fn>;
const loadFreightLoadsMock =
    loadFreightLoads as unknown as ReturnType<typeof vi.fn>;
const createFreightLoadMock =
    createFreightLoad as unknown as ReturnType<typeof vi.fn>;
const findFreightLoadMock =
    findFreightLoad as unknown as ReturnType<typeof vi.fn>;
const markFreightLoadCompletedMock =
    markFreightLoadCompleted as unknown as ReturnType<typeof vi.fn>;

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
    ensureGeoActorMock.mockResolvedValue({id: 'geo-actor-1'});
    readGeoDirectionCacheMock.mockResolvedValue(null);
    writeGeoDirectionCacheMock.mockResolvedValue(undefined);
    loadFreightLoadsMock.mockClear();
    createFreightLoadMock.mockClear();
    findFreightLoadMock.mockClear();
    markFreightLoadCompletedMock.mockClear();
    loadFreightLoadsMock.mockResolvedValue([createLoadPayload()]);
    createFreightLoadMock.mockResolvedValue(createLoadPayload());
    findFreightLoadMock.mockResolvedValue(createLoadPayload());
    markFreightLoadCompletedMock.mockResolvedValue(
        {...createLoadPayload(), status: LIFECYCLE_STATUSES.COMPLETED});
  });

  afterEach(() => {
    globalThis.fetch = nativeFetch;
  });

  it('lists loads', async () => {
    const load = createLoadPayload();
    loadFreightLoadsMock.mockResolvedValueOnce([load]);
    const server = buildServer({});
    const res = await server.inject({method: 'GET', url: '/freight'});
    expect(res.statusCode).toBe(200);
    expect(res.json().loads).toHaveLength(1);
    expect(loadFreightLoadsMock).toHaveBeenCalledWith({}, userId);
  });

  it('creates a load with osrm data', async () => {
    const fetchMock = Object.assign(
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () =>
              ({routes: [{distance: 10000, duration: 600, geometry: {}}]}),
        }),
        {preconnect: vi.fn()});
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const server = buildServer({});
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
    expect(createFreightLoadMock).toHaveBeenCalled();
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'freight.create'}));
  });

  it('returns 502 when osrm fails', async () => {
    const fetchMock = Object.assign(
        vi.fn().mockRejectedValue(new Error('network')),
        {preconnect: vi.fn()},
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const server = buildServer({});
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
    expect(createFreightLoadMock).not.toHaveBeenCalled();
  });

  it('returns 502 when osrm returns empty route', async () => {
    const fetchMock = Object.assign(
        vi.fn().mockResolvedValue(
            {ok: true, json: async () => ({routes: []})} as Response),
        {preconnect: vi.fn()},
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    const server = buildServer({});
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
    expect(createFreightLoadMock).not.toHaveBeenCalled();
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
    expect(createFreightLoadMock).not.toHaveBeenCalled();
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
    expect(createFreightLoadMock).not.toHaveBeenCalled();
  });

  it('completes a load and debits balance', async () => {
    const load = createLoadPayload({status: LIFECYCLE_STATUSES.PLANNING});
    findFreightLoadMock.mockResolvedValueOnce(load);
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
    const txContext = {user: txUser, actor: txActor, entity: txEntity};

    const prisma = {
      user: txUser,
      actor: txActor,
      entity: txEntity,
      $transaction: vi.fn(async (cb) => cb(txContext as any)),
    };
    const server = buildServer(prisma);
    const res = await server.inject(
        {method: 'POST', url: '/freight/l1/actions/complete'});
    expect(res.statusCode).toBe(200);
    expect(txEntity.create).toHaveBeenCalled();
    expect(createFreightLoadMock).not.toHaveBeenCalled();
    expect(markFreightLoadCompletedMock)
        .toHaveBeenCalledWith(txContext as any, 'l1');
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'freight.complete'}));
  });

  it('rejects missing load', async () => {
    findFreightLoadMock.mockResolvedValueOnce(null);
    const prisma = {
      user: {},
      actor: {findFirst: vi.fn(), create: vi.fn()},
      entity: {create: vi.fn()},
      $transaction: vi.fn(),
    };
    const server = buildServer(prisma);
    const res = await server.inject(
        {method: 'POST', url: '/freight/missing/actions/complete'});
    expect(res.statusCode).toBe(404);
    expect(markFreightLoadCompletedMock).not.toHaveBeenCalled();
  });

  it('rejects already completed load', async () => {
    findFreightLoadMock.mockResolvedValueOnce(
        createLoadPayload({status: LIFECYCLE_STATUSES.COMPLETED}));
    const prisma = {
      user: {},
      actor: {findFirst: vi.fn(), create: vi.fn()},
      entity: {create: vi.fn()},
      $transaction: vi.fn(),
    };
    const server = buildServer(prisma);
    const res = await server.inject(
        {method: 'POST', url: '/freight/l1/actions/complete'});
    expect(res.statusCode).toBe(400);
    expect(markFreightLoadCompletedMock).not.toHaveBeenCalled();
  });

  it('returns 400 when completion transaction fails', async () => {
    findFreightLoadMock.mockResolvedValueOnce(createLoadPayload());
    const prisma = {
      $transaction: vi.fn(async () => {
        throw new Error('tx failed');
      }),
      user: {},
      actor: {findFirst: vi.fn(), create: vi.fn()},
      entity: {create: vi.fn()},
    };
    const server = buildServer(prisma);
    const res = await server.inject(
        {method: 'POST', url: '/freight/l1/actions/complete'});
    expect(res.statusCode).toBe(400);
    expect(markFreightLoadCompletedMock).not.toHaveBeenCalled();
  });
});
