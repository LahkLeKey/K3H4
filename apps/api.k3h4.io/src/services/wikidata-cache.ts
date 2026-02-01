import {type Prisma, PrismaClient} from '@prisma/client';
import {createHash} from 'crypto';

import {fetchWikidataJson, type WikidataFetchResult} from '../lib/wikidata-client';

import {readActorCache, writeActorCache} from './actor-cache';
import {CacheScope, ensureCacheActorId} from './cache-actor';

const DEFAULT_WIKIDATA_TTL_MS = 24 * 60 * 60 * 1000;
const WIKIDATA_SCOPE: CacheScope = 'wikidata';

type CacheOptions = {
  maxAgeMinutes?: number;
  expiresAt?: Date;
  resource?: string;
};

type Params = Record<string, string|number|boolean|null|undefined>|undefined;

type WikidataCachePayload = {
  resource: string; endpoint: string;
  params?: Params; paramsHash: string; url: string; statusCode: number;
  payload: Prisma.JsonValue;
  fetchedAt: string;
  expiresAt: string | null;
  cacheControlSeconds: number | null;
  etag: string | null;
};

const sortValue = (value: any): any => {
  if (Array.isArray(value)) return value.map(sortValue);
  if (value && typeof value === 'object') {
    return Object.keys(value).sort().reduce((acc, key) => {
      acc[key] = sortValue(value[key]);
      return acc;
    }, {} as Record<string, any>);
  }
  return value;
};

const stableStringify = (value: any) => JSON.stringify(sortValue(value));

const fingerprint = (endpoint: string, params: Params) => {
  const hash = createHash('sha256');
  hash.update(endpoint);
  hash.update(':');
  hash.update(stableStringify(params ?? {}));
  return hash.digest('hex');
};

const buildCacheKey =
    (resource: string, endpoint: string, paramsHash: string) =>
        `wikidata:${resource}:${endpoint}:${paramsHash}`;

const computeExpiry =
    (response: WikidataFetchResult, options: CacheOptions, now: number) => {
      if (options.expiresAt) return options.expiresAt;
      if (options.maxAgeMinutes && Number.isFinite(options.maxAgeMinutes)) {
        return new Date(now + options.maxAgeMinutes * 60 * 1000);
      }
      if (response.cacheControlSeconds &&
          Number.isFinite(response.cacheControlSeconds)) {
        return new Date(now + response.cacheControlSeconds * 1000);
      }
      return null;
    };

const computeTtlMs = (expiresAt: Date|null, fallbackMs: number) => {
  if (expiresAt) {
    const now = Date.now();
    const diff = expiresAt.getTime() - now;
    if (diff > 0) return diff;
  }
  return fallbackMs;
};

export async function fetchWikidataWithCache<T = unknown>(
    prisma: PrismaClient,
    endpoint: string,
    params?: Params,
    options: CacheOptions = {},
    ): Promise<{
  cached: boolean; status: number; payload: T | string | null; url: string;
}> {
  const resource = options.resource ?? 'generic';
  const paramsHash = fingerprint(endpoint, params);
  const key = buildCacheKey(resource, endpoint, paramsHash);
  const actorId = await ensureCacheActorId(prisma, WIKIDATA_SCOPE);
  const existing =
      await readActorCache(prisma, actorId, key) as WikidataCachePayload | null;
  const now = Date.now();
  if (existing) {
    const ageMs = now - new Date(existing.fetchedAt).getTime();
    const maxAgeMs =
        options.maxAgeMinutes ? options.maxAgeMinutes * 60 * 1000 : null;
    const freshByAge = maxAgeMs ? ageMs <= maxAgeMs : true;
    const expiresAtMs =
        existing.expiresAt ? new Date(existing.expiresAt).getTime() : null;
    const notExpired = expiresAtMs ? expiresAtMs > now : true;
    if (freshByAge && notExpired) {
      return {
        cached: true,
        status: existing.statusCode,
        payload: existing.payload as T,
        url: existing.url,
      };
    }
  }

  const response = await fetchWikidataJson<T>(endpoint, params ?? undefined);
  const expiresAt = computeExpiry(response, options, now);
  const payload: WikidataCachePayload = {
    resource,
    endpoint,
    params,
    paramsHash,
    url: response.url,
    statusCode: response.status,
    payload: response.payload as Prisma.JsonValue,
    fetchedAt: new Date(now).toISOString(),
    expiresAt: expiresAt ? expiresAt.toISOString() : null,
    cacheControlSeconds: response.cacheControlSeconds ?? null,
    etag: response.etag ?? null,
  };
  const ttlMs = computeTtlMs(
      expiresAt,
      options.maxAgeMinutes ? options.maxAgeMinutes * 60 * 1000 :
                              DEFAULT_WIKIDATA_TTL_MS);
  await writeActorCache(prisma, actorId, key, payload, ttlMs);

  return {
    cached: false,
    status: response.status,
    payload: response.payload,
    url: response.url,
  };
}

export async function readWikidataCache<T = unknown>(
    prisma: PrismaClient,
    endpoint: string,
    params?: Params,
    resource = 'generic',
    ): Promise<T|null> {
  const paramsHash = fingerprint(endpoint, params);
  const key = buildCacheKey(resource, endpoint, paramsHash);
  const actorId = await ensureCacheActorId(prisma, WIKIDATA_SCOPE);
  const cached =
      await readActorCache(prisma, actorId, key) as WikidataCachePayload | null;
  if (!cached) return null;
  return cached.payload as T;
}
