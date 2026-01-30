import {ActorType, Entity, EntityKind, Prisma, PrismaClient} from '@prisma/client';

const ASSIGNMENT_ACTOR_LABEL = 'Assignment Ledger';
const ASSIGNMENT_ACTOR_NOTE =
    'Ledger that tracks assignments, timecards, and payouts';
export const ASSIGNMENT_ACTOR_SOURCE = 'k3h4-assignment';
export const ASSIGNMENT_TARGET_TYPE = 'assignment';

type PrismaTx = PrismaClient|Prisma.TransactionClient;

const ensureActor = async (
    tx: PrismaTx,
    userId: string,
    type: ActorType,
    label: string,
    note: string|null,
    source: string,
    ) => {
  const criteria: Prisma.ActorWhereInput = {userId, type};
  const existing = await tx.actor.findFirst({where: criteria});
  if (existing) return existing;
  const data: Prisma.ActorCreateInput = {
    type,
    label,
    user: {connect: {id: userId}},
    source,
  };
  if (note) data.note = note;
  return tx.actor.create({data});
};

export async function ensureAssignmentActor(tx: PrismaTx, userId: string) {
  return ensureActor(
      tx, userId, ActorType.ASSIGNMENT, ASSIGNMENT_ACTOR_LABEL,
      ASSIGNMENT_ACTOR_NOTE, ASSIGNMENT_ACTOR_SOURCE);
}

export async function findAssignmentActor(
    prisma: PrismaClient, userId: string) {
  return prisma.actor.findFirst({where: {userId, type: ActorType.ASSIGNMENT}});
}

export async function loadAssignmentActorEntities(
    prisma: PrismaClient, actorId: string) {
  const [assignments, timecards, payouts] = await Promise.all([
    prisma.entity.findMany({
      where: {actorId, kind: EntityKind.ASSIGNMENT},
      orderBy: {createdAt: 'desc'},
    }),
    prisma.entity.findMany({
      where: {
        actorId,
        kind: EntityKind.ASSIGNMENT_TIMECARD,
        targetType: ASSIGNMENT_TARGET_TYPE,
        targetId: {not: null},
      },
      orderBy: {createdAt: 'desc'},
    }),
    prisma.entity.findMany({
      where: {
        actorId,
        kind: EntityKind.ASSIGNMENT_PAYOUT,
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
      kind: EntityKind.ASSIGNMENT,
      actor: {userId, type: ActorType.ASSIGNMENT},
    },
  });
  if (!assignment) return null;
  const [timecards, payouts] = await Promise.all([
    prisma.entity.findMany({
      where: {
        kind: EntityKind.ASSIGNMENT_TIMECARD,
        targetType: ASSIGNMENT_TARGET_TYPE,
        targetId: assignmentId,
        actor: {userId, type: ActorType.ASSIGNMENT},
      },
      orderBy: {createdAt: 'desc'},
    }),
    prisma.entity.findMany({
      where: {
        kind: EntityKind.ASSIGNMENT_PAYOUT,
        targetType: ASSIGNMENT_TARGET_TYPE,
        targetId: assignmentId,
        actor: {userId, type: ActorType.ASSIGNMENT},
      },
      orderBy: {createdAt: 'desc'},
    }),
  ]);
  return {assignment, timecards, payouts};
}