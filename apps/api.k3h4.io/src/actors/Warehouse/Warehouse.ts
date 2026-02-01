import {Entity, LifecycleStatus, Prisma, PrismaClient, WarehouseCategory,} from '@prisma/client';

import {ACTOR_TYPES, ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {actorWhereUserType, buildUserActorCreateInput, ensureActor, PrismaTx} from '../../lib/actor-utils';
import {asRecord, readNumber, readString} from '../../lib/json-record';

const WAREHOUSE_ACTOR_LABEL = 'Warehouse Inventory';
const WAREHOUSE_ACTOR_NOTE = 'Ledger that tracks warehouse items and movements';
const WAREHOUSE_ENTITY_SOURCE = 'k3h4-warehouse';

const ensureWarehouseActorInternal =
    async (tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue) => {
  const criteria = actorWhereUserType(userId, ACTOR_TYPES.WAREHOUSE);
  const data: Prisma.ActorCreateInput = {
    type: ACTOR_TYPES.WAREHOUSE,
    label: WAREHOUSE_ACTOR_LABEL,
    source: WAREHOUSE_ENTITY_SOURCE,
    note: WAREHOUSE_ACTOR_NOTE,
  };
  if (metadata) data.metadata = metadata;
  return ensureActor(tx, {
    where: criteria,
    create: buildUserActorCreateInput(userId, data),
  });
};

export async function ensureWarehouseActor(
    tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue|null) {
  return ensureWarehouseActorInternal(tx, userId, metadata ?? undefined);
}

export async function findWarehouseActor(
    prisma: PrismaClient|Prisma.TransactionClient, userId: string) {
  return prisma.actor.findFirst({where: {userId, type: ACTOR_TYPES.WAREHOUSE}});
}

export async function deleteWarehouseActorWithEntities(
    tx: PrismaTx, userId: string) {
  await tx.entity.deleteMany({
    where: {actor: {userId, type: ACTOR_TYPES.WAREHOUSE}},
  });
  return tx.actor.deleteMany({where: {userId, type: ACTOR_TYPES.WAREHOUSE}});
}

export type WarehouseItemPayload = {
  id: string; userId: string; sku: string; description: string | null;
  quantity: number;
  location: string;
  status: LifecycleStatus;
  freightLoadId: string | null;
  category: WarehouseCategory;
  metadata: Record<string, unknown>| null;
  createdAt: string;
  updatedAt: string;
};

export const buildWarehouseItemPayload =
    (entity: Entity, userId: string): WarehouseItemPayload => {
      const metadata = asRecord(entity.metadata);
      const sku = readString(metadata, 'sku', {coerce: true});
      return {
        id: entity.id,
        userId,
        sku: sku ?? '',
        description: readString(metadata, 'description', {coerce: true}),
        quantity: readNumber(metadata, 'quantity') ?? 0,
        location: readString(metadata, 'location', {coerce: true}) ?? '',
        status: (readString(metadata, 'status', {coerce: true}) as
                 LifecycleStatus) ??
            LifecycleStatus.STORED,
        freightLoadId: readString(metadata, 'freightLoadId', {coerce: true}),
        category: (readString(metadata, 'category', {coerce: true}) as
                   WarehouseCategory) ??
            WarehouseCategory.OTHER,
        metadata: Object.keys(metadata).length ? metadata : null,
        createdAt: entity.createdAt.toISOString(),
        updatedAt: entity.updatedAt.toISOString(),
      };
    };
