import {Prisma, PrismaClient} from '@prisma/client';

import {ACTOR_TYPES} from '../../lib/actor-entity-constants';

const POI_GLOBAL_ACTOR_LABEL = 'Points of Interest';
const POI_GLOBAL_ACTOR_SOURCE = 'k3h4-pois';

export async function ensurePoiGlobalActor(
    prisma: PrismaClient|Prisma.TransactionClient) {
  const existing = await prisma.actor.findFirst({
    where: {
      userId: null,
      type: ACTOR_TYPES.POINT_OF_INTEREST,
      source: POI_GLOBAL_ACTOR_SOURCE,
    },
  });
  if (existing) return existing;
  return prisma.actor.create({
    data: {
      label: POI_GLOBAL_ACTOR_LABEL,
      type: ACTOR_TYPES.POINT_OF_INTEREST,
      source: POI_GLOBAL_ACTOR_SOURCE,
      isGlobal: true,
    },
  });
}

export async function ensurePoiGlobalActorId(
    prisma: PrismaClient|Prisma.TransactionClient) {
  const actor = await ensurePoiGlobalActor(prisma);
  return actor.id;
}
