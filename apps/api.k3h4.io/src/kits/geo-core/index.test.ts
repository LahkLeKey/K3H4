import '../../test/vitest-setup';

import {describe, expect, it, vi} from 'vitest';

import {createGeoCoreKit, type GeoCoreHost} from './index';

const cachedRoute = {
  distanceKm: 12.4,
  durationMinutes: 18,
  geojson: {type: 'LineString', coordinates: [[-122.4, 37.7]]},
};

const createHost = (): GeoCoreHost => ({
  now: () => new Date('2026-08-22T12:00:00.000Z'),
  findRoute: vi.fn().mockResolvedValue(cachedRoute),
  saveRoute: vi.fn(),
  fetchRoute: vi.fn(),
  findPois: vi.fn().mockResolvedValue(null),
  findStalePois: vi.fn().mockResolvedValue(null),
  savePois: vi.fn(),
  fetchPois: vi.fn(),
  readPreferences: vi.fn().mockResolvedValue({
    center: null,
    view: null,
    poi: null,
  }),
  findPreferencePois: vi.fn().mockResolvedValue(null),
  savePreferences: vi.fn(),
  savePreferencePois: vi.fn(),
  readHistory: vi.fn().mockResolvedValue([]),
  findHistoryPois: vi.fn().mockResolvedValue([]),
  readHistoryEntry: vi.fn().mockResolvedValue(null),
  saveHistoryEntry: vi.fn(),
});

describe('Geo core Kit', () => {
  it('resolves a cached route without calling the provider', async () => {
    const host = createHost();
    const kit = createGeoCoreKit(host);

    const result = await kit.resolveRoute({
      actorId: 'geo-actor-1',
      origin: {lat: 37.7, lng: -122.4},
      destination: {lat: 34.0, lng: -118.2},
    });

    expect(result).toEqual({...cachedRoute, cached: true});
    expect(host.fetchRoute).not.toHaveBeenCalled();
    expect(host.saveRoute).not.toHaveBeenCalled();
  });

  it('finds fresh POIs, caches them, and persists the map preference', async () => {
    const host = createHost();
    vi.mocked(host.fetchPois).mockResolvedValue([{
      id: '42',
      name: 'Cafe Ada',
      kind: 'cafe',
      lat: 37.7,
      lng: -122.4,
    }]);
    const kit = createGeoCoreKit(host);

    const result = await kit.findPois({
      actorId: 'geo-actor-1',
      userId: 'user-1',
      center: {lat: 37.7, lng: -122.4},
      radiusM: 1800,
      kinds: ['cafe'],
    });

    expect(result).toEqual({
      pois: [{
        id: '42',
        name: 'Cafe Ada',
        kind: 'cafe',
        lat: 37.7,
        lng: -122.4,
      }],
      count: 1,
      cached: false,
    });
    expect(host.savePois).toHaveBeenCalledOnce();
    expect(host.savePreferences).toHaveBeenCalledWith('user-1',
        expect.objectContaining({center: {lat: 37.7, lng: -122.4}}));
  });

  it('falls back to stale POIs when the provider fails', async () => {
    const host = createHost();
    vi.mocked(host.fetchPois).mockRejectedValue(new Error('Overpass 503'));
    vi.mocked(host.findStalePois).mockResolvedValue({
      pois: [{id: '42'}],
      count: 1,
    });
    const kit = createGeoCoreKit(host);

    await expect(kit.findPois({
      actorId: 'geo-actor-1',
      userId: 'user-1',
      center: {lat: 37.7, lng: -122.4},
      radiusM: 1800,
      kinds: ['cafe'],
    })).resolves.toEqual({
      pois: [{id: '42'}],
      count: 1,
      cached: true,
      stale: true,
    });
  });

  it('reads and updates map preferences without exposing preference records', async () => {
    const host = createHost();
    vi.mocked(host.readPreferences).mockResolvedValue({
      center: {lat: 37.7, lng: -122.4},
      view: {zoom: 12, bearing: 0, pitch: 10},
      poi: {
        signature: 'poi-signature',
        kinds: ['cafe'],
        radiusM: 1800,
        count: 1,
        fetchedAt: '2026-08-22T11:00:00.000Z',
      },
    });
    vi.mocked(host.findPreferencePois).mockResolvedValue({
      pois: [{id: '42'}],
      count: 1,
      expiresAt: '2026-08-22T13:00:00.000Z',
    });
    const kit = createGeoCoreKit(host);

    await expect(kit.getMapPreferences('geo-actor-1')).resolves.toEqual({
      view: {
        center: {lat: 37.7, lng: -122.4},
        zoom: 12,
        bearing: 0,
        pitch: 10,
      },
      poi: {
        signature: 'poi-signature',
        kinds: ['cafe'],
        radiusM: 1800,
        count: 1,
        cached: true,
        fetchedAt: new Date('2026-08-22T11:00:00.000Z'),
        pois: [{id: '42'}],
      },
    });

    await kit.updateMapPreferences('user-1', 'geo-actor-1', {
      center: {lat: 40, lng: -73},
      view: {zoom: 9},
    });
    expect(host.savePreferences).toHaveBeenCalledWith('user-1', {
      center: {lat: 40, lng: -73},
      view: {zoom: 9, bearing: null, pitch: null},
    });
  });

  it('projects map history with POI summaries and records viewed POIs', async () => {
    const host = createHost();
    vi.mocked(host.readHistory).mockResolvedValue([{
      id: 'history-1',
      signature: 'view-signature',
      zoomBand: 12,
      bbox: {minLat: 1, minLng: 2, maxLat: 3, maxLng: 4},
      lastPoiIds: ['poi-1'],
      lastPoiCount: 1,
      firstViewedAt: '2026-08-22T10:00:00.000Z',
      lastViewedAt: '2026-08-22T11:00:00.000Z',
      viewCount: 2,
      staleAfter: '2026-08-22T12:30:00.000Z',
    }]);
    vi.mocked(host.findHistoryPois).mockResolvedValue([{
      id: 'poi-1',
      name: 'Cafe Ada',
      category: 'cafe',
      lat: 1.5,
      lng: 2.5,
    }]);
    const kit = createGeoCoreKit(host);

    const history = await kit.getMapHistory('geo-actor-1', 40);
    expect(history[0]).toEqual(expect.objectContaining({
      id: 'history-1',
      pois: [{
        id: 'poi-1',
        name: 'Cafe Ada',
        category: 'cafe',
        lat: 1.5,
        lng: 2.5,
      }],
    }));

    const record = await kit.recordMapView({
      actorId: 'geo-actor-1',
      bbox: {minLat: 1, minLng: 2, maxLat: 3, maxLng: 4},
      zoom: 12,
      items: [{id: 'poi-1'}, {id: 'cluster:1', cluster: true}],
    });
    expect(host.saveHistoryEntry).toHaveBeenCalledWith(
        'geo-actor-1', expect.objectContaining({
          lastPoiIds: ['poi-1'],
          lastPoiCount: 2,
          viewCount: 1,
        }));
    expect(record.isStale).toBe(true);
  });
});