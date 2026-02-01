import {Prisma, PrismaClient} from '@prisma/client';

import {ACTOR_TYPES} from '../../lib/actor-entity-constants';
import {actorWhereUserType, buildUserActorCreateInput, ensureActor, PrismaTx} from '../../lib/actor-utils';

const OLLAMA_ACTOR_LABEL = 'Ollama Operations';
const OLLAMA_ACTOR_SOURCE = 'k3h4-ollama';

export async function ensureOllamaOperationsActor(
    tx: PrismaTx, userId: string) {
  const criteria = actorWhereUserType(userId, ACTOR_TYPES.AI_OPERATION);
  const data: Prisma.ActorCreateInput = {
    type: ACTOR_TYPES.AI_OPERATION,
    label: OLLAMA_ACTOR_LABEL,
    source: OLLAMA_ACTOR_SOURCE,
  };
  return ensureActor(tx, {
    where: criteria,
    create: buildUserActorCreateInput(userId, data),
  });
}

export async function findOllamaOperationsActor(
    prisma: PrismaClient|Prisma.TransactionClient, userId: string) {
  return prisma.actor.findFirst({
    where: {userId, type: ACTOR_TYPES.AI_OPERATION},
  });
}
