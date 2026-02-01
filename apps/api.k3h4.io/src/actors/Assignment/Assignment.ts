import {Entity, Prisma, PrismaClient} from '@prisma/client';

import {ACTOR_TYPES, ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {actorWhereUserType, buildUserActorCreateInput, ensureActor, PrismaTx} from '../../lib/actor-utils';

const ASSIGNMENT_ACTOR_LABEL = 'Assignment Ledger';
const ASSIGNMENT_ACTOR_NOTE =
    'Ledger that tracks assignments, timecards, and payouts';
export const ASSIGNMENT_ACTOR_SOURCE = 'k3h4-assignment';
export const ASSIGNMENT_TARGET_TYPE = 'assignment';

const ensureAssignmentActorInternal = async (
    tx: PrismaTx,
    userId: string,
    ) => {
  const criteria = actorWhereUserType(userId, ACTOR_TYPES.ASSIGNMENT);
  const data: Prisma.ActorCreateInput = {
    type: ACTOR_TYPES.ASSIGNMENT,
    label: ASSIGNMENT_ACTOR_LABEL,
    source: ASSIGNMENT_ACTOR_SOURCE,
    note: ASSIGNMENT_ACTOR_NOTE,
  };
  return ensureActor(tx, {
    where: criteria,
    create: buildUserActorCreateInput(userId, data),
  });
};

export async function ensureAssignmentActor(tx: PrismaTx, userId: string) {
  return ensureAssignmentActorInternal(tx, userId);
}

export async function findAssignmentActor(
    prisma: PrismaClient, userId: string) {
  return prisma.actor.findFirst({
    where: {userId, type: ACTOR_TYPES.ASSIGNMENT},
  });
}

export async function loadAssignmentActorEntities(
    prisma: PrismaClient, actorId: string) {
  const [assignments, timecards, payouts] = await Promise.all([
    prisma.entity.findMany({
      where: {actorId, kind: ENTITY_KINDS.ASSIGNMENT},
      orderBy: {createdAt: 'desc'},
    }),
    prisma.entity.findMany({
      where: {
        actorId,
        kind: ENTITY_KINDS.ASSIGNMENT_TIMECARD,
        targetType: ASSIGNMENT_TARGET_TYPE,
        targetId: {not: null},
      },
      orderBy: {createdAt: 'desc'},
    }),
    prisma.entity.findMany({
      where: {
        actorId,
        kind: ENTITY_KINDS.ASSIGNMENT_PAYOUT,
        targetType: ASSIGNMENT_TARGET_TYPE,
        targetId: {not: null},
      },
      orderBy: {createdAt: 'desc'},
    }),
  ]);
  return {assignments, timecards, payouts};
}

export type AssignmentDetails = {
  assignment: Entity; timecards: Entity[]; payouts: Entity[];
};

export async function loadAssignmentDetails(
    prisma: PrismaClient, userId: string, assignmentId: string) {
  const assignment = await prisma.entity.findFirst({
    where: {
      id: assignmentId,
      kind: ENTITY_KINDS.ASSIGNMENT,
      actor: {userId, type: ACTOR_TYPES.ASSIGNMENT},
    },
  });
  if (!assignment) return null;
  const [timecards, payouts] = await Promise.all([
    prisma.entity.findMany({
      where: {
        kind: ENTITY_KINDS.ASSIGNMENT_TIMECARD,
        targetType: ASSIGNMENT_TARGET_TYPE,
        targetId: assignmentId,
        actor: {userId, type: ACTOR_TYPES.ASSIGNMENT},
      },
      orderBy: {createdAt: 'desc'},
    }),
    prisma.entity.findMany({
      where: {
        kind: ENTITY_KINDS.ASSIGNMENT_PAYOUT,
        targetType: ASSIGNMENT_TARGET_TYPE,
        targetId: assignmentId,
        actor: {userId, type: ACTOR_TYPES.ASSIGNMENT},
      },
      orderBy: {createdAt: 'desc'},
    }),
  ]);
  return {assignment, timecards, payouts};
}
