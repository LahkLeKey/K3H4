import '../../test/vitest-setup';

import Fastify from 'fastify';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import * as cache from '../../services/usda-cache';
import {type RecordTelemetryFn} from '../types';
import {registerUsdaRoutes} from '../usda';

vi.mock('../../services/usda-cache', () => {
  return {
    fetchAndCache: vi.fn(),
  };
});

const recordTelemetry = vi.fn() as unknown as RecordTelemetryFn & {
  mockClear: () => void;
};
const userId = 'user-1';
const authHeaders = {
  authorization: 'Bearer token'
};

const buildServer = () => {
  const server = Fastify();
  server.decorate('authenticate', async (request: any) => {
    request.user = {sub: userId};
  });
  const prisma = {} as any;
  registerUsdaRoutes(server as any, prisma, recordTelemetry);
  return server;
};

const fetchAndCache =
    cache.fetchAndCache as unknown as ReturnType<typeof vi.fn>;

describe('usda routes', () => {
  beforeEach(() => {
    fetchAndCache.mockReset();
    fetchAndCache.mockResolvedValue({ok: true});
    recordTelemetry.mockClear();
  });

  it('fetches ESR exports by country with required params', async () => {
    const server = buildServer();
    const res = await server.inject({
      method: 'GET',
      url:
          '/usda/esr/exports/by-country?commodityCode=104&countryCode=1220&marketYear=2017',
      headers: authHeaders,
    });
    expect(res.statusCode).toBe(200);
    expect(fetchAndCache)
        .toHaveBeenCalledWith(
            expect.anything(), 'esr',
            '/api/esr/exports/commodityCode/104/countryCode/1220/marketYear/2017',
            undefined, expect.anything());
    expect(recordTelemetry)
        .toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
          eventType: 'usda.esr.exports.byCountry.fetch'
        }));
  });

  it('validates missing ESR params', async () => {
    const server = buildServer();
    const res = await server.inject({
      method: 'GET',
      url: '/usda/esr/exports/by-country',
      headers: authHeaders,
    });
    expect(res.statusCode).toBe(400);
    expect(fetchAndCache).not.toHaveBeenCalled();
  });

  it('fetches GATS census imports', async () => {
    const server = buildServer();
    const res = await server.inject({
      method: 'GET',
      url: '/usda/gats/census/imports?partnerCode=CH&year=2010&month=1',
      headers: authHeaders,
    });
    expect(res.statusCode).toBe(200);
    expect(fetchAndCache)
        .toHaveBeenCalledWith(
            expect.anything(), 'gats',
            '/api/gats/censusImports/partnerCode/CH/year/2010/month/1',
            undefined, expect.anything());
  });

  it('fetches PSD commodity world data', async () => {
    const server = buildServer();
    const res = await server.inject({
      method: 'GET',
      url: '/usda/psd/commodity/world?commodityCode=0440000&marketYear=2017',
      headers: authHeaders,
    });
    expect(res.statusCode).toBe(200);
    expect(fetchAndCache)
        .toHaveBeenCalledWith(
            expect.anything(), 'psd',
            '/api/psd/commodity/440000/world/year/2017', undefined,
            expect.objectContaining({maxAgeMinutes: 60}));
  });
});
