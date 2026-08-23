import {Prisma, type PrismaClient} from '@prisma/client';
import {type FastifyInstance, type RouteShorthandOptions} from 'fastify';
import * as z from 'zod';

import {ensureGeoActor} from '../actors/Geo/Geo';
import {geoPoiSignature} from '../kits/geo-core';
import {createPrismaGeoCoreKit} from '../kits/geo-core/prisma-adapter';
import {routeSignature} from '../lib/geo-signature';
import {GeoResourcePost} from '../lib/openapi/route-kinds';
import {AuthHeaderSchema, IntegerLikeSchema, makeBodySchema, makeOk, makeParamsSchema, makeQuerySchema, makeResponses, OkResponseSchema, OptionalAuthHeaderSchema, withExamples, zLat, zLon, zRadius, zZoom} from '../lib/schemas/openapi';
import {logGeoStatus} from '../services/geo-cache';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const GEO_POI_RATE_LIMIT_MAX = Number(process.env.GEO_POI_RATE_LIMIT_MAX ?? 30);
const GEO_POI_RATE_LIMIT_WINDOW =
    process.env.GEO_POI_RATE_LIMIT_WINDOW || '1 minute';

type RateLimitedRouteShorthandOptions = RouteShorthandOptions&{
  rateLimit?: {max: number; timeWindow: string};
};

export function registerGeoRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  const geoCore = createPrismaGeoCoreKit(prisma);
  const geoAuthHeader = makeParamsSchema(AuthHeaderSchema, 'AuthHeader');
  const geoOptionalAuthHeader =
      makeParamsSchema(OptionalAuthHeaderSchema, 'OptionalAuthHeader');

  const geoPoisQuerySchema = makeQuerySchema(
      z.object({
         lat: zLat.describe('Center latitude'),
         lng: zLon.describe('Center longitude'),
         radiusM: zRadius.optional().describe('Search radius in meters'),
         kinds: z.string().min(1).optional().describe(
             'Comma-separated OSM amenity kinds (e.g. bank,atm,cafe)'),
       }).passthrough(),
      'GeoPoisQuery',
      [{lat: 37.78, lng: -122.42, radiusM: 1800, kinds: 'bank,atm,cafe'}]);

  const geoPrefsBodyZod =
      z.object({
         center: z.object({
                    lat: zLat.optional(),
                    lng: zLon.optional(),
                  }).optional(),
         view: z.object({
                  zoom: z.number().optional(),
                  bearing: z.number().optional(),
                  pitch: z.number().optional(),
                }).optional(),
         poi: z.object({
                 signature: z.string().min(1).optional(),
                 kinds: z.array(z.string().min(1)).optional(),
                 radiusM: zRadius.optional(),
                 count: z.number().int().optional(),
                 expiresAtMs: z.number().int().optional(),
                 pois: z.array(z.unknown()).optional(),
               }).optional(),
       }).passthrough();
  const geoStatusBodyZod =
      z.object({
         status: z.string().min(1).describe('Status label'),
         poiStatus: z.string().min(1).optional().describe('POI fetch status'),
         centerLat: zLat.optional(),
         centerLng: zLon.optional(),
         error: z.string().min(1).optional(),
       }).passthrough();
  const geoPrefsBodySchema = makeBodySchema(
      geoPrefsBodyZod, 'GeoPrefsBody', [{
        center: {lat: 37.78, lng: -122.42},
        view: {zoom: 12, bearing: 0, pitch: 0},
        poi: {signature: '37.78:-122.42:1800:bank,atm', radiusM: 1800},
      }]);
  const geoStatusBodySchema = makeBodySchema(
      geoStatusBodyZod, 'GeoStatusBody',
      [{status: 'loading', centerLat: 37.78, centerLng: -122.42}]);

  const geoRouteResponseSchema = z.object({
                                    distanceKm: z.number(),
                                    durationMinutes: z.number().int(),
                                    geojson: z.unknown(),
                                    cached: z.boolean(),
                                  }).passthrough();
  const geoHistoryEntrySchema =
      z.object({
         id: z.string().min(1),
         signature: z.string().min(1),
         zoomBand: z.number().int(),
         bbox: z.object({
                  minLat: z.number(),
                  minLng: z.number(),
                  maxLat: z.number(),
                  maxLng: z.number(),
                }).strict(),
         lastPoiIds: z.array(z.string()).optional(),
         lastPoiCount: z.number().int().optional(),
         pois: z.array(z.object({
                          id: z.string().min(1),
                          name: z.string().min(1),
                          category: z.string().nullable().optional(),
                          lat: z.number(),
                          lng: z.number(),
                        }).passthrough())
                   .optional(),
         firstViewedAt: z.string().min(1),
         lastViewedAt: z.string().min(1),
         viewCount: z.number().int(),
         staleAfter: z.string().min(1).nullable().optional(),
       }).passthrough();
  const geoPrefsResponseSchema =
      z.object({
         view: z.object({
                  center: z.object({lat: zLat, lng: zLon}).optional(),
                  zoom: z.number().nullable(),
                  bearing: z.number().nullable(),
                  pitch: z.number().nullable(),
                }).nullable(),
         poi: z.object({
                 signature: z.string().min(1),
                 kinds: z.array(z.string().min(1)),
                 radiusM: z.number().nullable(),
                 count: z.number().nullable(),
                 cached: z.boolean(),
                 fetchedAt: z.string().min(1).nullable(),
                 pois: z.unknown().optional(),
               }).nullable(),
       }).passthrough();
  const geoRouteQuerySchema = makeQuerySchema(
      z.object({
         originLat: zLat.describe('Origin latitude'),
         originLng: zLon.describe('Origin longitude'),
         destinationLat: zLat.describe('Destination latitude'),
         destinationLng: zLat.describe('Destination longitude'),
       }).strict(),
      'GeoRouteQuery');
  const geoHistoryQuerySchema = makeQuerySchema(
      z.object({limit: IntegerLikeSchema.optional()}).passthrough(),
      'GeoHistoryQuery');
  const requireUser = async (request: any, reply: any) => {
    try {
      await request.jwtVerify();
      return (request.user as {sub?: string})?.sub ?? null;
    } catch {
      reply.status(401).send({error: 'Unauthorized'});
      return null;
    }
  };

  const handleGeoRoute = async (request: any, reply: any) => {
    const userId = await requireUser(request, reply);
    if (!userId) return;
    const actor = await ensureGeoActor(prisma, userId);
    const actorId = actor.id;
    const query = request.query as any;
    const originLat = Number(query.originLat);
    const originLng = Number(query.originLng);
    const destinationLat = Number(query.destinationLat);
    const destinationLng = Number(query.destinationLng);
    if (![originLat, originLng, destinationLat, destinationLng].every(
            (n) => Number.isFinite(n))) {
      return reply.status(400).send({
        error:
            'originLat, originLng, destinationLat, destinationLng are required'
      });
    }

    const signature = routeSignature(
        {lat: originLat, lng: originLng},
        {lat: destinationLat, lng: destinationLng});
    try {
      const result = await geoCore.resolveRoute({
        actorId,
        origin: {lat: originLat, lng: originLng},
        destination: {lat: destinationLat, lng: destinationLng},
      });
      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: result.cached ? 'geo.route.cached' : 'geo.route.fetched',
        source: 'api',
        payload: {signature},
      });
      return result;
    } catch (err) {
      return reply.status(502).send(
          {error: err instanceof Error ? err.message : 'OSRM unavailable'});
    }
  };

  const poiRouteOptions: RateLimitedRouteShorthandOptions = {
    rateLimit: {
      max: GEO_POI_RATE_LIMIT_MAX,
      timeWindow: GEO_POI_RATE_LIMIT_WINDOW,
    },
    schema: {
      summary: 'Fetch Geo POIs with cached rate limiting',
      description: 'Fetches POIs from Overpass with caching and rate limiting.',
      operationId: 'geo_poi_list',
      tags: ['geo'],
      headers: geoOptionalAuthHeader,
      querystring: geoPoisQuerySchema,
      response:
          makeResponses(
              {
                200: withExamples(
                    makeOk(
                        z.object({
                           pois: z.array(z.unknown()),
                           count: z.number().int(),
                           cached: z.boolean(),
                           stale: z.boolean().optional(),
                         }).strict(),
                        'GeoPoisResponse'),
                    [{pois: [{id: 'poi_01'}], count: 1, cached: true}]),
              },
              {includeStandardErrors: true}),
    },
  };
  server.get(
      '/geo/pois',
      poiRouteOptions,
      async (request, reply) => {
        const query = request.query as any;
        const lat = Number(query.lat);
        const lng = Number(query.lng);
        const radiusM = Number(query.radiusM ?? 1800);
        const kinds =
            typeof query.kinds === 'string' && query.kinds.trim().length > 0 ?
            query.kinds.split(',') :
            [
              'bank', 'atm', 'restaurant', 'cafe', 'fuel', 'bus_station',
              'train_station'
            ];

        let userId: string|null = null;
        let actorId: string|null = null;
        const hasAuth = typeof request.headers.authorization === 'string' &&
            request.headers.authorization.trim().length > 0;
        if (hasAuth) {
          try {
            await request.jwtVerify();
            userId = (request.user as {sub?: string})?.sub ?? null;
            if (userId) {
              const actor = await ensureGeoActor(prisma, userId);
              actorId = actor.id;
            }
          } catch (err) {
            request.log.debug({err}, 'geo pois optional auth failed');
          }
        }

        if (![lat, lng, radiusM].every((n) => Number.isFinite(n))) {
          return reply.status(400).send(
              {error: 'lat, lng, radiusM are required'});
        }

        const signature = geoPoiSignature({lat, lng}, radiusM, kinds);
        try {
          const result = await geoCore.findPois({
            actorId,
            userId,
            center: {lat, lng},
            radiusM,
            kinds,
          });
          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: result.stale ? 'geo.poi.stale' :
                result.cached ? 'geo.poi.cached' :
                                'geo.poi.fetched',
            source: 'api',
            payload: {signature, count: result.count},
          });
          return result;
        } catch (err) {
          request.log.warn({err, signature}, 'geo pois fetch failed');
          return reply.status(502).send({
            error: err instanceof Error ? err.message : 'Overpass unavailable'
          });
        }
      },
  );

  const handleGeoHistory = async (request: any, reply: any) => {
    const userId = await requireUser(request, reply);
    if (!userId) return;
    const actor = await ensureGeoActor(prisma, userId);
    const actorId = actor.id;
    const limitParam = Number((request.query as any)?.limit ?? 40);
    const take = Number.isFinite(limitParam) ?
        Math.min(Math.max(1, Math.trunc(limitParam)), 200) :
        40;

    return await geoCore.getMapHistory(actorId, take);
  };

  const handleGeoPrefsGet = async (request: any, reply: any) => {
    const userId = await requireUser(request, reply);
    if (!userId) return;
    const actor = await ensureGeoActor(prisma, userId);
    const actorId = actor.id;
    return await geoCore.getMapPreferences(actorId);
  };

  const handleGeoPrefsPost = async (request: any, reply: any) => {
    const userId = await requireUser(request, reply);
    if (!userId) return;
    const actor = await ensureGeoActor(prisma, userId);
    const actorId = actor.id;
    const body = request.body as {
      center?: {lat?: number; lng?: number};
      view?: {zoom?: number; bearing?: number; pitch?: number};
      poi?: {
        signature?: string;
        kinds?: string[];
        radiusM?: number;
        count?: number;
        expiresAtMs?: number;
        pois?: any[]
      };
    };

    const centerLat = body.center?.lat;
    const centerLng = body.center?.lng;
    if (centerLat !== undefined && !Number.isFinite(centerLat))
      return reply.status(400).send({error: 'center.lat must be a number'});
    if (centerLng !== undefined && !Number.isFinite(centerLng))
      return reply.status(400).send({error: 'center.lng must be a number'});

    const zoom = body.view?.zoom;
    const bearing = body.view?.bearing;
    const pitch = body.view?.pitch;
    if (zoom !== undefined && !Number.isFinite(zoom))
      return reply.status(400).send({error: 'view.zoom must be a number'});
    if (bearing !== undefined && !Number.isFinite(bearing))
      return reply.status(400).send({error: 'view.bearing must be a number'});
    if (pitch !== undefined && !Number.isFinite(pitch))
      return reply.status(400).send({error: 'view.pitch must be a number'});

    const poiSig = body.poi?.signature;
    await geoCore.updateMapPreferences(userId, actorId, {
      center: centerLat !== undefined && centerLng !== undefined ?
          {lat: centerLat, lng: centerLng} :
          undefined,
      view: body.view ?? {},
      poi: body.poi,
    });

    await recordTelemetry(request, {
      ...buildTelemetryBase(request),
      eventType: 'geo.prefs.update',
      source: 'api',
      payload: {
        hasCenter: centerLat !== undefined && centerLng !== undefined,
        hasPoi: Boolean(poiSig),
        hasView:
            zoom !== undefined || bearing !== undefined || pitch !== undefined,
      },
    });
    return {ok: true};
  };

  // Client geo/POI status logging for telemetry/loading bars
  const handleGeoStatus = async (request: any, reply: any) => {
    const body = request.body as {
      status?: string;
      poiStatus?: string;
      centerLat?: number;
      centerLng?: number;
      error?: string;
    };

    const status = body?.status?.trim();
    if (!status) return reply.status(400).send({error: 'status is required'});

    const centerLat =
        typeof body.centerLat === 'number' && Number.isFinite(body.centerLat) ?
        body.centerLat :
        null;
    const centerLng =
        typeof body.centerLng === 'number' && Number.isFinite(body.centerLng) ?
        body.centerLng :
        null;

    let userId: string|null = null;
    let actorId: string|null = null;
    const hasAuth = typeof request.headers.authorization === 'string' &&
        request.headers.authorization.length > 0;
    if (hasAuth) {
      try {
        await request.jwtVerify();
        userId = (request.user as {sub?: string})?.sub ?? null;
        if (userId) {
          const actor = await ensureGeoActor(prisma, userId);
          actorId = actor.id;
        }
      } catch (err) {
        // ignore auth failures; status logging is allowed unauthenticated
      }
    }

    try {
      await logGeoStatus(prisma, actorId, {
        userId,
        status,
        poiStatus: body?.poiStatus?.trim() || null,
        centerLat: centerLat !== null ?
            new Prisma.Decimal(centerLat.toFixed(6)) :
            null,
        centerLng: centerLng !== null ?
            new Prisma.Decimal(centerLng.toFixed(6)) :
            null,
        error: body?.error?.slice(0, 512) || null,
        userAgent:
            request.headers['user-agent']?.toString().slice(0, 512) ?? null,
      });

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: 'geo.status',
        source: 'api',
        payload: {
          status,
          poiStatus: body?.poiStatus,
          hasCenter: Boolean(centerLat !== null && centerLng !== null),
        },
      });

      return {ok: true};
    } catch (err) {
      request.log.error({err}, 'geo status log failed');
      return reply.status(500).send({error: 'unable to log status'});
    }
  };

  server.get(
      '/geo/route',
      {
        schema: {
          summary: 'Fetch geo route',
          description:
              'Fetches a cached or fresh route between two locations using OSRM.',
          operationId: 'geo_route_get',
          tags: ['geo'],
          headers: geoAuthHeader,
          security: [{bearerAuth: []}],
          querystring: geoRouteQuerySchema,
          response: makeResponses(
              {
                200: withExamples(
                    makeOk(geoRouteResponseSchema, 'GeoRouteResponse'), [{
                      distanceKm: 12.4,
                      durationMinutes: 18,
                      geojson: {},
                      cached: true,
                    }]),
              },
              {includeStandardErrors: true}),
        },
      },
      handleGeoRoute,
  );

  server.get(
      '/geo/history',
      {
        schema: {
          summary: 'Fetch geo history',
          description: 'Returns the user\'s saved map view history.',
          operationId: 'geo_history_get',
          tags: ['geo'],
          headers: geoAuthHeader,
          security: [{bearerAuth: []}],
          querystring: geoHistoryQuerySchema,
          response: makeResponses(
              {
                200: withExamples(
                    makeOk(
                        z.array(geoHistoryEntrySchema), 'GeoHistoryResponse'),
                    [{
                      id: 1,
                      signature: 'test:history',
                      zoomBand: 15,
                      bbox: {
                        minLat: 0,
                        minLng: 0,
                        maxLat: 1,
                        maxLng: 1,
                      },
                      lastPoiIds: [],
                      firstViewedAt: '2026-02-02T00:00:00Z',
                      lastViewedAt: '2026-02-02T00:00:00Z',
                      viewCount: 1,
                    }]),
              },
              {includeStandardErrors: true}),
        },
      },
      handleGeoHistory,
  );

  server.get(
      '/geo/prefs',
      {
        schema: {
          summary: 'Fetch geo preferences',
          description:
              'Returns the most recently persisted map view and POI search.',
          operationId: 'geo_prefs_get',
          tags: ['geo'],
          headers: geoAuthHeader,
          security: [{bearerAuth: []}],
          response: makeResponses(
              {
                200: withExamples(
                    makeOk(geoPrefsResponseSchema, 'GeoPrefsResponse'), [{
                      view: {
                        center: {lat: 37.78, lng: -122.42},
                        zoom: 12,
                        bearing: 0,
                        pitch: 0,
                      },
                      poi: {
                        signature: '37.78:-122.42:1800:bank',
                        kinds: ['bank'],
                        radiusM: 1800,
                        count: 1,
                        cached: true,
                        fetchedAt: '2026-02-02T00:00:00Z',
                        pois: [],
                      },
                    }]),
              },
              {includeStandardErrors: true}),
        },
      },
      handleGeoPrefsGet,
  );

  server.post(
      '/geo/:resource',
      {
        schema: {
          summary: 'Geo resource update',
          description:
              'Updates geo preferences or posts status. Prefs require bearer auth; status can be anonymous.',
          operationId: 'geo_resource_post',
          tags: ['geo'],
          headers: geoOptionalAuthHeader,
          security: [{bearerAuth: []}],
          params: makeParamsSchema(
              z.object({
                 resource: GeoResourcePost.describe('Geo resource type'),
               }).strict(),
              'GeoResourcePostParams'),
          body: makeBodySchema(
              z.union([geoPrefsBodyZod, geoStatusBodyZod]), 'GeoResourceBody'),
          response: makeResponses(
              {
                200: withExamples(
                    makeOk(OkResponseSchema, 'GeoOkResponse'), [{ok: true}]),
              },
              {includeStandardErrors: true}),
        },
      },
      async (request, reply) => {
        const {resource} = request.params as {resource?: string};
        if (resource === 'prefs') return handleGeoPrefsPost(request, reply);
        if (resource === 'status') return handleGeoStatus(request, reply);
        return reply.status(404).send({error: 'Resource not found'});
      },
  );
}
