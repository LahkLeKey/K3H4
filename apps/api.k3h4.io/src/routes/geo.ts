import {Prisma, type PrismaClient} from '@prisma/client';
import {type FastifyInstance, type RouteShorthandOptions} from 'fastify';
import * as z from 'zod';

import {ensureGeoActor} from '../actors/Geo/Geo';
import {ACTOR_TYPES} from '../lib/actor-entity-constants';
import {clampDecimals, routeSignature} from '../lib/geo-signature';
import {GeoResourcePost} from '../lib/openapi/route-kinds';
import {enqueueOverpass} from '../lib/overpass-queue';
import {AuthHeaderSchema, IntegerLikeSchema, makeBodySchema, makeOk, makeParamsSchema, makeQuerySchema, makeResponses, OkResponseSchema, OptionalAuthHeaderSchema, withExamples, zLat, zLon, zRadius, zZoom} from '../lib/schemas/openapi';
import {logGeoStatus, readGeoPoiCache, readGeoPoiCacheStale, readGeoQueryCache, readGeoRouteCache, readGeoViewHistory, writeGeoPoiCache, writeGeoQueryCache, writeGeoRouteCache,} from '../services/geo-cache';
import {readUserPreferencesByActor, updateUserPreferencesForUser, type UserPreferencePatch} from '../services/user-preferences';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const OSRM_BASE = process.env.OSRM_URL || 'https://router.project-osrm.org';
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const ROUTE_TTL_MS = 1000 * 60 * 60 * 6;  // 6 hours
const POI_TTL_MS = 1000 * 60 * 60 * 12;   // 12 hours
const GEO_POI_RATE_LIMIT_MAX = Number(process.env.GEO_POI_RATE_LIMIT_MAX ?? 30);
const GEO_POI_RATE_LIMIT_WINDOW =
    process.env.GEO_POI_RATE_LIMIT_WINDOW || '1 minute';

type RateLimitedRouteShorthandOptions = RouteShorthandOptions&{
  rateLimit?: {max: number; timeWindow: string};
};

const poiSignature =
    (center: {lat: number; lng: number}, radiusM: number, kinds: string[]) => {
      const sortedKinds = [...kinds].sort().join(',');
      return [
        clampDecimals(center.lat), clampDecimals(center.lng), radiusM,
        sortedKinds
      ].join(':');
    };

async function fetchOsrmRoute(
    origin: {lat: number; lng: number}, dest: {lat: number; lng: number}) {
  const coords = `${origin.lng},${origin.lat};${dest.lng},${dest.lat}`;
  const res = await fetch(`${OSRM_BASE}/route/v1/driving/${
      coords}?overview=full&geometries=geojson`);
  if (!res.ok) throw new Error(`OSRM ${res.status}`);
  const data = (await res.json()) as
      {routes?: Array<{distance?: number; duration?: number; geometry?: any}>};
  const route = data.routes?.[0];
  if (!route?.distance || !route?.duration)
    throw new Error('Route unavailable');
  return {
    distanceKm: route.distance / 1000,
    durationMinutes: Math.round(route.duration / 60),
    geojson: route.geometry,
  };
}

async function fetchOverpass(
    center: {lat: number; lng: number}, radiusM: number, kinds: string[],
    signature: string) {
  const sortedKinds = [...kinds].sort();
  const filters = sortedKinds
                      .map(
                          (k) => `node[amenity=${k}](around:${radiusM},${
                              center.lat},${center.lng});`)
                      .join('\n');
  const query = `[out:json][timeout:10];(${filters});out center 50;`;
  const body = new URLSearchParams({data: query}).toString();
  const data = await enqueueOverpass(OVERPASS_URL, body, signature);
  return (data?.elements ?? []) as any[];
}

export function registerGeoRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
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
  const persistUserGeoPrefs = async (userId: string|null, prefs: {
    center?: {lat: number; lng: number}|null;
    view?:
        {zoom?: number | null; bearing?: number | null; pitch?: number | null};
    poi?: {
      signature: string; kinds: string[]; radiusM: number; count: number;
      fetchedAt: Date
    };
  }) => {
    if (!userId) return;
    const geoPatch: NonNullable<UserPreferencePatch['geo']> = {};
    let hasGeoPatch = false;

    if (prefs.center !== undefined) {
      geoPatch.center = prefs.center;
      hasGeoPatch = true;
    }

    if (prefs.view !== undefined) {
      const viewPatch: Record<string, number|null> = {};
      if (prefs.view.zoom !== undefined) viewPatch.zoom = prefs.view.zoom;
      if (prefs.view.bearing !== undefined)
        viewPatch.bearing = prefs.view.bearing;
      if (prefs.view.pitch !== undefined) viewPatch.pitch = prefs.view.pitch;
      if (Object.keys(viewPatch).length) {
        geoPatch.view =
            viewPatch as NonNullable<UserPreferencePatch['geo']>['view'];
        hasGeoPatch = true;
      }
    }

    if (prefs.poi !== undefined) {
      geoPatch.poi = {
        signature: prefs.poi.signature,
        kinds: prefs.poi.kinds,
        radiusM: prefs.poi.radiusM,
        count: prefs.poi.count,
        fetchedAt: prefs.poi.fetchedAt.toISOString(),
      };
      hasGeoPatch = true;
    }

    if (!hasGeoPatch) return;
    await updateUserPreferencesForUser(prisma, userId, {geo: geoPatch});
  };

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
    const cached = await readGeoRouteCache(prisma, actorId, signature);
    if (cached) {
      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: 'geo.route.cached',
        source: 'api',
        payload: {signature},
      });
      return {
        distanceKm: Number(cached.distanceKm),
        durationMinutes: cached.durationMinutes,
        geojson: cached.geojson,
        cached: true,
      };
    }

    try {
      const osrm = await fetchOsrmRoute(
          {lat: originLat, lng: originLng},
          {lat: destinationLat, lng: destinationLng});
      await writeGeoRouteCache(prisma, actorId, signature, {
        signature,
        distanceKm: osrm.distanceKm,
        durationMinutes: osrm.durationMinutes,
        geojson: osrm.geojson,
        fetchedAt: new Date().toISOString(),
      });

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: 'geo.route.fetched',
        source: 'api',
        payload: {signature},
      });
      return {...osrm, cached: false};
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

        const signature = poiSignature({lat, lng}, radiusM, kinds);
        const cached =
            actorId ? await readGeoPoiCache(prisma, actorId, signature) : null;
        if (cached) {
          const expiresAt = cached.expiresAt ?
              new Date(cached.expiresAt) :
              new Date(Date.now() + POI_TTL_MS);
          if (actorId) {
            await writeGeoQueryCache(prisma, actorId, {
              signature,
              type: 'poi',
              params: {lat, lng, radiusM, kinds},
              payload: {pois: cached.pois},
              count: cached.count,
              fetchedAt: cached.fetchedAt ?? new Date().toISOString(),
              expiresAt: expiresAt.toISOString(),
            });
          }
          await persistUserGeoPrefs(userId, {
            center: {lat, lng},
            poi: {
              signature,
              kinds,
              radiusM,
              count: cached.count,
              fetchedAt: expiresAt
            },
          });
          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'geo.poi.cached',
            source: 'api',
            payload: {signature, count: cached.count},
          });
          return {pois: cached.pois, count: cached.count, cached: true};
        }

        try {
          const elements =
              await fetchOverpass({lat, lng}, radiusM, kinds, signature);
          const pois = elements.map(
              (feat) => ({
                id: `${feat.id}`,
                name: feat.tags?.name ?? feat.tags?.amenity ?? 'poi',
                kind: feat.tags?.amenity,
                lat: feat.lat,
                lng: feat.lon,
              }));

          const expiresAt = new Date(Date.now() + POI_TTL_MS);
          if (actorId) {
            await writeGeoPoiCache(prisma, actorId, {
              signature,
              center: {lat, lng},
              radiusM,
              kinds,
              pois,
              count: pois.length,
              fetchedAt: new Date().toISOString(),
              expiresAt: expiresAt.toISOString(),
            });

            await writeGeoQueryCache(prisma, actorId, {
              signature,
              type: 'poi',
              params: {lat, lng, radiusM, kinds},
              payload: {pois},
              count: pois.length,
              fetchedAt: new Date().toISOString(),
              expiresAt: expiresAt.toISOString(),
            });
          }

          await persistUserGeoPrefs(userId, {
            center: {lat, lng},
            poi: {
              signature,
              kinds,
              radiusM,
              count: pois.length,
              fetchedAt: expiresAt
            },
          });

          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'geo.poi.fetched',
            source: 'api',
            payload: {signature, count: pois.length},
          });
          return {pois, count: pois.length, cached: false};
        } catch (err) {
          // Fall back to the most recent cache (even if expired) so the UI
          // degrades gracefully.
          const stale = actorId ?
              await readGeoPoiCacheStale(prisma, actorId, signature) :
              null;
          if (stale) {
            await recordTelemetry(request, {
              ...buildTelemetryBase(request),
              eventType: 'geo.poi.stale',
              source: 'api',
              payload: {signature, count: stale.count ?? 0},
            });
            return {
              pois: stale.pois,
              count: stale.count,
              cached: true,
              stale: true
            };
          }

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

    const rows = await readGeoViewHistory(prisma, actorId, take);

    const allPoiIds = Array.from(new Set(rows.flatMap(
        (r) =>
            (Array.isArray(r.lastPoiIds) ? (r.lastPoiIds as string[]) : []))));
    const pois = allPoiIds.length ? await prisma.actor.findMany({
      where: {
        id: {in : allPoiIds},
        type: ACTOR_TYPES.POINT_OF_INTEREST,
      },
      select: {
        id: true,
        label: true,
        category: true,
        metadata: true,
      },
    }) :
                                    [];
    const poiMap = new Map(pois.map((p) => [p.id, p]));

    return rows.map((row) => {
      const bbox = row.bbox ?? {minLat: 0, minLng: 0, maxLat: 0, maxLng: 0};
      return {
        id: row.id,
        signature: row.signature,
        zoomBand: row.zoomBand,
        bbox: {
          minLat: Number(bbox.minLat),
          minLng: Number(bbox.minLng),
          maxLat: Number(bbox.maxLat),
          maxLng: Number(bbox.maxLng),
        },
        lastPoiIds: row.lastPoiIds ?? [],
        lastPoiCount: row.lastPoiCount ?? 0,
        pois:
            (Array.isArray(row.lastPoiIds) ? (row.lastPoiIds as string[]) : [])
                .map((id) => poiMap.get(id))
                .filter(Boolean)
                .map((p) => {
                  const metadata = (p && typeof p.metadata === 'object' &&
                                    !Array.isArray(p.metadata)) ?
                      (p.metadata as Record<string, unknown>) :
                      {} as Record<string, unknown>;
                  const lat = Number(metadata.lat);
                  const lng = Number(metadata.lng);
                  return {
                    id: p!.id,
                    name: p!.label,
                    category: p!.category ?? null,
                    lat: Number.isFinite(lat) ? lat : 0,
                    lng: Number.isFinite(lng) ? lng : 0,
                  };
                }),
        firstViewedAt: row.firstViewedAt,
        lastViewedAt: row.lastViewedAt,
        viewCount: row.viewCount,
        staleAfter: row.staleAfter,
      };
    });
  };

  const handleGeoPrefsGet = async (request: any, reply: any) => {
    const userId = await requireUser(request, reply);
    if (!userId) return;
    const actor = await ensureGeoActor(prisma, userId);
    const actorId = actor.id;
    const now = new Date();

    const pref = await readUserPreferencesByActor(prisma, actorId);

    const view = pref.geo.center ? {
      center: {
        lat: pref.geo.center.lat,
        lng: pref.geo.center.lng,
      },
      zoom: pref.geo.view?.zoom ?? null,
      bearing: pref.geo.view?.bearing ?? null,
      pitch: pref.geo.view?.pitch ?? null,
    } :
                                   null;

    let poi: null|{
      signature: string;
      kinds: string[];
      radiusM: number|null;
      count: number|null;
      cached: boolean;
      fetchedAt: Date|null;
      pois?: any;
    }
    = null;

    const lastPoi = pref.geo.poi;
    if (lastPoi?.signature) {
      const kindsFromPref = Array.isArray(lastPoi.kinds) ? lastPoi.kinds : [];
      const geoQuery =
          await readGeoQueryCache(prisma, actorId, lastPoi.signature);
      const expiresAt =
          geoQuery?.expiresAt ? new Date(geoQuery.expiresAt) : null;
      const stillValid = expiresAt ? expiresAt > now : false;
      if (geoQuery && stillValid) {
        const fetchedAt = lastPoi.fetchedAt ? new Date(lastPoi.fetchedAt) :
                                              (expiresAt ?? now);
        poi = {
          signature: lastPoi.signature,
          kinds: kindsFromPref,
          radiusM: lastPoi.radiusM ?? null,
          count: lastPoi.count ?? geoQuery.count ?? null,
          cached: true,
          fetchedAt,
          pois: (geoQuery.payload as any)?.pois ?? geoQuery.payload ?? null,
        };
      } else {
        const poiCache =
            await readGeoPoiCache(prisma, actorId, lastPoi.signature);
        if (poiCache && poiCache.expiresAt &&
            new Date(poiCache.expiresAt) > now) {
          poi = {
            signature: lastPoi.signature,
            kinds: kindsFromPref,
            radiusM: lastPoi.radiusM ?? null,
            count: lastPoi.count ?? poiCache.count ?? null,
            cached: true,
            fetchedAt: lastPoi.fetchedAt ? new Date(lastPoi.fetchedAt) :
                                           new Date(poiCache.expiresAt),
            pois: poiCache.pois,
          };
        }
      }
    }

    return {view, poi};
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
    const poiKinds = body.poi?.kinds ?? [];
    const poiRadiusM = body.poi?.radiusM;
    const poiCount = body.poi?.count;
    const poiExpiresAt =
        body.poi?.expiresAtMs ? new Date(body.poi.expiresAtMs) : null;

    await persistUserGeoPrefs(userId, {
      center: centerLat !== undefined && centerLng !== undefined ?
          {lat: centerLat, lng: centerLng} :
          undefined,
      view:
          {zoom: zoom ?? null, bearing: bearing ?? null, pitch: pitch ?? null},
      poi: poiSig && Number.isFinite(poiRadiusM) ? {
        signature: poiSig,
        kinds: poiKinds,
        radiusM: poiRadiusM as number,
        count: poiCount ?? 0,
        fetchedAt: poiExpiresAt ?? new Date()
      } :
                                                   undefined,
    });

    if (poiSig && Array.isArray(body.poi?.pois) && poiExpiresAt) {
      await writeGeoQueryCache(prisma, actorId, {
        signature: poiSig,
        type: 'poi',
        params: {
          lat: centerLat ?? null,
          lng: centerLng ?? null,
          radiusM: poiRadiusM ?? null,
          kinds: poiKinds
        },
        payload: {pois: body.poi?.pois},
        count: poiCount ?? (body.poi?.pois?.length ?? null),
        fetchedAt: poiExpiresAt.toISOString(),
        expiresAt: poiExpiresAt.toISOString(),
      });
    }

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
