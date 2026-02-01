import {Prisma, PrismaClient} from '@prisma/client';

import {readActorCache, writeActorCache} from './actor-cache';
import {ensureCacheActorId} from './cache-actor';

export type ApiCacheKey = {
  provider: string; scope: string; endpoint: string; paramsHash: string;
};

type ApiCacheMetadata = {
  fetchedAt: string; expiresAt: string | null;
};

type ApiCacheRecord = {
  payload: Prisma.JsonValue|null; metadata: ApiCacheMetadata | null;
};

const PAYLOAD_PREFIX = 'api-cache:payload:';
const META_PREFIX = 'api-cache:meta:';

const buildBaseKey = (key: ApiCacheKey) =>
    `${key.provider}:${key.scope}:${key.endpoint}:${key.paramsHash}`;

const buildPayloadKey = (key: ApiCacheKey) =>
    PAYLOAD_PREFIX + buildBaseKey(key);
const buildMetaKey = (key: ApiCacheKey) => META_PREFIX + buildBaseKey(key);

const normalizeMetadata =
    (value: Prisma.JsonValue|null): ApiCacheMetadata|null => {
      if (!value || typeof value !== 'object') return null;
      const record = value as Record<string, unknown>;
      const fetchedAt =
          typeof record.fetchedAt === 'string' ? record.fetchedAt : null;
      if (!fetchedAt) return null;
      const expiresAt = record.expiresAt === null ? null :
          typeof record.expiresAt === 'string'    ? record.expiresAt :
                                                    null;
      return {fetchedAt, expiresAt};
    };

export async function readApiCache(
    prisma: PrismaClient, key: ApiCacheKey): Promise<ApiCacheRecord> {
  const actorId = await ensureCacheActorId(prisma, 'api');
  const [payload, metadata] = await Promise.all([
    readActorCache(prisma, actorId, buildPayloadKey(key)),
    readActorCache(prisma, actorId, buildMetaKey(key)),
  ]);
  return {payload, metadata: normalizeMetadata(metadata)};
}

export async function writeApiCache(
    prisma: PrismaClient, key: ApiCacheKey, payload: Prisma.JsonValue,
    metadata: ApiCacheMetadata) {
  const actorId = await ensureCacheActorId(prisma, 'api');
  await Promise.all([
    writeActorCache(prisma, actorId, buildPayloadKey(key), payload),
    writeActorCache(prisma, actorId, buildMetaKey(key), metadata),
  ]);
}
