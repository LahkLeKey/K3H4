import { type Prisma, type PrismaClient } from "@prisma/client";
import type { EnrichedPoi } from "./types";
import { readActorCache, writeActorCache } from "../../services/actor-cache";
import { CacheScope, ensureCacheActorId } from "../../services/cache-actor";

const ONE_HOUR_MS = 60 * 60 * 1000;
const ENRICHMENT_SCOPE: CacheScope = "enrichment";

const buildKey = (id: string, includeHash: string) =>
  `poi.enrich:${id}:${includeHash}`;

type PoiEnrichmentCachePayload = {
  payload: EnrichedPoi;
  fetchedAt: string;
  expiresAt: string | null;
};

const toDate = (value: PoiEnrichmentCachePayload["expiresAt"]) =>
  value ? new Date(value) : null;

export async function readCachedEnrichment(
  prisma: PrismaClient,
  id: string,
  includeHash: string,
): Promise<EnrichedPoi | null> {
  const key = buildKey(id, includeHash);
  const actorId = await ensureCacheActorId(prisma, ENRICHMENT_SCOPE);
  const cached =
    (await readActorCache(prisma, actorId, key)) as
      | PoiEnrichmentCachePayload
      | null;
  if (!cached) return null;
  const expiresAt = toDate(cached.expiresAt);
  if (expiresAt && expiresAt.getTime() <= Date.now()) return null;
  return cached.payload;
}

export async function writeCachedEnrichment(
  prisma: PrismaClient,
  id: string,
  includeHash: string,
  payload: EnrichedPoi,
  ttlMs?: number,
): Promise<void> {
  const now = new Date();
  const key = buildKey(id, includeHash);
  const actorId = await ensureCacheActorId(prisma, ENRICHMENT_SCOPE);
  const resolvedTtl = Math.max(0, ttlMs ?? ONE_HOUR_MS);
  const entry: PoiEnrichmentCachePayload = {
    payload,
    fetchedAt: now.toISOString(),
    expiresAt: resolvedTtl ?
        new Date(now.getTime() + resolvedTtl).toISOString() :
        null,
  };
  await writeActorCache(
    prisma,
    actorId,
    key,
    entry as Prisma.JsonValue,
    resolvedTtl,
  );
}
