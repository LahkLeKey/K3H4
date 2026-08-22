import '../../test/vitest-setup';

import Fastify from 'fastify';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {ensureGeoActor} from '../../actors/Geo/Geo';
import {createPrismaGeoCoreKit} from '../../kits/geo-core/prisma-adapter';
import {registerGeoRoutes} from '../geo';
import {type RecordTelemetryFn} from '../types';

vi.mock('../../actors/Geo/Geo', () => ({ensureGeoActor: vi.fn()}));
vi.mock('../../kits/geo-core/prisma-adapter', () => ({
  createPrismaGeoCoreKit: vi.fn(),
}));

const userId = 'user-1';
const actorId = 'geo-actor-1';
const authHeaders = {authorization: 'Bearer token'};
const recordTelemetry = vi.fn<RecordTelemetryFn>();
const kit = {
  resolveRoute: vi.fn(),
  findPois: vi.fn(),
  getMapPreferences: vi.fn(),
  updateMapPreferences: vi.fn(),
  getMapHistory: vi.fn(),
  recordMapView: vi.fn(),
};

const buildServer = (authorized = true) => {
  const server = Fastify();
  server.decorateRequest('jwtVerify', async function(this: any) {
    if (!authorized) throw new Error('invalid token');
    this.user = {sub: userId};
  });
  registerGeoRoutes(server as any, {} as any, recordTelemetry as any);
  return server;
};

describe('geo routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(ensureGeoActor).mockResolvedValue({id: actorId} as any);
    vi.mocked(createPrismaGeoCoreKit).mockReturnValue(kit as any);
  });

  it('returns the existing route shape and cached telemetry', async () => {
    kit.resolveRoute.mockResolvedValue({
      distanceKm: 12.4,
      durationMinutes: 18,
      geojson: {type: 'LineString', coordinates: []},
      cached: true,
    });
    const server = buildServer();

    const response = await server.inject({
      method: 'GET',
      url: '/geo/route?originLat=37.7&originLng=-122.4&destinationLat=34&destinationLng=-80',
      headers: authHeaders,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      distanceKm: 12.4,
      durationMinutes: 18,
      geojson: {type: 'LineString', coordinates: []},
      cached: true,
    });
    expect(kit.resolveRoute).toHaveBeenCalledWith({
      actorId,
      origin: {lat: 37.7, lng: -122.4},
      destination: {lat: 34, lng: -80},
    });
    expect(recordTelemetry).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({eventType: 'geo.route.cached'}));
  });

  it('rejects unauthenticated route resolution before calling the Kit', async () => {
    const server = buildServer(false);

    const response = await server.inject({
      method: 'GET',
      url: '/geo/route?originLat=37.7&originLng=-80&destinationLat=34&destinationLng=-79',
      headers: authHeaders,
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toEqual({error: 'Unauthorized'});
    expect(kit.resolveRoute).not.toHaveBeenCalled();
  });

  it('returns POIs with the existing fetched telemetry', async () => {
    kit.findPois.mockResolvedValue({
      pois: [{id: '42', name: 'Cafe Ada'}],
      count: 1,
      cached: false,
    });
    const server = buildServer();

    const response = await server.inject({
      method: 'GET',
      url: '/geo/pois?lat=37.7&lng=-122.4&radiusM=1800&kinds=cafe',
      headers: authHeaders,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      pois: [{id: '42', name: 'Cafe Ada'}],
      count: 1,
      cached: false,
    });
    expect(recordTelemetry).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({eventType: 'geo.poi.fetched'}));
  });

  it('rejects invalid POI coordinates before calling the Kit', async () => {
    const server = buildServer();

    const response = await server.inject({
      method: 'GET',
      url: '/geo/pois?lat=invalid&lng=-80',
    });

    expect(response.statusCode).toBe(400);
    expect(kit.findPois).not.toHaveBeenCalled();
  });

  it('maps POI provider failures to the existing 502 response', async () => {
    kit.findPois.mockRejectedValue(new Error('Overpass 503'));
    const server = buildServer();

    const response = await server.inject({
      method: 'GET',
      url: '/geo/pois?lat=37.7&lng=-80&radiusM=1800&kinds=cafe',
    });

    expect(response.statusCode).toBe(502);
    expect(response.json()).toEqual({error: 'Overpass 503'});
  });

  it('returns enriched map history through the Kit', async () => {
    kit.getMapHistory.mockResolvedValue([{
      id: 'history-1',
      signature: 'view-signature',
      zoomBand: 12,
      bbox: {minLat: 1, minLng: 2, maxLat: 3, maxLng: 4},
      lastPoiIds: [],
      lastPoiCount: 0,
      pois: [],
      firstViewedAt: '2026-08-22T10:00:00.000Z',
      lastViewedAt: '2026-08-22T11:00:00.000Z',
      viewCount: 2,
      staleAfter: null,
    }]);
    const server = buildServer();

    const response = await server.inject({
      method: 'GET',
      url: '/geo/history?limit=40',
      headers: authHeaders,
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual([expect.objectContaining({
      id: 'history-1',
      signature: 'view-signature',
      pois: [],
    })]);
    expect(kit.getMapHistory).toHaveBeenCalledWith(actorId, 40);
  });

  it('returns and updates map preferences through the Kit', async () => {
    kit.getMapPreferences.mockResolvedValue({
      view: {
        center: {lat: 37.7, lng: -122.4},
        zoom: 12,
        bearing: 0,
        pitch: 0,
      },
      poi: null,
    });
    const server = buildServer();

    const getResponse = await server.inject({
      method: 'GET',
      url: '/geo/prefs',
      headers: authHeaders,
    });
    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.json()).toEqual({
      view: {
        center: {lat: 37.7, lng: -122.4},
        zoom: 12,
        bearing: 0,
        pitch: 0,
      },
      poi: null,
    });

    const postResponse = await server.inject({
      method: 'POST',
      url: '/geo/prefs',
      headers: authHeaders,
      payload: {center: {lat: 40, lng: -73}, view: {zoom: 9}},
    });
    expect(postResponse.statusCode).toBe(200);
    expect(postResponse.json()).toEqual({ok: true});
    expect(kit.updateMapPreferences).toHaveBeenCalledWith(
        userId, actorId,
        {center: {lat: 40, lng: -73}, view: {zoom: 9}});
    expect(recordTelemetry).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({eventType: 'geo.prefs.update'}));
  });
});