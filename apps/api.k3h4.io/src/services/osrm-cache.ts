import type {PrismaClient} from '@prisma/client';
import {createHash} from 'crypto';

import {fetchOsrm, type OsrmRequest, type OsrmResponse} from '../lib/osrm-client';

import {HTTP_CACHE_NAMESPACE_OSRM, HttpCacheEntry, readHttpCacheEntry, writeHttpCacheEntry,} from './http-cache';

type CacheOptions = {
  maxAgeMinutes?: number;
  expiresAt?: Date;
  actorId?: string | null;
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

const fingerprint = (parts: {
  service: string; profile: string;
  coordinates?: string | null;
  params?: any;
}) => {
  const hash = createHash('sha256');
  hash.update(parts.service);
  hash.update(':');
  hash.update(parts.profile);
  hash.update(':');
  hash.update(parts.coordinates ?? '');
  hash.update(':');
  hash.update(stableStringify(parts.params ?? {}));
  return hash.digest('hex');
};

export async function fetchOsrmWithCache(
    prisma: PrismaClient,
    request: OsrmRequest,
    options?: CacheOptions,
    ): Promise<{cached: boolean; response: OsrmResponse}> {
  const paramsForFingerprint = {...request.params};
  delete (paramsForFingerprint as any)?.maxAgeMinutes;

  const signature = fingerprint({
    service: request.service,
    profile: request.profile,
    coordinates: request.coordinates,
    params: paramsForFingerprint,
  });

  const maxAgeMs =
      options?.maxAgeMinutes ? options.maxAgeMinutes * 60 * 1000 : undefined;
  const now = Date.now();

  if (options?.actorId) {
    const existing = await readHttpCacheEntry(
        prisma, options.actorId, HTTP_CACHE_NAMESPACE_OSRM, signature);
    if (existing) {
      if (maxAgeMs !== undefined) {
        const fetchedAt = Date.parse(existing.fetchedAt);
        if (Number.isFinite(fetchedAt) && now - fetchedAt > maxAgeMs) {
          // fall through to fetch
        } else {
          return {
            cached: true,
            response: {
              status: existing.statusCode ?? 200,
              ok: (existing.statusCode ?? 200) < 400,
              body: existing.payload,
              url: existing.url,
            },
          };
        }
      } else {
        return {
          cached: true,
          response: {
            status: existing.statusCode ?? 200,
            ok: (existing.statusCode ?? 200) < 400,
            body: existing.payload,
            url: existing.url,
          },
        };
      }
    }
  }

  const response = await fetchOsrm(request);

  if (options?.actorId) {
    const paramsHash = fingerprint({
      service: request.service,
      profile: request.profile,
      coordinates: null,
      params: paramsForFingerprint,
    });
    const entry: HttpCacheEntry = {
      signature,
      kind: request.service,
      path: request.service,
      params: request.params ?? {},
      paramsHash,
      responseType: 'json',
      url: response.url,
      statusCode: response.status,
      payload: response.body ?? null,
      fetchedAt: new Date().toISOString(),
    };
    await writeHttpCacheEntry(
        prisma, options.actorId, HTTP_CACHE_NAMESPACE_OSRM, signature, entry, {
          maxAgeMinutes: options?.maxAgeMinutes,
        });
  }

  return {cached: false, response};
}
