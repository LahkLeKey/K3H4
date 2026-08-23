import '../../test/vitest-setup';

import {describe, expect, it, vi} from 'vitest';

import {type GeoCoreHost, type GeoCoreKit} from '../geo-core';

import {createGeoMapBootstrapKit} from './index';

const preferences = {
  view: {
    center: {lat: 44.7434, lng: -92.8512},
    zoom: 12,
    bearing: 0,
    pitch: 15,
  },
  poi: {
    signature: 'saved-pois',
    kinds: ['cafe'],
    radiusM: 1800,
    count: 1,
    cached: true as const,
    fetchedAt: new Date('2026-08-22T11:00:00.000Z'),
    pois: [{id: 'poi-1', name: 'Cafe Ada'}],
  },
};

const history = [{
  id: 'history-1',
  signature: 'saved-view',
  zoomBand: 12,
  bbox: {minLat: 44, minLng: -93, maxLat: 45, maxLng: -92},
  lastPoiIds: ['poi-1'],
  lastPoiCount: 1,
  pois: [{
    id: 'poi-1',
    name: 'Cafe Ada',
    category: 'cafe',
    lat: 44.7434,
    lng: -92.8512,
  }],
  firstViewedAt: '2026-08-22T10:00:00.000Z',
  lastViewedAt: '2026-08-22T11:00:00.000Z',
  viewCount: 2,
  staleAfter: '2026-08-22T12:00:00.000Z',
}];

describe('Geo Map Bootstrap Kit', () => {
  it('builds authenticated preferences, history, and selected POI through public capabilities',
     async () => {
       const geoCore = {
         getMapPreferences: vi.fn().mockResolvedValue(preferences),
         getMapHistory: vi.fn().mockResolvedValue(history),
       } as unknown as GeoCoreKit;
       const enrichSelectedPoi = vi.fn().mockResolvedValue({
         id: 'node/42',
         name: 'Cafe Ada',
         geometry: {type: 'Point', coordinates: [-92.8512, 44.7434]},
       });
       const resolveActorId = vi.fn().mockResolvedValue('geo-actor-1');
       const kit = createGeoMapBootstrapKit({
         geoCore,
         geoCoreHost: {} as Pick<GeoCoreHost, 'findPreferencePois'>,
         resolveActorId,
         resolveGlobalActorId: vi.fn(),
         enrichSelectedPoi,
         now: () => new Date('2026-08-22T12:00:00.000Z'),
       });

       const result = await kit.build({
         userId: 'user-1',
         includeMap: false,
         includePrefs: true,
         includeHistory: true,
         historyLimit: 25,
         selectedPoi: {id: '42', includeGeometry: true},
       });

       expect(result).toEqual({
         ok: true,
         prefs: preferences,
         history,
         selectedPoi: {
           id: 'node/42',
           name: 'Cafe Ada',
           geometry: {type: 'Point', coordinates: [-92.8512, 44.7434]},
         },
       });
       expect(resolveActorId).toHaveBeenCalledWith('user-1');
       expect(geoCore.getMapPreferences).toHaveBeenCalledWith('geo-actor-1');
       expect(geoCore.getMapHistory).toHaveBeenCalledWith('geo-actor-1', 25);
       expect(enrichSelectedPoi).toHaveBeenCalledWith({
         id: '42',
         includeGeometry: true,
       });
     });

  it('returns the existing cached anonymous viewport response', async () => {
    const findPreferencePois = vi.fn().mockResolvedValue({
      pois: [{id: 'poi-1', name: 'Cafe Ada'}],
      count: 1,
      fetchedAt: '2026-08-22T11:00:00.000Z',
      expiresAt: '2026-08-22T13:00:00.000Z',
    });
    const resolveGlobalActorId = vi.fn().mockResolvedValue('global-geo');
    const kit = createGeoMapBootstrapKit({
      geoCore: {} as GeoCoreKit,
      geoCoreHost: {findPreferencePois},
      resolveActorId: vi.fn(),
      resolveGlobalActorId,
      enrichSelectedPoi: vi.fn(),
      now: () => new Date('2026-08-22T12:00:00.000Z'),
    });

    const result = await kit.build({
      userId: null,
      includeMap: true,
      includePrefs: false,
      includeHistory: false,
      historyLimit: 80,
      viewport: {
        center: {lat: 44.7434, lng: -92.8512},
        radiusM: 1800,
        kinds: 'cafe,restaurant',
      },
    });

    expect(result).toEqual({
      ok: true,
      map: {
        stylePath: '/maps/hybrid/style.json',
        vectorTilePath: '/tiles/v3/{z}/{x}/{y}.pbf',
        terrainTilePath: '/tiles/terrain-rgb-v2/{z}/{x}/{y}.png',
      },
      viewportPois: {
        signature: '44.74340:-92.85120:1800:cafe,restaurant',
        kinds: ['cafe', 'restaurant'],
        radiusM: 1800,
        count: 1,
        cached: true,
        expiresAt: new Date('2026-08-22T13:00:00.000Z'),
        pois: [{id: 'poi-1', name: 'Cafe Ada'}],
      },
    });
    expect(resolveGlobalActorId).toHaveBeenCalledOnce();
    expect(findPreferencePois).toHaveBeenCalledWith(
        'global-geo', '44.74340:-92.85120:1800:cafe,restaurant');
  });
});