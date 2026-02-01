import '../../test/vitest-setup';

import Fastify from 'fastify';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {LIFECYCLE_STATUSES} from '../../lib/domain-constants';
import * as culinaryLedger from '../../services/culinary-ledger';
import * as pointOfSaleLedger from '../../services/point-of-sale-ledger';
import {registerCulinaryRoutes} from '../culinary';
import {type RecordTelemetryFn} from '../types';

const recordTelemetry = vi.fn<RecordTelemetryFn>();
const userId = 'user-1';
let loadMenuItemsSpy: ReturnType<typeof vi.spyOn>;
let loadPrepTasksSpy: ReturnType<typeof vi.spyOn>;
let loadSupplierNeedsSpy: ReturnType<typeof vi.spyOn>;
let createMenuItemSpy: ReturnType<typeof vi.spyOn>;
let createPrepTaskSpy: ReturnType<typeof vi.spyOn>;
let createSupplierNeedSpy: ReturnType<typeof vi.spyOn>;
let pointOfSaleOverviewSpy: ReturnType<typeof vi.spyOn>;

function buildServer(mocks: any) {
  const server = Fastify();
  server.decorate('authenticate', async (request: any) => {
    request.user = {sub: userId};
  });
  registerCulinaryRoutes(server as any, mocks as any, recordTelemetry);
  return server;
}

describe('Culinary routes', () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
    loadMenuItemsSpy =
        vi.spyOn(culinaryLedger, 'loadCulinaryMenuItems').mockResolvedValue([]);
    loadPrepTasksSpy =
        vi.spyOn(culinaryLedger, 'loadCulinaryPrepTasks').mockResolvedValue([]);
    loadSupplierNeedsSpy = vi.spyOn(culinaryLedger, 'loadCulinarySupplierNeeds')
                               .mockResolvedValue([]);
    createMenuItemSpy =
        vi.spyOn(culinaryLedger, 'createCulinaryMenuItem').mockResolvedValue({
          id: 'm1'
        });
    createPrepTaskSpy =
        vi.spyOn(culinaryLedger, 'createCulinaryPrepTask').mockResolvedValue({
          id: 'p1'
        });
    createSupplierNeedSpy =
        vi.spyOn(culinaryLedger, 'createCulinarySupplierNeed')
            .mockResolvedValue({id: 's1'});
    pointOfSaleOverviewSpy =
        vi.spyOn(pointOfSaleLedger, 'getPointOfSaleOverview')
            .mockResolvedValue({
              metrics: {grossRevenue: '0.00', tickets: 0, avgTicket: '0.00'},
              orders: [],
              topItems: [],
              stores: [],
            });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns overview', async () => {
    const prisma = {$transaction: vi.fn()};
    const server = buildServer(prisma);
    const res = await server.inject({method: 'GET', url: '/culinary/overview'});
    expect(res.statusCode).toBe(200);
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'culinary.overview.fetch'}));
    expect(loadMenuItemsSpy).toHaveBeenCalledWith(prisma, userId);
    expect(loadPrepTasksSpy).toHaveBeenCalledWith(prisma, userId);
    expect(loadSupplierNeedsSpy).toHaveBeenCalledWith(prisma, userId);
    const body = res.json();
    expect(body.pointOfSale).toEqual(expect.objectContaining({
      metrics: expect.objectContaining({tickets: 0}),
    }));
  });

  it('creates menu item, prep task, and supplier need', async () => {
    const prisma = {
      $transaction:
          vi.fn(async (callback: (tx: any) => any) => callback({} as any)),
    };
    const server = buildServer(prisma);

    const menuRes = await server.inject({
      method: 'POST',
      url: '/culinary/menu-items',
      payload: {name: 'Bowl', prepMinutes: 10, cost: 4.5, price: 12}
    });
    expect(menuRes.statusCode).toBe(200);
    expect(createMenuItemSpy)
        .toHaveBeenCalledWith(
            expect.anything(), userId,
            {name: 'Bowl', prepMinutes: 10, cost: 4.5, price: 12});

    const prepRes = await server.inject({
      method: 'POST',
      url: '/culinary/prep-tasks',
      payload: {
        task: 'Chop',
        station: 'Garde',
        dueAt: '2025-01-01',
        status: 'pending'
      }
    });
    expect(prepRes.statusCode).toBe(200);
    expect(createPrepTaskSpy).toHaveBeenCalledWith(expect.anything(), userId, {
      task: 'Chop',
      station: 'Garde',
      dueAt: '2025-01-01',
      status: LIFECYCLE_STATUSES.PENDING,
    });

    const supplierRes = await server.inject({
      method: 'POST',
      url: '/culinary/supplier-needs',
      payload: {
        item: 'Greens',
        quantity: '3',
        dueDate: '2025-01-02',
        status: 'closed'
      }
    });
    expect(supplierRes.statusCode).toBe(200);
    expect(createSupplierNeedSpy)
        .toHaveBeenCalledWith(expect.anything(), userId, {
          item: 'Greens',
          quantity: '3',
          dueDate: '2025-01-02',
          status: LIFECYCLE_STATUSES.CLOSED,
        });
  });
});
