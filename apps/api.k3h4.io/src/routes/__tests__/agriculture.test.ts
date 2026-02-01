import '../../test/vitest-setup';

import Fastify from 'fastify';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {registerAgricultureRoutes} from '../agriculture';
import {type RecordTelemetryFn} from '../types';

const recordTelemetry = vi.fn<RecordTelemetryFn>();
const userId = 'user-1';
const EntityKind = ENTITY_KINDS;

function buildServer(mocks: any) {
  const server = Fastify();
  server.decorate('authenticate', async (request: any) => {
    request.user = {sub: userId};
  });
  registerAgricultureRoutes(server as any, mocks as any, recordTelemetry);
  return server;
}

describe('Agriculture routes', () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
  });

  it('returns overview', async () => {
    const entity = {
      count: vi.fn().mockResolvedValue(0),
      findMany: vi.fn().mockResolvedValue([]),
    };
    const actor = {
      findFirst: vi.fn().mockResolvedValue({id: 'actor-1'}),
      create: vi.fn(),
    };
    const prisma = {
      entity,
      actor,
    };
    const server = buildServer(prisma);
    const res =
        await server.inject({method: 'GET', url: '/agriculture/overview'});
    expect(res.statusCode).toBe(200);
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'agriculture.overview.fetch'}));
  });

  it('creates a plot and reuses an unlocked slot', async () => {
    const actor = {
      findFirst: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({id: 'actor-1', userId}),
    };
    const createdPlot = {
      id: 'plot-1',
      actorId: 'actor-1',
      metadata: {name: 'North', crop: 'Corn'},
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const openSlot = {
      id: 'slot-1',
      actorId: 'actor-1',
      metadata: {slotIndex: 0},
      targetId: null,
      createdAt: new Date(),
      kind: EntityKind.AGRICULTURE_SLOT,
    };
    const txMock = {
      entity: {
        create: vi.fn().mockResolvedValue(createdPlot),
        findMany: vi.fn().mockResolvedValue([openSlot]),
        update: vi.fn().mockResolvedValue({
          ...openSlot,
          targetId: createdPlot.id,
        }),
      },
    };
    const prisma = {
      actor,
      entity: {count: vi.fn(), findMany: vi.fn()},
      $transaction: vi.fn(
          async (cb: (tx: typeof txMock) => Promise<unknown>) => cb(txMock)),
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/agriculture/plots',
      payload: {name: 'North', crop: 'Corn', acres: 10},
    });
    expect(res.statusCode).toBe(200);
    expect(txMock.entity.update).toHaveBeenCalled();
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'agriculture.plot.create'}));
  });
});
