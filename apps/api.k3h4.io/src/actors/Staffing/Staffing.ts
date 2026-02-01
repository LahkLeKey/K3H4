import {Entity, Prisma, PrismaClient} from '@prisma/client';

import {ACTOR_TYPES, ENTITY_KINDS, type EntityKind} from '../../lib/actor-entity-constants';
import {actorWhereUserType, buildUserActorCreateInput, ensureActor, PrismaTx} from '../../lib/actor-utils';

const STAFFING_ACTOR_LABEL = 'Staffing Ledger';
const STAFFING_ACTOR_NOTE =
    'Ledger that tracks staffing engagements, roles, candidates, shifts, and placements';
export const STAFFING_ACTOR_SOURCE = 'k3h4-staffing';
export const STAFFING_TARGET_TYPE = 'staffing';

const ensureStaffingActorInternal = async (tx: PrismaTx, userId: string) => {
  const criteria = actorWhereUserType(userId, ACTOR_TYPES.STAFFING);
  const data: Prisma.ActorCreateInput = {
    type: ACTOR_TYPES.STAFFING,
    label: STAFFING_ACTOR_LABEL,
    source: STAFFING_ACTOR_SOURCE,
    note: STAFFING_ACTOR_NOTE,
  };
  return ensureActor(tx, {
    where: criteria,
    create: buildUserActorCreateInput(userId, data),
  });
};

export async function ensureStaffingActor(tx: PrismaTx, userId: string) {
  return ensureStaffingActorInternal(tx, userId);
}

export async function findStaffingActor(prisma: PrismaClient, userId: string) {
  return prisma.actor.findFirst({
    where: {userId, type: ACTOR_TYPES.STAFFING},
  });
}

export type StaffingEntityCollections = {
  engagements: Entity[]; roles: Entity[]; candidates: Entity[];
  shifts: Entity[];
  placements: Entity[];
};

export async function loadStaffingEntities(
    prisma: PrismaClient, actorId: string): Promise<StaffingEntityCollections> {
  const [engagements, roles, candidates, shifts, placements] =
      await Promise.all([
        prisma.entity.findMany({
          where: {actorId, kind: ENTITY_KINDS.STAFFING_ENGAGEMENT},
          orderBy: {createdAt: 'desc'},
        }),
        prisma.entity.findMany({
          where: {actorId, kind: ENTITY_KINDS.STAFFING_ROLE},
          orderBy: {createdAt: 'desc'},
        }),
        prisma.entity.findMany({
          where: {actorId, kind: ENTITY_KINDS.STAFFING_CANDIDATE},
          orderBy: {createdAt: 'desc'},
        }),
        prisma.entity.findMany({
          where: {actorId, kind: ENTITY_KINDS.STAFFING_SHIFT},
          orderBy: {createdAt: 'desc'},
        }),
        prisma.entity.findMany({
          where: {actorId, kind: ENTITY_KINDS.STAFFING_PLACEMENT},
          orderBy: {createdAt: 'desc'},
        }),
      ]);
  return {engagements, roles, candidates, shifts, placements};
}

export async function loadStaffingEntityByKind(
    prisma: PrismaClient, userId: string, kind: EntityKind, id: string) {
  return prisma.entity.findFirst({
    where: {
      id,
      kind,
      actor: {userId, type: ACTOR_TYPES.STAFFING},
    },
  });
}

export async function deleteStaffingActorWithEntities(
    tx: PrismaTx, userId: string) {
  const entities = await tx.entity.deleteMany({
    where: {
      actor: {userId, type: ACTOR_TYPES.STAFFING},
    },
  });
  const actors = await tx.actor.deleteMany({
    where: {userId, type: ACTOR_TYPES.STAFFING},
  });
  return {entities, actors};
}
