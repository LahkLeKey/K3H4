import {ActorType, Entity, EntityKind, LifecycleStatus, Prisma, PrismaClient, WarehouseCategory,} from '@prisma/client';

const WAREHOUSE_ACTOR_LABEL = 'Warehouse Inventory';
const WAREHOUSE_ACTOR_NOTE = 'Ledger that tracks warehouse items and movements';
const WAREHOUSE_ENTITY_SOURCE = 'k3h4-warehouse';

type PrismaTx = PrismaClient|Prisma.TransactionClient;

const asRecord = (value: Prisma.JsonValue|null|undefined) => {
  if (value && typeof value === 'object' && !Array.isArray(value))
    return value as Record<string, unknown>;
  return {} as Record<string, unknown>;
};

const metadataString = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  if (typeof value === 'string') return value;
  if (value != null) return String(value);
  return null;
};

const metadataNumber = (record: Record<string, unknown>, key: string) => {
  const value = record[key];
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const ensureActor = async (
    tx: PrismaTx, userId: string, type: ActorType, label: string,
    note?: string|null, metadata?: Prisma.JsonValue) => {
  const criteria: Prisma.ActorWhereInput = {userId, type};
  const existing = await tx.actor.findFirst({where: criteria});
  if (existing) return existing;
  const data: Prisma.ActorCreateInput = {
    type,
    label,
    user: {connect: {id: userId}},
    source: WAREHOUSE_ENTITY_SOURCE,
  };
  if (note) data.note = note;
  if (metadata) data.metadata = metadata;
  return tx.actor.create({data});
};

export async function ensureWarehouseActor(
    tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue|null) {
  return ensureActor(
      tx,
      userId,
      ActorType.WAREHOUSE,
      WAREHOUSE_ACTOR_LABEL,
      WAREHOUSE_ACTOR_NOTE,
      metadata ?? undefined,
  );
}

export async function findWarehouseActor(
    prisma: PrismaClient|Prisma.TransactionClient, userId: string) {
  return prisma.actor.findFirst({where: {userId, type: ActorType.WAREHOUSE}});
}

export async function deleteWarehouseActorWithEntities(
    tx: PrismaTx, userId: string) {
  await tx.entity.deleteMany({
    where: {actor: {userId, type: ActorType.WAREHOUSE}},
  });
  return tx.actor.deleteMany({where: {userId, type: ActorType.WAREHOUSE}});
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
      const sku = metadataString(metadata, 'sku');
      return {
        id: entity.id,
        userId,
        sku: sku ?? '',
        description: metadataString(metadata, 'description'),
        quantity: metadataNumber(metadata, 'quantity') ?? 0,
        location: metadataString(metadata, 'location') ?? '',
        status: (metadataString(metadata, 'status') as LifecycleStatus) ??
            LifecycleStatus.STORED,
        freightLoadId: metadataString(metadata, 'freightLoadId'),
        category: (metadataString(metadata, 'category') as WarehouseCategory) ??
            WarehouseCategory.OTHER,
        metadata: Object.keys(metadata).length ? metadata : null,
        createdAt: entity.createdAt.toISOString(),
        updatedAt: entity.updatedAt.toISOString(),
      };
    };
