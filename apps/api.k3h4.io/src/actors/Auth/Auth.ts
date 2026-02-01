import {Prisma, PrismaClient} from '@prisma/client';

import {ACTOR_TYPES} from '../../lib/actor-entity-constants';
import {actorWhereUserType, buildUserActorCreateInput, ensureActor, PrismaTx} from '../../lib/actor-utils';

const AUTH_ACTOR_LABEL = 'Auth Data';
const AUTH_ACTOR_NOTE = 'Actor owner for refresh tokens and provider grants';
const AUTH_ACTOR_SOURCE = 'k3h4-api-auth';

const buildAuthActorCreateInput =
    (userId: string, metadata?: Prisma.JsonValue) => {
      const data: Prisma.ActorCreateInput = {
        type: ACTOR_TYPES.AUTH,
        label: AUTH_ACTOR_LABEL,
        source: AUTH_ACTOR_SOURCE,
      };
      if (AUTH_ACTOR_NOTE) data.note = AUTH_ACTOR_NOTE;
      if (metadata) data.metadata = metadata;
      return buildUserActorCreateInput(userId, data);
    };

const ensureAuthActorInternal =
    async (tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue) => {
  const criteria = actorWhereUserType(userId, ACTOR_TYPES.AUTH);
  const data = buildAuthActorCreateInput(userId, metadata);
  return ensureActor(tx, {where: criteria, create: data});
};

export async function ensureAuthActor(
    tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue|null) {
  return ensureAuthActorInternal(tx, userId, metadata ?? undefined);
}

export async function ensureAuthActorId(
    tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue|null) {
  const actor = await ensureAuthActor(tx, userId, metadata);
  return actor.id;
}

export async function findAuthActor(
    prisma: PrismaClient|Prisma.TransactionClient, userId: string) {
  return prisma.actor.findFirst({
    where: {userId, type: ACTOR_TYPES.AUTH},
  });
}
