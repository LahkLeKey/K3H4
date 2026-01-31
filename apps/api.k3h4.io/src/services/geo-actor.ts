import {ActorType, Prisma, PrismaClient} from '@prisma/client';

const GEO_ACTOR_LABEL = 'Geo Cache';
const GEO_ACTOR_NOTE = 'Actor owner for geo caches, routes, and views';
const GEO_ACTOR_SOURCE = 'k3h4-geo';
const GEO_GLOBAL_ACTOR_LABEL = 'Geo Cache (global)';
const GEO_GLOBAL_ACTOR_SOURCE = 'k3h4-geo-global';

type PrismaTx = PrismaClient|Prisma.TransactionClient;

const ensureActor =
    async (tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue) => {
  const criteria: Prisma.ActorWhereInput = {userId, type: ActorType.GEO};
  const existing = await tx.actor.findFirst({where: criteria});
  if (existing) return existing;
  const data: Prisma.ActorCreateInput = {
    user: {connect: {id: userId}},
    type: ActorType.GEO,
    label: GEO_ACTOR_LABEL,
    source: GEO_ACTOR_SOURCE,
  };
  if (GEO_ACTOR_NOTE) data.note = GEO_ACTOR_NOTE;
  if (metadata) data.metadata = metadata;
  return tx.actor.create({data});
};

export async function ensureGeoActor(
    tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue|null) {
  return ensureActor(tx, userId, metadata ?? undefined);
}

export async function ensureGeoActorId(
    tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue|null) {
  const actor = await ensureGeoActor(tx, userId, metadata);
  return actor.id;
}

export async function findGeoActor(
    prisma: PrismaClient|Prisma.TransactionClient, userId: string) {
  return prisma.actor.findFirst({where: {userId, type: ActorType.GEO}});
}

export async function ensureGeoGlobalActor(
    prisma: PrismaClient|Prisma.TransactionClient) {
  const existing = await prisma.actor.findFirst({
    where: {
      userId: null,
      type: ActorType.GEO,
      source: GEO_GLOBAL_ACTOR_SOURCE,
    },
  });
  if (existing) return existing;
  return prisma.actor.create({
    data: {
      label: GEO_GLOBAL_ACTOR_LABEL,
      type: ActorType.GEO,
      source: GEO_GLOBAL_ACTOR_SOURCE,
    },
  });
}

export async function ensureGeoGlobalActorId(
    prisma: PrismaClient|Prisma.TransactionClient) {
  const actor = await ensureGeoGlobalActor(prisma);
  return actor.id;
}
