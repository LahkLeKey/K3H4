import type {PrismaClient} from '@prisma/client';

import {readActorCache, writeActorCache} from './actor-cache';

const GEO_ROUTE_TTL_MS = 1000 * 60 * 60 * 6;
const GEO_POI_TTL_MS = 1000 * 60 * 60 * 12;
const GEO_QUERY_TTL_MS = 1000 * 60 * 60 * 3;
const GEO_VIEW_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const GEO_STATUS_TTL_MS = 1000 * 60 * 60 * 24;
export const GEO_DEM_TTL_MS =
    Number(process.env.DEM_CACHE_TTL_MS ?? 1000 * 60 * 60 * 24 * 7);

const NAMESPACES = {
  route: 'geo.route',
  poi: 'geo.poi',
  query: 'geo.query',
  view: 'geo.view',
  status: 'geo.status',
  dem: 'geo.dem',
};

const buildKey = (namespace: string, signature: string) =>
    `${namespace}:${signature}`;

const computeTtlFromExpires = (expiresAt?: string|Date|null) => {
  if (!expiresAt) return null;
  const date = typeof expiresAt === 'string' ? new Date(expiresAt) : expiresAt;
  const diff = date.getTime() - Date.now();
  return diff > 0 ? diff : 0;
};

export type GeoRouteCachePayload = {
  signature: string; distanceKm: number; durationMinutes: number;
  geojson: unknown;
  fetchedAt?: string;
  expiresAt?: string;
};

export async function readGeoRouteCache(
    prisma: PrismaClient, actorId: string|null, signature: string) {
  if (!actorId) return null;
  const key = buildKey(NAMESPACES.route, signature);
  return await readActorCache(prisma, actorId, key) as GeoRouteCachePayload |
      null;
}

export async function writeGeoRouteCache(
    prisma: PrismaClient, actorId: string|null, signature: string,
    payload: Omit<GeoRouteCachePayload, 'expiresAt'>) {
  if (!actorId) return;
  const key = buildKey(NAMESPACES.route, signature);
  await writeActorCache(prisma, actorId, key, payload, GEO_ROUTE_TTL_MS);
}

export type GeoPoiCachePayload = {
  signature: string; center: {lat: number; lng: number}; radiusM: number;
  kinds: string[];
  pois: unknown[];
  count: number;
  fetchedAt?: string;
  expiresAt?: string;
};

export async function readGeoPoiCache(
    prisma: PrismaClient, actorId: string|null, signature: string) {
  if (!actorId) return null;
  const key = buildKey(NAMESPACES.poi, signature);
  return await readActorCache(prisma, actorId, key) as GeoPoiCachePayload |
      null;
}

export async function writeGeoPoiCache(
    prisma: PrismaClient, actorId: string|null, payload: GeoPoiCachePayload,
    ttlMs?: number) {
  if (!actorId) return;
  const key = buildKey(NAMESPACES.poi, payload.signature);
  const resolvedTtl =
      ttlMs ?? computeTtlFromExpires(payload.expiresAt) ?? GEO_POI_TTL_MS;
  await writeActorCache(prisma, actorId, key, payload, resolvedTtl);
}

export type GeoQueryCachePayload = {
  signature: string; type: string;
  params?: Record<string, unknown>| null;
  payload?: unknown;
  count?: number | null;
  fetchedAt?: string;
  expiresAt?: string;
};

export async function readGeoQueryCache(
    prisma: PrismaClient, actorId: string|null, signature: string) {
  if (!actorId) return null;
  const key = buildKey(NAMESPACES.query, signature);
  return await readActorCache(prisma, actorId, key) as GeoQueryCachePayload |
      null;
}

export async function readGeoQueryCacheStale(
    prisma: PrismaClient, actorId: string|null, signature: string) {
  if (!actorId) return null;
  const entry = await prisma.actorCache.findFirst({
    where: {actorId, key: buildKey(NAMESPACES.query, signature)},
    orderBy: {updatedAt: 'desc'},
  });
  return entry?.payload as GeoQueryCachePayload | null;
}

export async function writeGeoQueryCache(
    prisma: PrismaClient, actorId: string|null, payload: GeoQueryCachePayload,
    ttlMs?: number) {
  if (!actorId) return;
  const key = buildKey(NAMESPACES.query, payload.signature);
  const resolvedTtl =
      ttlMs ?? computeTtlFromExpires(payload.expiresAt) ?? GEO_QUERY_TTL_MS;
  await writeActorCache(prisma, actorId, key, payload, resolvedTtl);
}

export type GeoViewHistoryPayload = {
  signature: string; zoomBand: number;
  bbox: {minLat: number; minLng: number; maxLat: number; maxLng: number;};
  lastPoiIds?: string[];
  lastPoiCount?: number; firstViewedAt: string; lastViewedAt: string;
  viewCount: number;
  staleAfter?: string;
};

export type GeoViewHistoryEntry = GeoViewHistoryPayload&{id: number};

export async function readGeoViewHistory(
    prisma: PrismaClient, actorId: string|null, limit = 40) {
  if (!actorId) return [] as GeoViewHistoryEntry[];
  const entries = await prisma.actorCache.findMany({
    where: {
      actorId,
      key: {startsWith: `${NAMESPACES.view}:`},
      OR: [{expiresAt: null}, {expiresAt: {gt: new Date()}}],
    },
    orderBy: {updatedAt: 'desc'},
    take: limit,
  });
  return entries.map((entry) => {
    const payload = entry.payload as GeoViewHistoryPayload;
    const bbox = payload.bbox ?? {minLat: 0, minLng: 0, maxLat: 0, maxLng: 0};
    return {
      id: entry.id,
      ...payload,
      bbox,
      lastViewedAt: payload.lastViewedAt ?? entry.updatedAt.toISOString(),
    };
  });
}

export async function readGeoViewEntry(
    prisma: PrismaClient, actorId: string|null, signature: string) {
  if (!actorId) return null;
  const key = buildKey(NAMESPACES.view, signature);
  return await readActorCache(prisma, actorId, key) as GeoViewHistoryPayload |
      null;
}

export async function writeGeoViewEntry(
    prisma: PrismaClient, actorId: string|null,
    payload: GeoViewHistoryPayload) {
  if (!actorId) return;
  const key = buildKey(NAMESPACES.view, payload.signature);
  await writeActorCache(prisma, actorId, key, payload, GEO_VIEW_TTL_MS);
}

export async function logGeoStatus(
    prisma: PrismaClient, actorId: string|null, data: Record<string, unknown>) {
  if (!actorId) return;
  const suffix = Date.now().toString(36);
  const key = `${NAMESPACES.status}:${suffix}`;
  await writeActorCache(prisma, actorId, key, data, GEO_STATUS_TTL_MS);
}

export type GeoDemTileCachePayload = {
  signature: string; provider: string; format: string; dataBase64: string;
  cacheControl?: string;
  etag?: string; url: string; fetchedAt: string;
  expiresAt?: string;
};

export async function readGeoDemTileCache(
    prisma: PrismaClient, actorId: string|null, signature: string) {
  if (!actorId) return null;
  const key = buildKey(NAMESPACES.dem, signature);
  return await readActorCache(prisma, actorId, key) as GeoDemTileCachePayload |
      null;
}

export async function writeGeoDemTileCache(
    prisma: PrismaClient, actorId: string|null,
    payload: GeoDemTileCachePayload) {
  if (!actorId) return;
  const key = buildKey(NAMESPACES.dem, payload.signature);
  await writeActorCache(prisma, actorId, key, payload, GEO_DEM_TTL_MS);
}

export async function readGeoPoiCacheStale(
    prisma: PrismaClient, actorId: string|null, signature: string) {
  if (!actorId) return null;
  const entry = await prisma.actorCache.findFirst({
    where: {actorId, key: buildKey(NAMESPACES.poi, signature)},
    orderBy: {updatedAt: 'desc'},
  });
  return entry?.payload as GeoPoiCachePayload | null;
}
