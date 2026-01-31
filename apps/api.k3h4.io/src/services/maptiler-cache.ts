import type {PrismaClient} from '@prisma/client';
import {createHash} from 'crypto';

import {fetchMaptiler, type MaptilerRequest, type MaptilerResponse} from '../lib/maptiler-client';

import {HTTP_CACHE_NAMESPACE_MAPTILER, HttpCacheEntry, readHttpCacheEntry, writeHttpCacheEntry,} from './http-cache';

type CacheOptions = {
  maxAgeMinutes?: number;
  expiresAt?: Date;
  actorId?: string | null;
};

type MaptilerRequestWithKind = MaptilerRequest&{kind?: string};

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

const hashString = (input: string) => {
  const hash = createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
};

const fingerprint =
    (request: MaptilerRequestWithKind, responseType: 'json'|'arrayBuffer') => {
      return hashString(
          [
            request.method ?? 'GET',
            request.path,
            responseType,
            stableStringify(request.params ?? {}),
            request.kind ?? 'generic',
          ].join('|'),
      );
    };

export const computeMaptilerSignature =
    (request: MaptilerRequestWithKind, responseType: 'json'|'arrayBuffer') =>
        fingerprint(request, responseType);

const deriveKind = (path: string, fallback: string|undefined) => {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const first = clean.split('/').filter(Boolean)[0];
  return (first ?? fallback ?? 'generic').toLowerCase();
};

const deriveExpiresAt =
    (cacheControl: string|undefined, maxAgeMinutes?: number) => {
      const now = Date.now();
      if (cacheControl) {
        const match = cacheControl.match(/max-age=(\d+)/i);
        if (match && match[1]) {
          const seconds = Number(match[1]);
          if (Number.isFinite(seconds)) return new Date(now + seconds * 1000);
        }
      }
      if (maxAgeMinutes && Number.isFinite(maxAgeMinutes)) {
        return new Date(now + maxAgeMinutes * 60 * 1000);
      }
      return null;
    };

export type MaptilerCacheResult = {
  cached: boolean; response: MaptilerResponse; signature: string; kind: string;
};

export async function fetchMaptilerCacheOnly(
    prisma: PrismaClient,
    request: MaptilerRequestWithKind,
    options?: CacheOptions,
    existingSignature?: string,
    ): Promise<MaptilerCacheResult|null> {
  if (!options?.actorId) return null;
  const responseType: 'json'|'arrayBuffer' = request.responseType ?? 'json';
  const signature = existingSignature ?? fingerprint(request, responseType);
  const maxAgeMs =
      options?.maxAgeMinutes ? options.maxAgeMinutes * 60 * 1000 : undefined;
  const now = Date.now();

  const existing = await readHttpCacheEntry(
      prisma, options.actorId, HTTP_CACHE_NAMESPACE_MAPTILER, signature);
  if (!existing) return null;

  if (maxAgeMs !== undefined) {
    const fetchedAt = Date.parse(existing.fetchedAt);
    if (Number.isFinite(fetchedAt) && now - fetchedAt > maxAgeMs) return null;
  }

  const cachedResponse: MaptilerResponse = {
    status: existing.statusCode ?? 200,
    ok: (existing.statusCode ?? 200) < 400,
    url: existing.url,
    headers: {},
    contentType: existing.contentType ?? undefined,
    cacheControl: existing.cacheControl ?? undefined,
  };

  if (existing.responseType === 'arrayBuffer') {
    cachedResponse.data = existing.dataBase64 ?
        Buffer.from(existing.dataBase64, 'base64') :
        undefined;
  } else {
    cachedResponse.body = existing.payload;
  }

  return {
    cached: true,
    response: cachedResponse,
    signature,
    kind: existing.kind ?? deriveKind(request.path, request.kind),
  };
}

export async function fetchMaptilerWithCache(
    prisma: PrismaClient,
    request: MaptilerRequestWithKind,
    options?: CacheOptions,
    ): Promise<MaptilerCacheResult> {
  const responseType: 'json'|'arrayBuffer' = request.responseType ?? 'json';
  const signature = fingerprint(request, responseType);
  const cached =
      await fetchMaptilerCacheOnly(prisma, request, options, signature);
  if (cached) return cached;

  const paramsHash = hashString(stableStringify(request.params ?? {}));
  const kind = deriveKind(request.path, request.kind);
  const response = await fetchMaptiler({...request, responseType});

  const expiresAt = options?.expiresAt ??
      deriveExpiresAt(response.cacheControl, options?.maxAgeMinutes);
  const nowDate = new Date();

  if (options?.actorId) {
    const entry: HttpCacheEntry = {
      signature,
      kind,
      path: request.path,
      method: request.method ?? 'GET',
      params: request.params ?? {},
      paramsHash,
      responseType,
      url: response.url,
      statusCode: response.status,
      payload: responseType === 'arrayBuffer' ? null : response.body ?? null,
      dataBase64: responseType === 'arrayBuffer' ?
          (response.data ? Buffer.from(response.data).toString('base64') :
                           undefined) :
          undefined,
      contentType: response.contentType,
      cacheControl: response.cacheControl,
      fetchedAt: nowDate.toISOString(),
      expiresAt: expiresAt ? expiresAt.toISOString() : undefined,
    };
    await writeHttpCacheEntry(
        prisma, options.actorId, HTTP_CACHE_NAMESPACE_MAPTILER, signature,
        entry, {
          maxAgeMinutes: options.maxAgeMinutes,
          expiresAt,
        });
  }

  return {cached: false, response, signature, kind};
}
