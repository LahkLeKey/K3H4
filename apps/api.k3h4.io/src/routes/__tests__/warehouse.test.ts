import Fastify from 'fastify';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {type RecordTelemetryFn} from '../types';
import {registerWarehouseRoutes} from '../warehouse';

const recordTelemetry = vi.fn() as unknown as RecordTelemetryFn;
const userId = 'user-1';

function buildServer(prisma: any) {
  const server = Fastify();
  server.decorate('authenticate', async (request: any) => {
    request.user = {sub: userId};
  });
  registerWarehouseRoutes(server as any, prisma as any, recordTelemetry);
  return server;
}

const buildBasePrisma = () => ({
  actor: {
    findFirst: vi.fn().mockResolvedValue({id: 'actor-1'}),
    create: vi.fn().mockResolvedValue({id: 'actor-1'}),
  },
  entity: {
    findMany: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  freightLoad: {findFirst: vi.fn().mockResolvedValue({id: 'f1'})},
});

describe('warehouse routes', () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
  });

  it('lists items', async () => {
    const prisma = buildBasePrisma();
    prisma.entity.findMany.mockResolvedValue([
      {
        id: 'w1',
        metadata: {
          sku: 'SKU',
          quantity: 5,
          location: 'A',
          status: 'stored',
          category: 'other',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const server = buildServer(prisma);
    const res = await server.inject({method: 'GET', url: '/warehouse/items'});
    expect(res.statusCode).toBe(200);
    expect(res.json().items[0].quantity).toBe(5);
  });

  it('creates an item linked to freight', async () => {
    const prisma = buildBasePrisma();
    prisma.entity.create.mockResolvedValue({
      id: 'w2',
      metadata: {
        sku: 'SKU2',
        quantity: 1,
        location: 'B',
        status: 'stored',
        category: 'other',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/warehouse/items',
      payload: {sku: 'SKU2', location: 'B', quantity: 1, freightLoadId: 'f1'},
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.entity.create).toHaveBeenCalled();
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'warehouse.create'}),
        );
  });

  it('rejects missing sku', async () => {
    const prisma = buildBasePrisma();
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/warehouse/items',
      payload: {location: 'A'},
    });
    expect(res.statusCode).toBe(400);
  });

  it('rejects missing location', async () => {
    const prisma = buildBasePrisma();
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/warehouse/items',
      payload: {sku: 'SKU'},
    });
    expect(res.statusCode).toBe(400);
  });

  it('rejects negative quantity on create', async () => {
    const prisma = buildBasePrisma();
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/warehouse/items',
      payload: {sku: 'SKU', location: 'A', quantity: -5},
    });
    expect(res.statusCode).toBe(400);
  });

  it('rejects unknown freight link', async () => {
    const prisma = buildBasePrisma();
    prisma.freightLoad.findFirst.mockResolvedValue(null);
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/warehouse/items',
      payload: {sku: 'S', location: 'A', freightLoadId: 'missing'},
    });
    expect(res.statusCode).toBe(404);
  });

  it('rejects negative quantity on update', async () => {
    const prisma = buildBasePrisma();
    prisma.entity.findFirst.mockResolvedValue({
      id: 'w4',
      metadata: {
        sku: 'S',
        quantity: 1,
        location: 'A',
        status: 'stored',
        category: 'other',
      },
    });
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'PATCH',
      url: '/warehouse/items/w4',
      payload: {quantity: -1},
    });
    expect(res.statusCode).toBe(400);
  });

  it('rejects linking to missing freight on update', async () => {
    const prisma = buildBasePrisma();
    prisma.entity.findFirst.mockResolvedValue({
      id: 'w5',
      metadata: {
        sku: 'S',
        quantity: 1,
        location: 'A',
        status: 'stored',
        category: 'other',
      },
    });
    prisma.freightLoad.findFirst.mockResolvedValue(null);
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'PATCH',
      url: '/warehouse/items/w5',
      payload: {freightLoadId: 'missing'},
    });
    expect(res.statusCode).toBe(404);
  });

  it('updates an item', async () => {
    const prisma = buildBasePrisma();
    prisma.entity.findFirst.mockResolvedValue({
      id: 'w3',
      metadata: {
        sku: 'SKU3',
        quantity: 2,
        location: 'C',
        status: 'stored',
        category: 'other',
      },
    });
    prisma.entity.update.mockResolvedValue({
      id: 'w3',
      metadata: {
        sku: 'SKU3',
        quantity: 3,
        location: 'C',
        status: 'stored',
        category: 'other',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'PATCH',
      url: '/warehouse/items/w3',
      payload: {quantity: 3},
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.entity.update).toHaveBeenCalled();
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'warehouse.update'}),
        );
  });
});
