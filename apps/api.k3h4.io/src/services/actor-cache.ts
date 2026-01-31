import {Prisma} from '@prisma/client';
import type {PrismaClient} from '@prisma/client';

const ACTOR_CACHE_TTL_MS =
    Number(process.env.ACTOR_CACHE_TTL_MS ?? 1000 * 60 * 5);
const ENTITY_CACHE_TTL_MS =
    Number(process.env.ENTITY_CACHE_TTL_MS ?? 1000 * 60 * 5);

const coerceTtl = (value?: number|null) => {
  if (value === undefined || value === null) return null;
  return Number.isFinite(value) && value > 0 ? value : null;
};

const buildExpiresAt = (ttlMs: number|null) =>
    ttlMs === null ? null : new Date(Date.now() + ttlMs);

const now = () => new Date();

const normalizePayload = (value: Prisma.JsonValue): Prisma.InputJsonValue|
                         Prisma.NullableJsonNullValueInput =>
    value === null ? Prisma.JsonNull : value as Prisma.InputJsonValue;

export async function readActorCache(
    prisma: PrismaClient,
    actorId: string,
    key: string,
) {
  const entry = await prisma.actorCache.findFirst({
    where: {
      actorId,
      key,
      OR: [{expiresAt: null}, {expiresAt: {gt: now()}}],
    },
  });
  return entry?.payload ?? null;
}

export async function writeActorCache(
    prisma: PrismaClient,
    actorId: string,
    key: string,
    payload: Prisma.JsonValue,
    ttlMs?: number|null,
) {
  const resolvedTtl =
      ttlMs === null ? null : coerceTtl(ttlMs ?? ACTOR_CACHE_TTL_MS);
  const expiresAt = buildExpiresAt(resolvedTtl);
  const normalizedPayload = normalizePayload(payload);
  await prisma.actorCache.upsert({
    where: {actor_cache_key: {actorId, key}},
    create: {actorId, key, payload: normalizedPayload, expiresAt},
    update: {payload: normalizedPayload, expiresAt},
  });
}

export async function deleteActorCache(
    prisma: PrismaClient,
    actorId: string,
    key: string,
) {
  await prisma.actorCache.deleteMany({where: {actorId, key}});
}

export async function cleanupActorCache(prisma: PrismaClient) {
  await prisma.actorCache.deleteMany({where: {expiresAt: {lt: now()}}});
}

export async function readEntityCache(
    prisma: PrismaClient,
    entityId: string,
    key: string,
) {
  const entry = await prisma.entityCache.findFirst({
    where: {
      entityId,
      key,
      OR: [{expiresAt: null}, {expiresAt: {gt: now()}}],
    },
  });
  return entry?.payload ?? null;
}

export async function writeEntityCache(
    prisma: PrismaClient,
    entityId: string,
    key: string,
    payload: Prisma.JsonValue,
    ttlMs?: number|null,
) {
  const expiresAt = buildExpiresAt(coerceTtl(ttlMs ?? ENTITY_CACHE_TTL_MS));
  const normalizedPayload = normalizePayload(payload);
  await prisma.entityCache.upsert({
    where: {entity_cache_key: {entityId, key}},
    create: {entityId, key, payload: normalizedPayload, expiresAt},
    update: {payload: normalizedPayload, expiresAt},
  });
}

export async function deleteEntityCache(
    prisma: PrismaClient,
    entityId: string,
    key: string,
) {
  await prisma.entityCache.deleteMany({where: {entityId, key}});
}

export async function cleanupEntityCache(prisma: PrismaClient) {
  await prisma.entityCache.deleteMany({where: {expiresAt: {lt: now()}}});
}
