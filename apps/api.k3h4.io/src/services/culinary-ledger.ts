import {ActorType, Entity, EntityKind, LifecycleStatus, Prisma, type PrismaClient} from '@prisma/client';

const CULINARY_ACTOR_LABEL = 'Culinary ledger';
const CULINARY_ACTOR_SOURCE = 'k3h4-culinary';

const MENU_ITEM_KIND = EntityKind.CULINARY_MENU_ITEM;
const PREP_TASK_KIND = EntityKind.CULINARY_PREP_TASK;
const SUPPLIER_NEED_KIND = EntityKind.CULINARY_SUPPLIER_NEED;

const asRecord = (value: Prisma.JsonValue|null|undefined) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {} as Record<string, unknown>;
};

const metadataString = (metadata: Record<string, unknown>, key: string) => {
  const value = metadata[key];
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number') return String(value);
  return null;
};

const metadataNumber = (metadata: Record<string, unknown>, key: string) => {
  const value = metadata[key];
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const metadataDecimal = (metadata: Record<string, unknown>, key: string) => {
  const raw = metadata[key];
  if (typeof raw === 'string' && raw.length) return new Prisma.Decimal(raw);
  if (typeof raw === 'number') return new Prisma.Decimal(raw);
  return new Prisma.Decimal(0);
};

const parseNullableDate = (value: string|null|undefined) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
};

const toDecimalString = (value: number) =>
    new Prisma.Decimal(Number(value).toFixed(2)).toFixed(2);

const normalizePrepMinutes = (value: number) =>
    Math.max(0, Math.floor(Number.isFinite(value) ? value : 0));

const normalizeString = (value: string|null|undefined) =>
    value?.trim() ? value.trim() : null;

type PrismaTx = PrismaClient|Prisma.TransactionClient;

export type CulinaryMenuItemRecord = {
  id: string; name: string; prepMinutes: number; cost: Prisma.Decimal;
  price: Prisma.Decimal;
  createdAt: Date;
  updatedAt: Date;
};

export type CulinaryPrepTaskRecord = {
  id: string; task: string; station: string; status: LifecycleStatus;
  dueAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CulinarySupplierNeedRecord = {
  id: string; item: string; quantity: string; status: LifecycleStatus;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const buildMenuItemRecord = (entity: Entity): CulinaryMenuItemRecord => {
  const metadata = asRecord(entity.metadata);
  return {
    id: entity.id,
    name: metadataString(metadata, 'name') ?? '',
    prepMinutes: Math.max(0, metadataNumber(metadata, 'prepMinutes') ?? 0),
    cost: metadataDecimal(metadata, 'cost'),
    price: metadataDecimal(metadata, 'price'),
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
};

const buildPrepTaskRecord = (entity: Entity): CulinaryPrepTaskRecord => {
  const metadata = asRecord(entity.metadata);
  const statusValue =
      metadataString(metadata, 'status') as LifecycleStatus | null;
  return {
    id: entity.id,
    task: metadataString(metadata, 'task') ?? '',
    station: metadataString(metadata, 'station') ?? '',
    status: statusValue ?? LifecycleStatus.PENDING,
    dueAt: parseNullableDate(metadataString(metadata, 'dueAt')),
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
};

const buildSupplierNeedRecord =
    (entity: Entity): CulinarySupplierNeedRecord => {
      const metadata = asRecord(entity.metadata);
      const statusValue =
          metadataString(metadata, 'status') as LifecycleStatus | null;
      return {
        id: entity.id,
        item: metadataString(metadata, 'item') ?? '',
        quantity: metadataString(metadata, 'quantity') ?? '',
        status: statusValue ?? LifecycleStatus.OPEN,
        dueDate: parseNullableDate(metadataString(metadata, 'dueDate')),
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      };
    };

const sortPrepTasks =
    (a: CulinaryPrepTaskRecord, b: CulinaryPrepTaskRecord) => {
      if (a.status < b.status) return -1;
      if (a.status > b.status) return 1;
      const aDue = a.dueAt ? a.dueAt.getTime() : Number.MAX_SAFE_INTEGER;
      const bDue = b.dueAt ? b.dueAt.getTime() : Number.MAX_SAFE_INTEGER;
      return aDue - bDue;
    };

export async function ensureCulinaryActor(tx: PrismaTx, userId: string) {
  const existing = await tx.actor.findFirst({
    where: {userId, type: ActorType.CULINARY},
  });
  if (existing) return existing;
  return tx.actor.create({
    data: {
      userId,
      type: ActorType.CULINARY,
      label: CULINARY_ACTOR_LABEL,
      source: CULINARY_ACTOR_SOURCE,
    },
  });
}

export async function loadCulinaryMenuItems(
    prisma: PrismaClient, userId: string) {
  const actor = await prisma.actor.findFirst({
    where: {userId, type: ActorType.CULINARY},
  });
  if (!actor) return [];
  const entities = await prisma.entity.findMany({
    where: {actorId: actor.id, kind: MENU_ITEM_KIND},
    orderBy: {createdAt: 'desc'},
  });
  return entities.map(buildMenuItemRecord);
}

export async function loadCulinaryPrepTasks(
    prisma: PrismaClient, userId: string) {
  const actor = await prisma.actor.findFirst({
    where: {userId, type: ActorType.CULINARY},
  });
  if (!actor) return [];
  const entities = await prisma.entity.findMany({
    where: {actorId: actor.id, kind: PREP_TASK_KIND},
  });
  return entities.map(buildPrepTaskRecord).sort(sortPrepTasks);
}

export async function loadCulinarySupplierNeeds(
    prisma: PrismaClient, userId: string) {
  const actor = await prisma.actor.findFirst({
    where: {userId, type: ActorType.CULINARY},
  });
  if (!actor) return [];
  const entities = await prisma.entity.findMany({
    where: {actorId: actor.id, kind: SUPPLIER_NEED_KIND},
    orderBy: {createdAt: 'desc'},
  });
  return entities.map(buildSupplierNeedRecord);
}

export async function createCulinaryMenuItem(
    tx: PrismaTx, userId: string,
    payload:
        {name: string; prepMinutes: number; cost: number; price: number;}) {
  const actor = await ensureCulinaryActor(tx, userId);
  const metadata = {
    name: normalizeString(payload.name) ?? '',
    prepMinutes: normalizePrepMinutes(payload.prepMinutes),
    cost: toDecimalString(payload.cost),
    price: toDecimalString(payload.price),
  };
  const entity = await tx.entity.create({
    data: {
      actorId: actor.id,
      kind: MENU_ITEM_KIND,
      metadata,
    },
  });
  return buildMenuItemRecord(entity);
}

export async function createCulinaryPrepTask(
    tx: PrismaTx, userId: string, payload: {
      task: string; station: string;
      dueAt?: string; status: LifecycleStatus;
    }) {
  const actor = await ensureCulinaryActor(tx, userId);
  const metadata = {
    task: normalizeString(payload.task) ?? '',
    station: normalizeString(payload.station) ?? '',
    status: payload.status,
    dueAt: normalizeString(payload.dueAt) ?? null,
  };
  const entity = await tx.entity.create({
    data: {
      actorId: actor.id,
      kind: PREP_TASK_KIND,
      metadata,
    },
  });
  return buildPrepTaskRecord(entity);
}

export async function createCulinarySupplierNeed(
    tx: PrismaTx, userId: string, payload: {
      item: string; quantity: string;
      dueDate?: string; status: LifecycleStatus;
    }) {
  const actor = await ensureCulinaryActor(tx, userId);
  const metadata = {
    item: normalizeString(payload.item) ?? '',
    quantity: normalizeString(payload.quantity) ?? '',
    status: payload.status,
    dueDate: normalizeString(payload.dueDate) ?? null,
  };
  const entity = await tx.entity.create({
    data: {
      actorId: actor.id,
      kind: SUPPLIER_NEED_KIND,
      metadata,
    },
  });
  return buildSupplierNeedRecord(entity);
}

export async function deleteCulinaryActorWithEntities(
    tx: PrismaTx, userId: string) {
  const entities = await tx.entity.deleteMany({
    where: {
      actor: {userId, type: ActorType.CULINARY},
    },
  });
  const actors = await tx.actor.deleteMany({
    where: {userId, type: ActorType.CULINARY},
  });
  return {entities, actors};
}
