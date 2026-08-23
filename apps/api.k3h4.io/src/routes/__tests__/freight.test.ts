import '../../test/vitest-setup';

import Fastify from 'fastify';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import type {FreightLoadPayload} from '../../actors/Freight/Freight';
import {FreightLoadAlreadyCompletedError, FreightLoadNotFoundError} from '../../kits/freight-routing';
import {createPrismaFreightRoutingKit} from '../../kits/freight-routing/prisma-adapter';
import {LIFECYCLE_STATUSES} from '../../lib/domain-constants';
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
vi.mock('../../kits/freight-routing/prisma-adapter', () => ({
  createPrismaFreightRoutingKit: vi.fn(),
}));

const freight = {
  listLoads: vi.fn(),
  planLoad: vi.fn(),
  getDirections: vi.fn(),
  completeLoad: vi.fn(),
};

function buildServer(prisma: any, authorized = true) {
  const server = Fastify();
  server.decorate('authenticate', async (request: any, reply: any) => {
    if (!authorized) {
      return reply.status(401).send({error: 'Unauthorized'});
    }
    request.user = {sub: userId};
  });
  registerFreightRoutes(server as any, prisma as any, recordTelemetry);
  return server;
}

describe('freight routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createPrismaFreightRoutingKit).mockReturnValue(freight as any);
    freight.listLoads.mockResolvedValue([createLoadPayload()]);
    freight.planLoad.mockResolvedValue(createLoadPayload());
    freight.getDirections.mockResolvedValue({signature: 'route-1'});
    freight.completeLoad.mockResolvedValue(
        {...createLoadPayload(), status: LIFECYCLE_STATUSES.COMPLETED});
  });

  it('lists loads', async () => {
    const load = createLoadPayload();
    freight.listLoads.mockResolvedValueOnce([load]);
    const server = buildServer({});
    const res = await server.inject({method: 'GET', url: '/freight'});
    expect(res.statusCode).toBe(200);
    expect(res.json().loads).toHaveLength(1);
    expect(freight.listLoads).toHaveBeenCalledWith(userId);
  });

  it('creates a load through the Kit and records telemetry', async () => {
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
    expect(res.json().load).toMatchObject({distanceKm: 10, cost: 20});
    expect(freight.planLoad).toHaveBeenCalledWith({
      userId,
      title: 'Load',
      originName: 'A',
      origin: {lat: 1, lng: 1},
      destinationName: 'B',
      destination: {lat: 2, lng: 2},
      ratePerKm: 2,
    });
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'freight.create'}));
  });

  it('returns 502 when osrm fails', async () => {
    freight.planLoad.mockRejectedValueOnce(new Error('network'));

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
  expect(res.json()).toEqual({error: 'network'});
  });

  it('returns 502 when osrm returns empty route', async () => {
  freight.planLoad.mockRejectedValueOnce(new Error('Route unavailable'));
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
    expect(res.json()).toEqual({error: 'Route unavailable'});
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
    expect(freight.planLoad).not.toHaveBeenCalled();
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
    expect(freight.planLoad).not.toHaveBeenCalled();
  });

  it('completes a load through the Kit and records telemetry', async () => {
    const server = buildServer({});
    const res = await server.inject(
        {method: 'POST', url: '/freight/l1/actions/complete'});
    expect(res.statusCode).toBe(200);
    expect(freight.completeLoad).toHaveBeenCalledWith(userId, 'l1');
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'freight.complete'}));
  });

  it('rejects missing load', async () => {
    freight.completeLoad.mockRejectedValueOnce(
        new FreightLoadNotFoundError('Freight load not found'));
    const server = buildServer({});
    const res = await server.inject(
        {method: 'POST', url: '/freight/missing/actions/complete'});
    expect(res.statusCode).toBe(404);
    expect(res.json()).toEqual({error: 'Freight load not found'});
  });

  it('rejects already completed load', async () => {
    freight.completeLoad.mockRejectedValueOnce(
        new FreightLoadAlreadyCompletedError('Load already completed'));
    const server = buildServer({});
    const res = await server.inject(
        {method: 'POST', url: '/freight/l1/actions/complete'});
    expect(res.statusCode).toBe(400);
    expect(res.json()).toEqual({error: 'Load already completed'});
  });

  it('returns 400 when completion transaction fails', async () => {
    freight.completeLoad.mockRejectedValueOnce(new Error('tx failed'));
    const server = buildServer({});
    const res = await server.inject(
        {method: 'POST', url: '/freight/l1/actions/complete'});
    expect(res.statusCode).toBe(400);
    expect(res.json()).toEqual({error: 'tx failed'});
  });

  it('returns directions from the Kit without changing their shape', async () => {
    freight.getDirections.mockResolvedValueOnce({
      signature: 'route-1',
      provider: 'osrm',
      stops: [{id: 'route-1:stop:0'}],
      segments: [{id: 'route-1:segment:0'}],
    });
    const server = buildServer({});

    const res = await server.inject(
        {method: 'GET', url: '/freight/l1/directions'});

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({direction: {
      signature: 'route-1',
      provider: 'osrm',
      stops: [{id: 'route-1:stop:0'}],
      segments: [{id: 'route-1:segment:0'}],
    }});
    expect(freight.getDirections).toHaveBeenCalledWith(userId, 'l1');
  });

  it('maps a missing directions load to 404', async () => {
    freight.getDirections.mockRejectedValueOnce(
        new FreightLoadNotFoundError('Freight load not found'));
    const server = buildServer({});

    const res = await server.inject(
        {method: 'GET', url: '/freight/missing/directions'});

    expect(res.statusCode).toBe(404);
    expect(res.json()).toEqual({error: 'Freight load not found'});
  });

  it('maps a direction provider failure to 502', async () => {
    freight.getDirections.mockRejectedValueOnce(new Error('OSRM 503'));
    const server = buildServer({});

    const res = await server.inject(
        {method: 'GET', url: '/freight/l1/directions'});

    expect(res.statusCode).toBe(502);
    expect(res.json()).toEqual({error: 'OSRM 503'});
  });

  it('rejects unauthenticated requests before calling the Kit', async () => {
    const server = buildServer({}, false);

    const res = await server.inject({method: 'GET', url: '/freight'});

    expect(res.statusCode).toBe(401);
    expect(res.json()).toEqual({error: 'Unauthorized'});
    expect(freight.listLoads).not.toHaveBeenCalled();
  });
});
