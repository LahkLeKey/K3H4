import {EntityKind, Prisma, PrismaClient} from '@prisma/client';

import {ensureAuthActor, findAuthActor} from './auth-actor';

const AUTH_ENTITY_SOURCE = 'k3h4-api-auth';
const REFRESH_TOKEN_TARGET_TYPE = 'refresh-token';
const PROVIDER_GRANT_TARGET_TYPE = 'provider-grant';
const REFRESH_NAME = 'refresh-token';
const PROVIDER_NAME = 'provider-grant';

const buildProviderTargetId = (provider: string, providerId: string) =>
    `${provider}:${providerId}`;

type PrismaTx = PrismaClient|Prisma.TransactionClient;

export const storeRefreshToken = async (
    prisma: PrismaTx, userId: string, token: string, expiresAt: Date) => {
  const actor = await ensureAuthActor(prisma, userId);
  return prisma.entity.create({
    data: {
      actorId: actor.id,
      kind: EntityKind.AUTH_REFRESH_TOKEN,
      name: REFRESH_NAME,
      targetType: REFRESH_TOKEN_TARGET_TYPE,
      targetId: token,
      source: AUTH_ENTITY_SOURCE,
      metadata: {
        token,
        expiresAt: expiresAt.toISOString(),
      },
    },
  });
};

export const findRefreshTokenEntity = async (
    prisma: PrismaTx, token: string) => {
  return prisma.entity.findFirst({
    where: {
      kind: EntityKind.AUTH_REFRESH_TOKEN,
      targetType: REFRESH_TOKEN_TARGET_TYPE,
      targetId: token,
    },
    include: {actor: {select: {userId: true}}},
  });
};

export const deleteRefreshTokensForUser = async (
    prisma: PrismaTx, userId: string) => {
  const actor = await findAuthActor(prisma, userId);
  if (!actor) return {count: 0};
  return prisma.entity.deleteMany({
    where: {
      actorId: actor.id,
      targetType: REFRESH_TOKEN_TARGET_TYPE,
    },
  });
};

export type ProviderGrantEntry = {metadata: Prisma.JsonValue|null};

export const upsertProviderGrant = async (
    prisma: PrismaTx, userId: string, provider: string, providerId: string,
    accessToken: string, scope: string|null, expiresAt: Date|null) => {
  const actor = await ensureAuthActor(prisma, userId);
  const targetId = buildProviderTargetId(provider, providerId);
  const metadata: Prisma.JsonObject = {
    provider,
    providerId,
    accessToken,
    scope: scope ?? null,
    expiresAt: expiresAt ? expiresAt.toISOString() : null,
  };
  const existing = await prisma.entity.findFirst({
    where: {
      actorId: actor.id,
      targetType: PROVIDER_GRANT_TARGET_TYPE,
      targetId,
    },
    select: {id: true},
  });
  if (existing) {
    return prisma.entity.update(
        {where: {id: existing.id}, data: {metadata}});
  }
  return prisma.entity.create({
    data: {
      actorId: actor.id,
      kind: EntityKind.AUTH_PROVIDER_GRANT,
      name: PROVIDER_NAME,
      targetType: PROVIDER_GRANT_TARGET_TYPE,
      targetId,
      source: AUTH_ENTITY_SOURCE,
      metadata,
    },
  });
};

export const readProviderGrantsForUser = async (
    prisma: PrismaTx, userId: string) => {
  const actor = await findAuthActor(prisma, userId);
  if (!actor) return [] as ProviderGrantEntry[];
  return prisma.entity.findMany({
    where: {
      actorId: actor.id,
      targetType: PROVIDER_GRANT_TARGET_TYPE,
    },
    select: {metadata: true},
  });
};

export const deleteProviderGrantsForUser = async (
    prisma: PrismaTx, userId: string) => {
  const actor = await findAuthActor(prisma, userId);
  if (!actor) return {count: 0};
  return prisma.entity.deleteMany({
    where: {
      actorId: actor.id,
      targetType: PROVIDER_GRANT_TARGET_TYPE,
    },
  });
};
