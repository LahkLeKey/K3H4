import {Prisma, type PrismaClient,} from '@prisma/client';
import {type FastifyInstance, type FastifyReply, type FastifyRequest} from 'fastify';
import {createHash} from 'node:crypto';

import {ensureGeoActor, ensureGeoGlobalActor} from '../actors/Geo/Geo';
import {ACTOR_TYPES} from '../lib/actor-entity-constants';
import {enqueueOverpass} from '../lib/overpass-queue';
import {formatBuildingFromPayload, readBuildingCacheByOsm} from '../services/building-cache';
import {readGeoQueryCache, readGeoQueryCacheStale, readGeoViewEntry, readGeoViewHistory, writeGeoQueryCache, writeGeoViewEntry,} from '../services/geo-cache';
import {enrichPoi} from '../services/poi-enrich/enrich';

import {withTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

type Bbox = {
  minLat: number; minLng: number; maxLat: number; maxLng: number
};

type PoiMarker = {
  id: string; osmId: string; osmType: string; name: string | null;
  category: string | null;
  lat: number;
  lng: number;
  updatedAt: string;
};

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const DEFAULT_KINDS = [
  'restaurant', 'cafe', 'bar', 'fast_food', 'fuel', 'bus_station',
  'train_station', 'bank', 'atm'
];
const DEFAULT_LIMIT = 1500;
const MAX_FETCH = 5000;
const MAX_CLUSTER_IDS = 25;
const VIEW_STALE_MINUTES = 45;
const POI_LIST_CACHE_TTL_MS = 1000 * 45;
const POI_LIST_STALE_MAX_MS = 1000 * 60 * 10;
const POI_ACTOR_TYPE = ACTOR_TYPES.POINT_OF_INTEREST;
const POI_ACTOR_PREFIX = 'poi';

const buildPoiActorId = (osmType: string, osmId: bigint|string|number) =>
    `${POI_ACTOR_PREFIX}:${osmType}:${osmId}`;

const normalizeInputJsonRecord =
    (value: unknown): Record<string, Prisma.InputJsonValue> => {
      if (value && typeof value === 'object' && !Array.isArray(value))
        return value as Record<string, Prisma.InputJsonValue>;
      return {};
    };

const buildPoiMetadata = (tags: unknown, osmType: string, osmId: string,
                          lat: number, lng: number): Prisma.InputJsonObject =>
    ({
      tags: normalizeInputJsonRecord(tags),
      osmType,
      osmId,
      lat,
      lng,
    });

const decimalToNumber =
    (value?: Prisma.Decimal|number|string|null): number|null => {
      if (value === undefined || value === null) return null;
      return Number(value);
    };

const clampZoom = (value: number|undefined) => {
  if (!Number.isFinite(value)) return 14;
  return Math.min(22, Math.max(1, Math.round(value as number)));
};

const parseKinds = (raw: unknown) => {
  if (Array.isArray(raw)) return raw.map((k) => `${k}`.trim()).filter(Boolean);
  if (typeof raw === 'string' && raw.trim().length > 0)
    return raw.split(',').map((k) => k.trim()).filter(Boolean);
  return DEFAULT_KINDS;
};

const parseBbox = (query: Record<string, unknown>): Bbox|null => {
  const bboxString = typeof query.bbox === 'string' ? query.bbox : undefined;
  const parts = bboxString?.split(',').map((p) => Number(p.trim()));

  const minLng = Number.isFinite(parts?.[0]) ? (parts as number[])[0] :
                                               Number(query.minLng);
  const minLat = Number.isFinite(parts?.[1]) ? (parts as number[])[1] :
                                               Number(query.minLat);
  const maxLng = Number.isFinite(parts?.[2]) ? (parts as number[])[2] :
                                               Number(query.maxLng);
  const maxLat = Number.isFinite(parts?.[3]) ? (parts as number[])[3] :
                                               Number(query.maxLat);

  if (![minLat, minLng, maxLat, maxLng].every((val) => Number.isFinite(val)))
    return null;

  const boundedMinLat = Math.max(-90, Math.min(90, minLat));
  const boundedMaxLat = Math.max(-90, Math.min(90, maxLat));
  const boundedMinLng = Math.max(-180, Math.min(180, minLng));
  const boundedMaxLng = Math.max(-180, Math.min(180, maxLng));

  return {
    minLat: Math.min(boundedMinLat, boundedMaxLat),
    minLng: Math.min(boundedMinLng, boundedMaxLng),
    maxLat: Math.max(boundedMinLat, boundedMaxLat),
    maxLng: Math.max(boundedMinLng, boundedMaxLng),
  };
};

const cellSizeForZoom = (zoom: number) => {
  if (zoom <= 6) return 1.2;
  if (zoom <= 8) return 0.6;
  if (zoom <= 10) return 0.25;
  if (zoom <= 12) return 0.08;
  return 0.03;
};

const clusterize = (points: PoiMarker[], zoom: number) => {
  const shouldCluster = zoom < 13 || points.length > 750;
  if (!shouldCluster) return {items: points, clustered: false} as const;

  const cell = cellSizeForZoom(zoom);
  const buckets = new Map < string, {
    count: number;
    sumLat: number;
    sumLng: number;
    sample: PoiMarker;
    categories: Set<string>;
    ids: string[]
  }
  >();

  for (const poi of points) {
    const key = `${Math.floor(poi.lat / cell)}:${Math.floor(poi.lng / cell)}`;
    const bucket = buckets.get(key) ?? {
      count: 0,
      sumLat: 0,
      sumLng: 0,
      sample: poi,
      categories: new Set<string>(),
      ids: [],
    };

    bucket.count += 1;
    bucket.sumLat += poi.lat;
    bucket.sumLng += poi.lng;
    if (bucket.ids.length < MAX_CLUSTER_IDS) bucket.ids.push(poi.id);
    if (poi.category) bucket.categories.add(poi.category);
    if (bucket.count === 1) bucket.sample = poi;
    buckets.set(key, bucket);
  }

  const clustered = Array.from(buckets.entries()).map(([key, bucket]) => {
    if (bucket.count === 1) return {...bucket.sample, cluster: false};
    return {
      cluster: true,
      id: `cluster:${key}`,
      lat: bucket.sumLat / bucket.count,
      lng: bucket.sumLng / bucket.count,
      count: bucket.count,
      sampleCategories: Array.from(bucket.categories).slice(0, 4),
      sampleIds: bucket.ids,
    };
  });

  return {items: clustered, clustered: true} as const;
};

const parseIncludeGeometry = (value: unknown) =>
    `${value}`.toLowerCase() === 'true' || value === true;

const viewSignature = (bounds: Bbox, zoom: number|null|undefined) => {
  const z = Number.isFinite(zoom) ? Math.round(zoom as number) : 0;
  return [
    bounds.minLat.toFixed(4), bounds.minLng.toFixed(4),
    bounds.maxLat.toFixed(4), bounds.maxLng.toFixed(4), z
  ].join(':');
};

const serializeGeometry = (raw: unknown) => {
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return raw as any;
};

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value))
    return value as Record<string, unknown>;
  return {};
}

const buildOverpassQuery = (bounds: Bbox, kinds: string[]) => {
  const bboxClause =
      `${bounds.minLat},${bounds.minLng},${bounds.maxLat},${bounds.maxLng}`;
  const filters =
      kinds
          .map(
              (kind) =>
                  `node[amenity=${kind}](${bboxClause});way[amenity=${kind}](${
                      bboxClause});relation[amenity=${kind}](${bboxClause});`,
              )
          .join('\n');

  const query = `[out:json][timeout:25];(${filters});out center tags;`;
  const signature = `pois:${bboxClause}:${kinds.slice().sort().join(',')}`;
  const body = new URLSearchParams({data: query}).toString();

  return {body, signature};
};

async function upsertOverpassElements(
    prisma: PrismaClient, elements: any[], runStarted: Date) {
  for (const el of elements) {
    const center = el.center ??
        (Number.isFinite(el.lat) && Number.isFinite(el.lon) ?
             {lat: el.lat, lon: el.lon} :
             null);
    if (!center) continue;

    const osmType =
        typeof el.type === 'string' && el.type.length > 0 ? el.type : 'node';
    const osmId = BigInt(el.id);
    const category = el.tags?.amenity ?? el.tags?.shop ?? el.tags?.tourism ??
        el.tags?.leisure ?? null;
    const name = el.tags?.name ?? category ?? 'poi';

    const actorId = buildPoiActorId(osmType, osmId.toString());
    const lat = Number(Number(center.lat).toFixed(6));
    const lng = Number(Number(center.lon).toFixed(6));
    const payload =
        buildPoiMetadata(el.tags ?? {}, osmType, osmId.toString(), lat, lng);
    await prisma.actor.upsert({
      where: {id: actorId},
      update: {
        label: name,
        source: el.source ?? 'osm',
        category,
        metadata: payload,
        lastSeenAt: runStarted,
      },
      create: {
        id: actorId,
        label: name,
        type: POI_ACTOR_TYPE,
        source: el.source ?? 'osm',
        category,
        metadata: payload,
        lastSeenAt: runStarted,
      },
    });
  }
}

export function registerPoiRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  const inflight = new Map<string, Promise<any>>();
  const coalesce = async<T>(key: string, fn: () => Promise<T>): Promise<T> => {
    const existing = inflight.get(key) as Promise<T>| undefined;
    if (existing) return existing;
    const p = fn().finally(() => inflight.delete(key));
    inflight.set(key, p);
    return p;
  };

  const listHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    const rt = withTelemetryBase(recordTelemetry, request);
    const bounds = parseBbox(request.query as Record<string, unknown>);
    if (!bounds)
      return reply.status(400).send(
          {error: 'bbox is required as minLon,minLat,maxLon,maxLat'});

    const zoom =
        clampZoom(Number((request.query as Record<string, unknown>).zoom));
    const limitParam = Number((request.query as Record<string, unknown>).limit);
    const normalizedLimit =
        Number.isFinite(limitParam) ? Math.trunc(limitParam) : DEFAULT_LIMIT;
    const takeLimit = Math.max(1, Math.min(normalizedLimit, MAX_FETCH));
    const cacheSignature =
        `poi.list:${viewSignature(bounds, zoom)}:limit=${takeLimit}`;
    const now = new Date();
    const userId = (request.user as {sub?: string} | undefined)?.sub ?? null;
    let actorId: string|null = null;
    if (userId) {
      const actor = await ensureGeoActor(prisma, userId);
      actorId = actor.id;
    }

    const where: Prisma.ActorWhereInput = {
      type: POI_ACTOR_TYPE,
    };
    const cachedEntry = actorId ?
        await readGeoQueryCache(prisma, actorId, cacheSignature) :
        null;
    const staleEntry = actorId && !cachedEntry ?
        await readGeoQueryCacheStale(prisma, actorId, cacheSignature) :
        null;
    const expiresAt =
        staleEntry?.expiresAt ? new Date(staleEntry.expiresAt) : null;
    const cacheAgeMs = expiresAt ? now.getTime() - expiresAt.getTime() : null;
    const hasFreshCache = Boolean(cachedEntry);
    const hasStaleCache = !hasFreshCache && Boolean(staleEntry) &&
        cacheAgeMs !== null && cacheAgeMs <= POI_LIST_STALE_MAX_MS;

    const refreshCache = async (allowOverpass: boolean) => {
      const pois = await prisma.actor.findMany({
        where,
        orderBy: {updatedAt: 'desc'},
        select: {
          id: true,
          label: true,
          category: true,
          metadata: true,
          updatedAt: true,
        },
      });

      const markers: PoiMarker[] =
          pois.map((actor) => {
                const metadata = asRecord(actor.metadata);
                const lat = Number(metadata.lat);
                const lng = Number(metadata.lng);
                return {
                  id: actor.id,
                  osmId: typeof metadata.osmId === 'string' ? metadata.osmId :
                                                              '',
                  osmType: typeof metadata.osmType === 'string' ?
                      metadata.osmType :
                      'node',
                  name: actor.label,
                  category: actor.category ?? null,
                  lat: Number.isFinite(lat) ? lat : 0,
                  lng: Number.isFinite(lng) ? lng : 0,
                  updatedAt: actor.updatedAt.toISOString(),
                };
              })
              .filter(
                  (poi) => poi.lat >= bounds.minLat &&
                      poi.lat <= bounds.maxLat && poi.lng >= bounds.minLng &&
                      poi.lng <= bounds.maxLng);

      const total = markers.length;
      const limited = markers.slice(0, Math.min(takeLimit, total));

      const {items, clustered} = clusterize(limited, zoom);
      const newest = pois[0]?.updatedAt ?? null;
      const etagBase = `${bounds.minLat}:${bounds.minLng}:${bounds.maxLat}:${
          bounds.maxLng}:${zoom}:${total}:${newest?.getTime() ?? 0}`;
      const etag = createHash('sha1').update(etagBase).digest('hex');
      const payload = {
        items,
        total,
        returned: items.length,
        clustered,
        bbox: bounds,
        zoom,
        etag
      };
      const expiresAt = new Date(Date.now() + POI_LIST_CACHE_TTL_MS);
      if (actorId) {
        await writeGeoQueryCache(
            prisma, actorId, {
              signature: cacheSignature,
              type: 'poi.list',
              params: {bbox: bounds, zoom, limit: takeLimit},
              payload,
              count: total,
              fetchedAt: now.toISOString(),
              expiresAt: expiresAt.toISOString(),
            },
            POI_LIST_CACHE_TTL_MS);
      }

      if (total === 0 && allowOverpass) {
        void coalesce(`overpass:${cacheSignature}`, async () => {
          try {
            const kinds = DEFAULT_KINDS;
            const {body: overpassBody} = buildOverpassQuery(bounds, kinds);
            const data = await enqueueOverpass(
                OVERPASS_URL, overpassBody, `pois:${cacheSignature}`);
            const elements = Array.isArray((data as any)?.elements) ?
                ((data as any).elements as any[]) :
                [];
            if (elements.length > 0) {
              await upsertOverpassElements(prisma, elements, new Date());
              await refreshCache(false);
            }
          } catch (err) {
            request.log.warn(
                {err}, 'overpass sync after empty poi result failed');
          }
        });
      }

      return payload;
    };

    const recordViewHistory = async (items: unknown[]) => {
      if (!actorId) return {existing: null, isStale: true};
      const signature = viewSignature(bounds, zoom);
      const now = new Date();
      const existing = await readGeoViewEntry(prisma, actorId, signature);
      const poiIds = items
                         .filter(
                             (entry) =>
                                 !(entry && typeof entry === 'object' &&
                                   'cluster' in entry &&
                                   (entry as {cluster?: unknown}).cluster))
                         .map((entry) => `${(entry as {id?: string}).id ?? ''}`)
                         .filter(Boolean)
                         .slice(0, 500);
      const staleAfter =
          new Date(now.getTime() + VIEW_STALE_MINUTES * 60 * 1000);
      await writeGeoViewEntry(prisma, actorId, {
        signature,
        zoomBand: Math.round(zoom ?? 0),
        bbox: {
          minLat: bounds.minLat,
          minLng: bounds.minLng,
          maxLat: bounds.maxLat,
          maxLng: bounds.maxLng,
        },
        lastPoiIds: poiIds,
        lastPoiCount: items.length,
        firstViewedAt: existing?.firstViewedAt ?? now.toISOString(),
        lastViewedAt: now.toISOString(),
        viewCount: (existing?.viewCount ?? 0) + 1,
        staleAfter: staleAfter.toISOString(),
      });
      return {
        existing,
        isStale: existing?.staleAfter ? new Date(existing.staleAfter) < now :
                                        true,
      };
    };

    if (hasFreshCache || hasStaleCache) {
      const cacheEntry = hasFreshCache ? cachedEntry : staleEntry;
      const cachedPayload = cacheEntry?.payload as | {
        items?: any[];
        total?: number;
        returned?: number;
        clustered?: boolean;
        bbox?: Bbox;
        zoom?: number;
        etag?: string;
      }
      |undefined;
      const cachedItems =
          Array.isArray(cachedPayload?.items) ? cachedPayload?.items ?? [] : [];
      const cachedTotal = typeof cachedPayload?.total === 'number' ?
          cachedPayload.total :
          cacheEntry?.count ?? 0;
      const cachedClustered = cachedPayload?.clustered === true;
      const cachedEtag =
          typeof cachedPayload?.etag === 'string' ? cachedPayload.etag : null;

      if (cachedEtag && request.headers['if-none-match'] === cachedEtag)
        return reply.status(304).send();

      if (cachedEtag) reply.header('ETag', cachedEtag);
      reply.header(
          'Cache-Control', 'public, max-age=120, stale-while-revalidate=900');

      if (hasStaleCache) {
        void coalesce(cacheSignature, () => refreshCache(true));
      }

      if (actorId) {
        const viewMeta = await recordViewHistory(cachedItems);
        if (viewMeta.isStale) {
          const now = new Date();
          const sig = viewSignature(bounds, zoom);
          void (async () => {
            try {
              const kinds = DEFAULT_KINDS;
              const {body: overpassBody} = buildOverpassQuery(bounds, kinds);
              const data = await enqueueOverpass(
                  OVERPASS_URL, overpassBody, `pois:${sig}`);
              const elements =
                  Array.isArray(data?.elements) ? (data.elements as any[]) : [];
              await upsertOverpassElements(prisma, elements, now);
            } catch (err) {
              request.log.debug({err}, 'stale poi refresh failed');
            }
          })();
        }
      }

      await rt({
        eventType: 'poi.list',
        source: 'api',
        payload: {
          zoom,
          total: cachedTotal,
          returned: cachedItems.length,
          clustered: cachedClustered,
          cache: hasFreshCache ? 'hit' : 'stale'
        },
      });

      return {
        items: cachedItems,
        total: cachedTotal,
        returned: cachedItems.length,
        clustered: cachedClustered,
        bbox: cachedPayload?.bbox ?? bounds,
        zoom: cachedPayload?.zoom ?? zoom,
      };
    }

    const payload = await coalesce(cacheSignature, () => refreshCache(true));
    const items = Array.isArray(payload.items) ? payload.items : [];
    const total = typeof payload.total === 'number' ? payload.total : 0;
    const clustered = payload.clustered === true;
    const etag = typeof payload.etag === 'string' ? payload.etag : '';

    if (etag && request.headers['if-none-match'] === etag)
      return reply.status(304).send();

    reply.header('ETag', etag);
    reply.header(
        'Cache-Control', 'public, max-age=120, stale-while-revalidate=900');

    if (actorId) {
      const viewMeta = await recordViewHistory(items);
      if (viewMeta.isStale) {
        const now = new Date();
        const sig = viewSignature(bounds, zoom);
        void (async () => {
          try {
            const kinds = DEFAULT_KINDS;
            const {body: overpassBody} = buildOverpassQuery(bounds, kinds);
            const data = await enqueueOverpass(
                OVERPASS_URL, overpassBody, `pois:${sig}`);
            const elements =
                Array.isArray(data?.elements) ? (data.elements as any[]) : [];
            await upsertOverpassElements(prisma, elements, now);
          } catch (err) {
            request.log.debug({err}, 'stale poi refresh failed');
          }
        })();
      }
    }

    await rt({
      eventType: 'poi.list',
      source: 'api',

      payload: {zoom, total, returned: items.length, clustered, cache: 'miss'}
    });

    return {
      items,
      total,
      returned: items.length,
      clustered,
      bbox: bounds,
      zoom,
    };
  };

  const metadataHandler =
      async (request: FastifyRequest, reply: FastifyReply) => {
    const bounds = parseBbox(request.query as Record<string, unknown>);
    if (!bounds)
      return reply.status(400).send(
          {error: 'bbox is required as minLon,minLat,maxLon,maxLat'});

    const pois = await prisma.actor.findMany({
      where: {type: POI_ACTOR_TYPE},
      select: {category: true, metadata: true, updatedAt: true},
    });

    const filtered = pois.filter((actor) => {
      const metadata = asRecord(actor.metadata);
      const lat = Number(metadata.lat);
      const lng = Number(metadata.lng);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false;
      return lat >= bounds.minLat && lat <= bounds.maxLat &&
          lng >= bounds.minLng && lng <= bounds.maxLng;
    });

    const total = filtered.length;
    const newest =
        filtered.sort(
            (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0] ??
        null;

    const categoryCounts = new Map<string, number>();
    filtered.forEach((actor) => {
      if (!actor.category) return;
      categoryCounts.set(
          actor.category, (categoryCounts.get(actor.category) ?? 0) + 1);
    });
    const categories = Array.from(categoryCounts.entries())
                           .sort((a, b) => b[1] - a[1])
                           .slice(0, 12)
                           .map(([category, count]) => ({category, count}));

    const etagBase = `${bounds.minLat}:${bounds.minLng}:${bounds.maxLat}:${
        bounds.maxLng}:${total}:${newest?.updatedAt?.getTime() ?? 0}`;
    const etag = createHash('sha1').update(etagBase).digest('hex');
    if (request.headers['if-none-match'] === etag)
      return reply.status(304).send();

    reply.header('ETag', etag);
    reply.header(
        'Cache-Control', 'public, max-age=300, stale-while-revalidate=1800');

    return {
      total,
      updatedAt: newest?.updatedAt ?? null,
      categories,
      bbox: bounds,
    };
  };

  const syncHandler = async (request: FastifyRequest, reply: FastifyReply) => {
    const rt = withTelemetryBase(recordTelemetry, request);
    const body = request.body as {
      bbox?: string;
      minLat?: number;
      minLng?: number;
      maxLat?: number;
      maxLng?: number;
      kinds?: string[]|string;
      pruneMissing?: boolean
    }
    |undefined;
    const bounds = parseBbox((body ?? {}) as Record<string, unknown>);
    if (!bounds)
      return reply.status(400).send(
          {error: 'bbox is required as minLon,minLat,maxLon,maxLat'});

    const kinds = parseKinds(body?.kinds);
    const runStarted = new Date();

    try {
      const {body: overpassBody, signature} = buildOverpassQuery(bounds, kinds);
      const data = await enqueueOverpass(OVERPASS_URL, overpassBody, signature);
      const elements =
          Array.isArray(data?.elements) ? (data.elements as any[]) : [];

      let created = 0;
      let updated = 0;

      for (const el of elements) {
        const center = el.center ??
            (Number.isFinite(el.lat) && Number.isFinite(el.lon) ?
                 {lat: el.lat, lon: el.lon} :
                 null);
        if (!center) continue;

        const osmType = typeof el.type === 'string' && el.type.length > 0 ?
            el.type :
            'node';
        const osmId = BigInt(el.id);
        const category = el.tags?.amenity ?? el.tags?.shop ??
            el.tags?.tourism ?? el.tags?.leisure ?? null;
        const name = el.tags?.name ?? category ?? 'poi';
        const actorId = buildPoiActorId(osmType, osmId.toString());
        const lat = Number(center.lat);
        const lng = Number(center.lon);
        const metadata = buildPoiMetadata(
            el.tags ?? {}, osmType, osmId.toString(), lat, lng);
        const existing = await prisma.actor.findUnique({where: {id: actorId}});
        if (existing)
          updated += 1;
        else
          created += 1;
        if (existing) {
          await prisma.actor.update({
            where: {id: actorId},
            data: {
              label: name,
              source: el.source ?? 'osm',
              category,
              metadata,
              lastSeenAt: runStarted,
            },
          });
        } else {
          await prisma.actor.create({
            data: {
              id: actorId,
              label: name,
              type: POI_ACTOR_TYPE,
              source: el.source ?? 'osm',
              category,
              metadata,
              lastSeenAt: runStarted,
            },
          });
        }
      }

      let pruned = 0;
      if (body?.pruneMissing) {
        const pruneResult = await prisma.actor.deleteMany({
          where: {
            type: POI_ACTOR_TYPE,
            lastSeenAt: {lt: runStarted},
          },
        });
        pruned = pruneResult.count;
      }

      await rt({
        eventType: 'poi.sync',
        source: 'api',
        payload: {
          bbox: bounds,
          kinds,
          fetched: elements.length,
          created,
          updated,
          pruned
        },
      });

      return {ok: true, fetched: elements.length, created, updated, pruned};
    } catch (err) {
      request.log.warn({err}, 'poi sync failed');
      return reply.status(502).send(
          {error: err instanceof Error ? err.message : 'Overpass unavailable'});
    }
  };

  const authOpts = {preHandler: server.authenticate};

  const detailHandler =
      async (request: FastifyRequest, reply: FastifyReply) => {
    const params = request.params as {id?: string} | undefined;
    const id = params?.id;
    const includeGeometry = parseIncludeGeometry(
        (request.query as Record<string, unknown>).includeGeometry);
    if (!id) return reply.status(400).send({error: 'id is required'});

    const poi = await prisma.actor.findFirst({
      where: {id, type: POI_ACTOR_TYPE},
      select: {
        id: true,
        label: true,
        category: true,
        metadata: true,
        source: true,
        lastSeenAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!poi) return reply.status(404).send({error: 'poi not found'});

    const metadata = asRecord(poi.metadata);
    const osmType =
        typeof metadata.osmType === 'string' ? metadata.osmType : null;
    const osmId = typeof metadata.osmId === 'string' ? metadata.osmId : null;
    const lat = Number(metadata.lat);
    const lng = Number(metadata.lng);

    const globalActor = await ensureGeoGlobalActor(prisma);
    const buildingPayload = osmType && osmId ?
        await readBuildingCacheByOsm(prisma, globalActor.id, osmType, osmId) :
        null;
    const building = buildingPayload ?
        formatBuildingFromPayload(buildingPayload, includeGeometry) :
        null;

    return {
      id: poi.id,
      osmId: osmId ?? '',
      osmType: osmType ?? 'node',
      name: poi.label,
      category: poi.category ?? null,
      latitude: Number.isFinite(lat) ? lat : 0,
      longitude: Number.isFinite(lng) ? lng : 0,
      tags: metadata.tags ?? null,
      source: poi.source ?? null,
      lastSeenAt: poi.lastSeenAt,
      createdAt: poi.createdAt,
      updatedAt: poi.updatedAt,
      building,
    };
  };

  // Shared GET endpoints for both anonymous and authenticated map routes
  const readTargets: Array<{prefix: string; options?: typeof authOpts;}> = [
    {prefix: '/pois'},
    {prefix: '/api/pois', options: authOpts},
  ];

  type PoiReadHandler = (
      request: FastifyRequest,
      reply: FastifyReply,
      ) => Promise<unknown>|unknown;

  const readRoutes: Array<{suffix: string; handler: PoiReadHandler}> = [
    {suffix: '', handler: listHandler},
    {suffix: '/metadata', handler: metadataHandler},
    {suffix: '/:id', handler: detailHandler},
  ];

  for (const target of readTargets) {
    for (const route of readRoutes) {
      const path = `${target.prefix}${route.suffix}`;
      if (target.options) {
        server.get(path, target.options, route.handler);
      } else {
        server.get(path, route.handler);
      }
    }
  }

  for (const path of ['/pois/actions/sync', '/api/pois/actions/sync']) {
    server.post(path, authOpts, syncHandler);
  }

  // Batch enrich POIs by ids
  server.post(
      '/api/pois/batch',
      authOpts,
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const body = request.body as {
          ids?: Array<{type?: string; id?: string | number}>;
          include?: Record<string, boolean>;
        };

        const ids = Array.isArray(body?.ids) ?
            body.ids
                .map((p) => {
                  const idNum = typeof p.id === 'string' ? Number(p.id) : p.id;
                  if (!Number.isFinite(idNum)) return null;
                  const type =
                      typeof p.type === 'string' && p.type.trim().length > 0 ?
                      p.type.trim() :
                      'node';
                  return {type, id: Number(idNum)} as {
                    type: string;
                    id: number
                  };
                })
                .filter(
                    (p):
                        p is {
                          type: string;
                          id: number
                        } => Boolean(p)) :
            [];

        if (!ids.length) return reply.status(400).send({error: 'ids required'});
        if (ids.length > 50)
          return reply.status(400).send({error: 'max 50 ids'});

        const includeFlags = {
          address: Boolean(body?.include?.address),
          contact: Boolean(body?.include?.contact),
          openingHours: Boolean(body?.include?.openingHours),
          fuel: Boolean(body?.include?.fuel),
          accessibility: Boolean(body?.include?.accessibility),
          building: Boolean(body?.include?.building ?? body?.include?.geometry),
          route: Boolean(body?.include?.route),
          routeGeometry: Boolean(body?.include?.routeGeometry),
          photos: Boolean(body?.include?.photos),
          description: Boolean(body?.include?.description),
        } as const;

        const includeHash = Object.entries(includeFlags)
                                .filter(([, v]) => v)
                                .map(([k]) => k)
                                .sort()
                                .join(',');

        const results: Record<string, any> = {};

        // coalesce per id+hash
        await Promise.all(
            ids.map(async (poi) => {
              const key = `${poi.type}/${poi.id}:${includeHash}`;
              const enriched = await coalesce(key, async () => {
                // Try enrichment cache helper
                const enriched = await enrichPoi(
                    prisma, {type: poi.type as any, id: poi.id}, includeFlags,
                    null, 'driving');
                return enriched;
              });
              results[`${poi.type}/${poi.id}`] = enriched;
            }),
        );

        await rt({
          eventType: 'poi.batch',
          source: 'api',
          payload: {count: ids.length, include: includeHash}
        });
        return {items: results};
      },
  );
}
