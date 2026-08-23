import '../../test/vitest-setup';

import {describe, expect, it, vi} from 'vitest';

import {createFreightRoutingKit} from './index';

describe('Freight routing Kit', () => {
  it('plans a load through Geo core and caches normalized directions', async () => {
    const createdAt = new Date('2026-08-22T00:00:00.000Z');
    const load = {
      id: 'load-1',
      title: 'Produce run',
      originName: 'Farm',
      originLat: 1,
      originLng: 2,
      destinationName: 'Market',
      destinationLat: 3,
      destinationLng: 4,
      distanceKm: 10,
      durationMinutes: 10,
      cost: 20,
      status: 'planning' as const,
      routeGeoJson: {type: 'LineString'},
      createdAt,
      updatedAt: createdAt,
    };
    const geoCore = {
      resolveRoute: vi.fn().mockResolvedValue({
        distanceKm: 10,
        durationMinutes: 10,
        geojson: {type: 'LineString'},
        cached: false,
      }),
    };
    const host = {
      listLoads: vi.fn(),
      createLoad: vi.fn().mockResolvedValue(load),
      findLoad: vi.fn(),
      completeLoadAtomically: vi.fn(),
      resolveGeoActorId: vi.fn().mockResolvedValue('geo-actor-1'),
      readDirection: vi.fn().mockResolvedValue(null),
      writeDirection: vi.fn().mockResolvedValue(undefined),
      fetchDirections: vi.fn().mockResolvedValue({
        distance: 10_000,
        duration: 600,
        geometry: {type: 'LineString'},
        legs: [{steps: [{
          distance: 100,
          duration: 30.4,
          name: 'Main Street',
          maneuver: {type: 'turn', modifier: 'right', location: [2, 1]},
        }]}],
      }),
      now: vi.fn(() => createdAt),
    };
    const kit = createFreightRoutingKit({geoCore: geoCore as any, host});

    await expect(kit.planLoad({
      userId: 'user-1',
      title: ' Produce run ',
      originName: ' Farm ',
      origin: {lat: 1, lng: 2},
      destinationName: ' Market ',
      destination: {lat: 3, lng: 4},
      ratePerKm: 2,
    })).resolves.toEqual(load);

    expect(geoCore.resolveRoute).toHaveBeenCalledWith({
      actorId: 'geo-actor-1',
      origin: {lat: 1, lng: 2},
      destination: {lat: 3, lng: 4},
    });
    expect(host.createLoad).toHaveBeenCalledWith(expect.objectContaining({
      userId: 'user-1',
      title: 'Produce run',
      originName: 'Farm',
      destinationName: 'Market',
      distanceKm: 10,
      durationMinutes: 10,
      cost: '20.00',
    }));
    expect(host.writeDirection).toHaveBeenCalledWith(
        'geo-actor-1', expect.objectContaining({
          provider: 'osrm',
          distanceMeters: 10_000,
          durationSeconds: 600,
          stops: expect.any(Array),
          segments: [expect.objectContaining({
            instruction: 'right turn onto Main Street',
            durationSeconds: 30,
          })],
        }));
  });

  it('returns cached directions without fetching OSRM', async () => {
    const direction = {
      signature: 'route-1',
      userId: 'user-1',
      provider: 'osrm',
      profile: 'driving',
      geometry: null,
      originLat: 1,
      originLng: 2,
      destinationLat: 3,
      destinationLng: 4,
      distanceMeters: 1000,
      durationSeconds: 60,
      route: {},
      stops: [],
      segments: [],
    };
    const host = {
      listLoads: vi.fn(),
      createLoad: vi.fn(),
      findLoad: vi.fn().mockResolvedValue({
        id: 'load-1',
        originLat: 1,
        originLng: 2,
        destinationLat: 3,
        destinationLng: 4,
        originName: 'Farm',
        destinationName: 'Market',
      }),
      completeLoadAtomically: vi.fn(),
      resolveGeoActorId: vi.fn().mockResolvedValue('geo-actor-1'),
      readDirection: vi.fn().mockResolvedValue(direction),
      writeDirection: vi.fn(),
      fetchDirections: vi.fn(),
      now: vi.fn(),
    };
    const kit = createFreightRoutingKit({
      geoCore: {resolveRoute: vi.fn()} as any,
      host: host as any,
    });

    await expect(kit.getDirections('user-1', 'load-1')).resolves.toEqual({
      signature: 'route-1',
      provider: 'osrm',
      profile: 'driving',
      geometry: null,
      originLat: 1,
      originLng: 2,
      destinationLat: 3,
      destinationLng: 4,
      distanceMeters: 1000,
      durationSeconds: 60,
      stops: [],
      segments: [],
    });
    expect(host.fetchDirections).not.toHaveBeenCalled();
    expect(host.writeDirection).not.toHaveBeenCalled();
  });

  it('completes a load through one atomic host operation', async () => {
    const load = {id: 'load-1', status: 'planning', cost: 20};
    const completed = {...load, status: 'completed'};
    const host = {
      findLoad: vi.fn().mockResolvedValue(load),
      completeLoadAtomically: vi.fn().mockResolvedValue(completed),
    };
    const kit = createFreightRoutingKit({
      geoCore: {resolveRoute: vi.fn()} as any,
      host: host as any,
    });

    await expect(kit.completeLoad('user-1', 'load-1'))
        .resolves.toEqual(completed);
    expect(host.completeLoadAtomically).toHaveBeenCalledOnce();
    expect(host.completeLoadAtomically).toHaveBeenCalledWith('user-1', load);
  });

  it('rejects an already completed load before settlement', async () => {
    const host = {
      findLoad: vi.fn().mockResolvedValue(
          {id: 'load-1', status: 'completed'}),
      completeLoadAtomically: vi.fn(),
    };
    const kit = createFreightRoutingKit({
      geoCore: {resolveRoute: vi.fn()} as any,
      host: host as any,
    });

    await expect(kit.completeLoad('user-1', 'load-1'))
        .rejects.toThrow('Load already completed');
    expect(host.completeLoadAtomically).not.toHaveBeenCalled();
  });
});