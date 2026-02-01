import {type Entity, Prisma, type PrismaClient} from '@prisma/client';

import {ACTOR_TYPES, ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {actorWhereUserType, buildUserActorCreateInput, ensureActor, PrismaTx} from '../../lib/actor-utils';
import {asRecord} from '../../lib/json-record';

const AGRICULTURE_ACTOR_LABEL = 'Agriculture Farm';
const AGRICULTURE_ACTOR_NOTE = 'Ledger that tracks agricultural data';
const AGRICULTURE_ENTITY_SOURCE = 'k3h4-agriculture';

const ensureAgricultureActorInternal =
    async (tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue) => {
  const criteria = actorWhereUserType(userId, ACTOR_TYPES.AGRICULTURE_FARM);
  const data: Prisma.ActorCreateInput = {
    type: ACTOR_TYPES.AGRICULTURE_FARM,
    label: AGRICULTURE_ACTOR_LABEL,
    source: AGRICULTURE_ENTITY_SOURCE,
    note: AGRICULTURE_ACTOR_NOTE,
  };
  if (metadata) data.metadata = metadata;
  return ensureActor(tx, {
    where: criteria,
    create: buildUserActorCreateInput(userId, data),
  });
};

export async function ensureAgricultureActor(
    tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue|null) {
  return ensureAgricultureActorInternal(tx, userId, metadata ?? undefined);
}

export async function findAgricultureActor(
    prisma: PrismaClient|Prisma.TransactionClient, userId: string) {
  return prisma.actor.findFirst(
      {where: {userId, type: ACTOR_TYPES.AGRICULTURE_FARM}});
}

export async function deleteAgricultureActorWithEntities(
    tx: PrismaTx, userId: string) {
  const entities = await tx.entity.deleteMany({
    where: {
      actor: {userId, type: ACTOR_TYPES.AGRICULTURE_FARM},
    },
  });
  const actors = await tx.actor.deleteMany(
      {where: {userId, type: ACTOR_TYPES.AGRICULTURE_FARM}});
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
      kind: ENTITY_KINDS.AGRICULTURE_SLOT,
    },
  });
  if (!slot) return null;
  let plot: Entity|null = null;
  if (slot.targetId) {
    plot = await prisma.entity.findUnique({where: {id: slot.targetId}});
  }
  return buildAgricultureSlotSnapshotFromEntities(slot, plot);
}
