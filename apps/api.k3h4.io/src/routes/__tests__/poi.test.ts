import '../../test/vitest-setup';

import Fastify from 'fastify';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {ensureGeoActor} from '../../actors/Geo/Geo';
import {createPrismaGeoCoreKit} from '../../kits/geo-core/prisma-adapter';
import {readGeoQueryCache} from '../../services/geo-cache';
import {registerPoiRoutes} from '../poi';
import {type RecordTelemetryFn} from '../types';

vi.mock('../../actors/Geo/Geo', () => ({
  ensureGeoActor: vi.fn(),
  ensureGeoGlobalActor: vi.fn(),
}));
vi.mock('../../kits/geo-core/prisma-adapter', () => ({
  createPrismaGeoCoreKit: vi.fn(),
}));
vi.mock('../../services/geo-cache', () => ({
  readGeoQueryCache: vi.fn(),
  readGeoQueryCacheStale: vi.fn(),
  writeGeoQueryCache: vi.fn(),
}));

const recordTelemetry = vi.fn<RecordTelemetryFn>();
const recordMapView = vi.fn().mockResolvedValue({isStale: false});

describe('POI routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(ensureGeoActor).mockResolvedValue({id: 'geo-actor-1'} as any);
    vi.mocked(createPrismaGeoCoreKit).mockReturnValue({recordMapView} as any);
    vi.mocked(readGeoQueryCache).mockResolvedValue({
      signature: 'cached-list',
      type: 'poi.list',
      payload: {
        items: [{
          id: 'poi-1',
          osmId: '1',
          osmType: 'node',
          name: 'Cafe Ada',
          category: 'cafe',
          lat: 37.7,
          lng: -122.4,
          updatedAt: '2026-08-22T12:00:00.000Z',
        }],
        total: 1,
        returned: 1,
        clustered: false,
        bbox: {minLat: 37, minLng: -123, maxLat: 38, maxLng: -122},
        zoom: 14,
        etag: 'etag-1',
      },
      count: 1,
      expiresAt: '2026-08-22T13:00:00.000Z',
    } as any);
  });

  it('records authenticated map views through Geo core', async () => {
    const server = Fastify();
    server.decorate('authenticate', async (request: any) => {
      request.user = {sub: 'user-1'};
    });
    registerPoiRoutes(
        server as any, {} as any, recordTelemetry as any);

    const response = await server.inject({
      method: 'GET',
      url: '/api/pois?bbox=-123,37,-122,38&zoom=14',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      items: [expect.objectContaining({id: 'poi-1', name: 'Cafe Ada'})],
      total: 1,
      returned: 1,
      clustered: false,
      bbox: {minLat: 37, minLng: -123, maxLat: 38, maxLng: -122},
      zoom: 14,
    });
    expect(recordMapView).toHaveBeenCalledWith({
      actorId: 'geo-actor-1',
      bbox: {minLat: 37, minLng: -123, maxLat: 38, maxLng: -122},
      zoom: 14,
      items: [expect.objectContaining({id: 'poi-1'})],
    });
    expect(recordTelemetry).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({eventType: 'poi.list'}));
  });
});