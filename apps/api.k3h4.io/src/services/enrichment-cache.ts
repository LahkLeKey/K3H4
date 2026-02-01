import {Prisma, type PrismaClient} from '@prisma/client';

import {readActorCache, writeActorCache} from './actor-cache';
import {CacheScope, ensureCacheActorId} from './cache-actor';

export type EnrichmentCacheKey = {
  provider: string; namespace: string; kind: string; sourceKey: string;
};

export type EnrichmentCacheEntry = {
  payload: Prisma.JsonValue|typeof Prisma.JsonNull|null; wikidataId: string | null;
  status: string | null;
  fetchedAt: string | null;
  note?: string | null;
  paramsHash?: string | null;
};

const CACHE_SCOPE: CacheScope = 'enrichment';

const buildCacheKey = (key: EnrichmentCacheKey) => JSON.stringify({
  provider: key.provider,
  namespace: key.namespace,
  kind: key.kind,
  sourceKey: key.sourceKey,
});

export async function readEnrichmentCache(
    prisma: PrismaClient,
    key: EnrichmentCacheKey,
) {
  const actorId = await ensureCacheActorId(prisma, CACHE_SCOPE);
  const entry = await readActorCache(prisma, actorId, buildCacheKey(key));
  if (!entry || typeof entry !== 'object') return null;
  return entry as EnrichmentCacheEntry;
}

export async function writeEnrichmentCache(
    prisma: PrismaClient,
    key: EnrichmentCacheKey,
    payload: EnrichmentCacheEntry,
    ttlMs?: number|null,
) {
  const actorId = await ensureCacheActorId(prisma, CACHE_SCOPE);
  await writeActorCache(prisma, actorId, buildCacheKey(key), payload as Prisma.JsonValue, ttlMs);
}
