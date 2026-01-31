import type {Prisma, PrismaClient} from '@prisma/client';

import {readActorCache, writeActorCache} from './actor-cache';

export type HttpCacheEntry = {
  signature: string;
  kind?: string;
  path?: string;
  method?: string;
  params?: Record<string, any>;
  paramsHash?: string; responseType: 'json' | 'arrayBuffer'; url: string;
  statusCode?: number;
  payload?: Prisma.JsonValue;
  dataBase64?: string;
  contentType?: string;
  cacheControl?: string; fetchedAt: string;
  expiresAt?: string;
};

type CacheWriteOptions = {
  expiresAt?: Date|string|null;
  maxAgeMinutes?: number;
};

const normalizeExpires = (value?: Date|string|null) => {
  if (value === undefined || value === null) return null;
  const date = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return null;
  return date;
};

const computeTtlMs = (options?: CacheWriteOptions): number|null => {
  const expiresAt = normalizeExpires(options?.expiresAt);
  if (expiresAt) {
    const diff = expiresAt.getTime() - Date.now();
    return diff > 0 ? diff : 0;
  }
  if (options?.maxAgeMinutes && Number.isFinite(options.maxAgeMinutes) &&
      options.maxAgeMinutes > 0) {
    return options.maxAgeMinutes * 60 * 1000;
  }
  return null;
};

const buildCacheKey = (namespace: string, signature: string) =>
    `${namespace}:${signature}`;

export const HTTP_CACHE_NAMESPACE_MAPTILER = 'maptiler';
export const HTTP_CACHE_NAMESPACE_OSRM = 'osrm';

export async function readHttpCacheEntry(
    prisma: PrismaClient,
    actorId: string,
    namespace: string,
    signature: string,
) {
  const key = buildCacheKey(namespace, signature);
  const payload = await readActorCache(prisma, actorId, key);
  if (!payload) return null;
  return payload as HttpCacheEntry;
}

export async function writeHttpCacheEntry(
    prisma: PrismaClient,
    actorId: string,
    namespace: string,
    signature: string,
    entry: HttpCacheEntry,
    options?: CacheWriteOptions,
) {
  const ttlMs = computeTtlMs(options);
  if (ttlMs !== null && ttlMs <= 0) return;
  const key = buildCacheKey(namespace, signature);
  const expiresAt =
      normalizeExpires(options?.expiresAt) ?? normalizeExpires(entry.expiresAt);
  const storedEntry: HttpCacheEntry = {
    ...entry,
    expiresAt: expiresAt ? expiresAt.toISOString() : undefined,
    fetchedAt: entry.fetchedAt ?? new Date().toISOString(),
  };
  await writeActorCache(prisma, actorId, key, storedEntry, ttlMs ?? null);
}
