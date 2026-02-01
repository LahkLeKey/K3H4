import {Prisma, PrismaClient} from '@prisma/client';

import {ACTOR_TYPES} from '../../lib/actor-entity-constants';
import {actorWhereUserType, buildUserActorCreateInput, ensureActor, PrismaTx} from '../../lib/actor-utils';

const CULINARY_ACTOR_LABEL = 'Culinary ledger';
const CULINARY_ACTOR_SOURCE = 'k3h4-culinary';

export async function ensureCulinaryActor(tx: PrismaTx, userId: string) {
  const criteria = actorWhereUserType(userId, ACTOR_TYPES.CULINARY);
  const data: Prisma.ActorCreateInput = {
    type: ACTOR_TYPES.CULINARY,
    label: CULINARY_ACTOR_LABEL,
    source: CULINARY_ACTOR_SOURCE,
  };
  return ensureActor(tx, {
    where: criteria,
    create: buildUserActorCreateInput(userId, data),
  });
}

export async function findCulinaryActor(
    prisma: PrismaClient|Prisma.TransactionClient, userId: string) {
  return prisma.actor.findFirst({
    where: {userId, type: ACTOR_TYPES.CULINARY},
  });
}
