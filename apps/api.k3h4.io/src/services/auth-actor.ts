import {ActorType, Prisma, PrismaClient} from '@prisma/client';

const AUTH_ACTOR_LABEL = 'Auth Data';
const AUTH_ACTOR_NOTE = 'Actor owner for refresh tokens and provider grants';
const AUTH_ACTOR_SOURCE = 'k3h4-api-auth';

type PrismaTx = PrismaClient|Prisma.TransactionClient;

const ensureActor = async (
    tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue) => {
  const criteria: Prisma.ActorWhereInput = {userId, type: ActorType.AUTH};
  const existing = await tx.actor.findFirst({where: criteria});
  if (existing) return existing;
  const data: Prisma.ActorCreateInput = {
    user: {connect: {id: userId}},
    type: ActorType.AUTH,
    label: AUTH_ACTOR_LABEL,
    source: AUTH_ACTOR_SOURCE,
  };
  if (AUTH_ACTOR_NOTE) data.note = AUTH_ACTOR_NOTE;
  if (metadata) data.metadata = metadata;
  return tx.actor.create({data});
};

export async function ensureAuthActor(
    tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue|null) {
  return ensureActor(tx, userId, metadata ?? undefined);
}

export async function ensureAuthActorId(
    tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue|null) {
  const actor = await ensureAuthActor(tx, userId, metadata);
  return actor.id;
}

export async function findAuthActor(
    prisma: PrismaClient|Prisma.TransactionClient, userId: string) {
  return prisma.actor.findFirst({where: {userId, type: ActorType.AUTH}});
}
