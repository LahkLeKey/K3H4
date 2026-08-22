import '../../test/vitest-setup';

import Fastify from 'fastify';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {createGeoMapBootstrapKit} from '../../kits/geo-map-bootstrap';
import {registerFrontendRoutes} from '../frontend';
import {type RecordTelemetryFn} from '../types';

vi.mock('../../kits/geo-map-bootstrap', () => ({
  createGeoMapBootstrapKit: vi.fn(),
}));

const build = vi.fn();
const recordTelemetry = vi.fn<RecordTelemetryFn>();

describe('frontend map bootstrap route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(createGeoMapBootstrapKit).mockReturnValue({build});
  });

  it('adapts authenticated HTTP input to the Kit and records telemetry',
     async () => {
       build.mockResolvedValue({
         ok: true,
         prefs: {
           view: {
             center: {lat: 44.7434, lng: -92.8512},
             zoom: 12,
             bearing: 0,
             pitch: 15,
           },
           poi: null,
         },
         history: [{id: 'history-1', pois: []}],
         selectedPoi: {id: 'node/42', name: 'Cafe Ada'},
       });
       const server = Fastify();
       server.addHook('onRequest', async (request) => {
         request.user = {sub: 'user-1', email: 'user@example.com'};
       });
       registerFrontendRoutes(
           server as any, {} as any, recordTelemetry as any);

       const response = await server.inject({
         method: 'POST',
         url: '/frontend/map/actions/bootstrap',
         payload: {
           includeMap: false,
           historyLimit: 25,
           selectedPoi: {id: '42', includeGeometry: true},
         },
       });

       expect(response.statusCode).toBe(200);
       expect(response.json()).toEqual({
         ok: true,
         prefs: {
           view: {
             center: {lat: 44.7434, lng: -92.8512},
             zoom: 12,
             bearing: 0,
             pitch: 15,
           },
           poi: null,
         },
         history: [{id: 'history-1', pois: []}],
         selectedPoi: {id: 'node/42', name: 'Cafe Ada'},
       });
       expect(build).toHaveBeenCalledWith({
         userId: 'user-1',
         includePrefs: true,
         includeHistory: true,
         includeMap: false,
         historyLimit: 25,
         viewport: undefined,
         selectedPoi: {id: '42', includeGeometry: true},
       });
       expect(recordTelemetry).toHaveBeenCalledWith(
           expect.anything(), expect.objectContaining({
             eventType: 'frontend.map.bootstrap',
             payload: expect.objectContaining({
               selectedPoiRequested: true,
             }),
           }));
     });
});