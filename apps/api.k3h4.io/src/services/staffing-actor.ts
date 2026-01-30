import {ActorType, Entity, EntityKind, Prisma, PrismaClient} from '@prisma/client';

const STAFFING_ACTOR_LABEL = 'Staffing Ledger';
const STAFFING_ACTOR_NOTE =
    'Ledger that tracks staffing engagements, roles, candidates, shifts, and placements';
export const STAFFING_ACTOR_SOURCE = 'k3h4-staffing';
export const STAFFING_TARGET_TYPE = 'staffing';

type PrismaTx = PrismaClient|Prisma.TransactionClient;

const ensureActor = async (
    tx: PrismaTx, userId: string, type: ActorType, label: string,
    note: string|null, source: string) => {
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

export async function ensureStaffingActor(tx: PrismaTx, userId: string) {
  return ensureActor(
      tx, userId, ActorType.STAFFING, STAFFING_ACTOR_LABEL, STAFFING_ACTOR_NOTE,
      STAFFING_ACTOR_SOURCE);
}

export async function findStaffingActor(prisma: PrismaClient, userId: string) {
  return prisma.actor.findFirst({where: {userId, type: ActorType.STAFFING}});
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
          where: {actorId, kind: EntityKind.STAFFING_ENGAGEMENT},
          orderBy: {createdAt: 'desc'},
        }),
        prisma.entity.findMany({
          where: {actorId, kind: EntityKind.STAFFING_ROLE},
          orderBy: {createdAt: 'desc'},
        }),
        prisma.entity.findMany({
          where: {actorId, kind: EntityKind.STAFFING_CANDIDATE},
          orderBy: {createdAt: 'desc'},
        }),
        prisma.entity.findMany({
          where: {actorId, kind: EntityKind.STAFFING_SHIFT},
          orderBy: {createdAt: 'desc'},
        }),
        prisma.entity.findMany({
          where: {actorId, kind: EntityKind.STAFFING_PLACEMENT},
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
      actor: {userId, type: ActorType.STAFFING},
    },
  });
}

export async function deleteStaffingActorWithEntities(
    tx: PrismaTx, userId: string) {
  const entities = await tx.entity.deleteMany({
    where: {
      actor: {userId, type: ActorType.STAFFING},
    },
  });
  const actors = await tx.actor.deleteMany({
    where: {userId, type: ActorType.STAFFING},
  });
  return {entities, actors};
}