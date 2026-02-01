import {Prisma, PrismaClient} from '@prisma/client';
import {createHash} from 'crypto';

import {fetchUsdaJson, type UsdaDataset} from '../lib/usda-client';

import {readApiCache, writeApiCache} from './api-cache';

type CacheOptions = {
  maxAgeMinutes?: number;
  expiresAt?: Date;
  staleWhileRevalidate?: boolean;
  logger?: {warn?: (...args: any[]) => void; error?: (...args: any[]) => void};
};

type Params = Record<string, string|number|boolean|null|undefined>|undefined;

const PROVIDER = 'usda';

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

export async function fetchAndCache<T = unknown>(
    prisma: PrismaClient,
    dataset: UsdaDataset,
    endpoint: string,
    params?: Params,
    options?: CacheOptions,
    ): Promise<T> {
  const paramsHash = fingerprint(endpoint, params);
  const cacheKey = {provider: PROVIDER, scope: dataset, endpoint, paramsHash};
  const maxAgeMs =
      options?.maxAgeMinutes ? options.maxAgeMinutes * 60 * 1000 : undefined;
  const now = Date.now();
  const log = options?.logger;

  const refreshAndStore = async () => {
    const payload = await fetchUsdaJson<T>(endpoint, params ?? undefined);
    const expiresAt = options?.expiresAt;
    await writeApiCache(prisma, cacheKey, payload as Prisma.JsonValue, {
      fetchedAt: new Date().toISOString(),
      expiresAt: expiresAt ? expiresAt.toISOString() : null,
    });

    return payload;
  };

  const existing = await readApiCache(prisma, cacheKey);
  if (existing.metadata) {
    const fetchedAt = new Date(existing.metadata.fetchedAt);
    const freshByAge = maxAgeMs ? now - fetchedAt.getTime() <= maxAgeMs : false;
    const notExpired = existing.metadata.expiresAt ?
        new Date(existing.metadata.expiresAt).getTime() > now :
        false;
    if (freshByAge || notExpired) {
      return existing.payload as T;
    }

    if (options?.staleWhileRevalidate) {
      void refreshAndStore().catch(
          (err) => log?.warn?.(
              {err, dataset, endpoint}, 'usda fetchAndCache refresh failed'));
      return existing.payload as T;
    }
  }

  return refreshAndStore();
}

export async function readCache<T = unknown>(
    prisma: PrismaClient,
    dataset: UsdaDataset,
    endpoint: string,
    params?: Params,
    ): Promise<T|null> {
  const paramsHash = fingerprint(endpoint, params);
  const cacheKey = {provider: PROVIDER, scope: dataset, endpoint, paramsHash};
  const existing = await readApiCache(prisma, cacheKey);
  if (!existing.metadata) return null;
  return existing.payload as T;
}
