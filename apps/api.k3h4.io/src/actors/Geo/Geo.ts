import {Prisma, PrismaClient} from '@prisma/client';

import {ACTOR_TYPES} from '../../lib/actor-entity-constants';
import {actorWhereUserType, buildUserActorCreateInput, ensureActor, PrismaTx} from '../../lib/actor-utils';

const GEO_ACTOR_LABEL = 'Geo Cache';
const GEO_ACTOR_NOTE = 'Actor owner for geo caches, routes, and views';
const GEO_ACTOR_SOURCE = 'k3h4-geo';
const GEO_GLOBAL_ACTOR_LABEL = 'Geo Cache (global)';
const GEO_GLOBAL_ACTOR_SOURCE = 'k3h4-geo-global';

const buildGeoActorCreateInput =
    (userId: string, metadata?: Prisma.JsonValue) => {
      const data: Prisma.ActorCreateInput = {
        type: ACTOR_TYPES.GEO,
        label: GEO_ACTOR_LABEL,
        source: GEO_ACTOR_SOURCE,
      };
      if (GEO_ACTOR_NOTE) data.note = GEO_ACTOR_NOTE;
      if (metadata) data.metadata = metadata;
      return buildUserActorCreateInput(userId, data);
    };

const ensureGeoActorInternal =
    async (tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue) => {
  const criteria = actorWhereUserType(userId, ACTOR_TYPES.GEO);
  const data = buildGeoActorCreateInput(userId, metadata);
  return ensureActor(tx, {where: criteria, create: data});
};

export async function ensureGeoActor(
    tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue|null) {
  return ensureGeoActorInternal(tx, userId, metadata ?? undefined);
}

export async function ensureGeoActorId(
    tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue|null) {
  const actor = await ensureGeoActor(tx, userId, metadata);
  return actor.id;
}

export async function findGeoActor(
    prisma: PrismaClient|Prisma.TransactionClient, userId: string) {
  return prisma.actor.findFirst({where: {userId, type: ACTOR_TYPES.GEO}});
}

export async function ensureGeoGlobalActor(
    prisma: PrismaClient|Prisma.TransactionClient) {
  const existing = await prisma.actor.findFirst({
    where: {
      userId: null,
      type: ACTOR_TYPES.GEO,
      source: GEO_GLOBAL_ACTOR_SOURCE,
    },
  });
  if (existing) return existing;
  return prisma.actor.create({
    data: {
      label: GEO_GLOBAL_ACTOR_LABEL,
      type: ACTOR_TYPES.GEO,
      source: GEO_GLOBAL_ACTOR_SOURCE,
      isGlobal: true,
    },
  });
}

export async function ensureGeoGlobalActorId(
    prisma: PrismaClient|Prisma.TransactionClient) {
  const actor = await ensureGeoGlobalActor(prisma);
  return actor.id;
}
