import {ActorType, type Entity, EntityKind, Prisma, type PrismaClient,} from '@prisma/client';

const AGRICULTURE_ACTOR_LABEL = 'Agriculture Farm';
const AGRICULTURE_ACTOR_NOTE = 'Ledger that tracks agricultural data';
const AGRICULTURE_ENTITY_SOURCE = 'k3h4-agriculture';

type PrismaTx = PrismaClient|Prisma.TransactionClient;

const asRecord = (value: Prisma.JsonValue|null|undefined) => {
  if (value && typeof value === 'object' && !Array.isArray(value))
    return value as Record<string, unknown>;
  return {} as Record<string, unknown>;
};

const ensureActor = async (
    tx: PrismaTx, userId: string, type: ActorType, label: string,
    note?: string|null, metadata?: Prisma.JsonValue) => {
  const criteria: Prisma.ActorWhereInput = {userId, type};
  const existing = await tx.actor.findFirst({where: criteria});
  if (existing) return existing;
  const data: Prisma.ActorCreateInput = {
    user: {connect: {id: userId}},
    type,
    label,
    source: AGRICULTURE_ENTITY_SOURCE,
  };
  if (note) data.note = note;
  if (metadata) data.metadata = metadata;
  return tx.actor.create({data});
};

export async function ensureAgricultureActor(
    tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue|null) {
  return ensureActor(
      tx,
      userId,
      ActorType.AGRICULTURE_FARM,
      AGRICULTURE_ACTOR_LABEL,
      AGRICULTURE_ACTOR_NOTE,
      metadata ?? undefined,
  );
}

export async function findAgricultureActor(
    prisma: PrismaClient|Prisma.TransactionClient, userId: string) {
  return prisma.actor.findFirst(
      {where: {userId, type: ActorType.AGRICULTURE_FARM}});
}

export async function deleteAgricultureActorWithEntities(
    tx: PrismaTx, userId: string) {
  const entities = await tx.entity.deleteMany({
    where: {
      actor: {userId, type: ActorType.AGRICULTURE_FARM},
    },
  });
  const actors = await tx.actor.deleteMany(
      {where: {userId, type: ActorType.AGRICULTURE_FARM}});
  return {entities, actors};
}

export type AgricultureSlotSnapshot = {
  id: string; slotIndex: number; costPaid: string; plotId: string | null;
  slug: string | null;
  unlockedAt: Date;
};

const slotMetadata = (entity: Entity) => asRecord(entity.metadata);

const plotTitle = (plot: Entity) => {
  const metadata = asRecord(plot.metadata);
  const name = metadata.name as string | undefined;
  const crop = metadata.crop as string | undefined;
  return name && crop ? `${name} (${crop})` : name ?? null;
};

export const buildAgricultureSlotSnapshotFromEntities =
    (slot: Entity, plot?: Entity|null): AgricultureSlotSnapshot => {
      const metadata = slotMetadata(slot);
      const slotIndexValue = Number(metadata.slotIndex ?? 0);
      const costPaid = metadata.costPaid ? String(metadata.costPaid) : '0.00';
      return {
        id: slot.id,
        slotIndex: Number.isFinite(slotIndexValue) ? slotIndexValue : 0,
        costPaid,
        plotId: slot.targetId || null,
        slug: plot ? plotTitle(plot) : null,
        unlockedAt: slot.createdAt,
      };
    };

export async function resolveAgricultureSlotSnapshot(
    prisma: PrismaClient|Prisma.TransactionClient, userId: string,
    slotId: string) {
  const actor = await findAgricultureActor(prisma, userId);
  if (!actor) return null;
  const slot = await prisma.entity.findFirst({
    where: {
      id: slotId,
      actorId: actor.id,
      kind: EntityKind.AGRICULTURE_SLOT,
    },
  });
  if (!slot) return null;
  let plot: Entity|null = null;
  if (slot.targetId) {
    plot = await prisma.entity.findUnique({where: {id: slot.targetId}});
  }
  return buildAgricultureSlotSnapshotFromEntities(slot, plot);
}
