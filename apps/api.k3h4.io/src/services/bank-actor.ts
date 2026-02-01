import {ActorType, EntityDirection, EntityKind, Prisma, type PrismaClient} from '@prisma/client';

const BANK_ACTOR_LABEL = 'K3H4 Coin Account';
const BANK_ACTOR_NOTE = 'Ledger that tracks k3h4 coin movements';
const BANK_ACTOR_SOURCE = 'k3h4-api';

export {ActorType, EntityDirection, EntityKind};

type PrismaTx = PrismaClient|Prisma.TransactionClient;

type BankEntityMetadata = Prisma.JsonObject&{
  amount: string;
  balanceAfter: string;
  direction: EntityDirection;
  kind: EntityKind;
  note: string|null;
};

const asJsonObject = (value: Prisma.JsonValue|null|undefined) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Prisma.JsonObject;
  }
  return {} as Prisma.JsonObject;
};

export type BankTransactionRecord = {
  userId: string; amount: Prisma.Decimal; direction: EntityDirection;
  kind: EntityKind;
  balanceAfter: Prisma.Decimal;
  note?: string | null;
  targetType?: string | null;
  targetId?: string | null;
  name?: string | null;
  source?: string | null;
  actorType?: ActorType;
  actorLabel?: string | null;
  actorNote?: string | null;
  actorMetadata?: Prisma.JsonValue | null;
  actorId?: string;
  metadata?: Prisma.JsonValue | null;
};

const toDecimalString = (value: Prisma.Decimal) => value.toFixed(2);

const buildMetadata = (record: BankTransactionRecord): BankEntityMetadata => {
  const baseMetadata = asJsonObject(record.metadata);
  return {
    ...baseMetadata,
    amount: toDecimalString(record.amount.abs()),
    balanceAfter: toDecimalString(record.balanceAfter),
    direction: record.direction,
    kind: record.kind,
    note: record.note ?? null,
  };
};

const ensureActor = async (
    tx: PrismaTx, userId: string, type: ActorType, label?: string|null,
    note?: string|null, metadata?: Prisma.JsonValue|null) => {
  const criteria: Prisma.ActorWhereInput = {
    userId,
    type,
    ...(label ? {label} : {}),
  };
  const existing = await tx.actor.findFirst({where: criteria});
  if (existing) return existing;
  const actorLabel = label ?? BANK_ACTOR_LABEL;
  return tx.actor.create({
    data: {
      userId,
      type,
      label: actorLabel,
      note: note ?? null,
      source: BANK_ACTOR_SOURCE,
      metadata: metadata ?? undefined,
    },
  });
};

export async function ensureBankActor(tx: PrismaTx, userId: string) {
  return ensureActor(
      tx, userId, ActorType.BANK_ACCOUNT, BANK_ACTOR_LABEL, BANK_ACTOR_NOTE);
}

export async function recordBankTransactionEntity(
    tx: PrismaTx, record: BankTransactionRecord) {
  const actor = record.actorId ?
      await tx.actor.findUnique({where: {id: record.actorId}}) :
      await ensureActor(
          tx, record.userId, record.actorType ?? ActorType.BANK_ACCOUNT,
          record.actorLabel ??
              ((record.actorType ?? ActorType.BANK_ACCOUNT) ===
                       ActorType.BANK_ACCOUNT ?
                   BANK_ACTOR_LABEL :
                   undefined),
          record.actorNote, record.actorMetadata);
  if (!actor) throw new Error('Actor not found for transaction');
  return tx.entity.create({
    data: {
      actorId: actor.id,
      kind: record.kind,
      direction: record.direction,
      name: record.name ?? null,
      targetType: record.targetType ?? null,
      targetId: record.targetId ?? null,
      source: record.source ?? BANK_ACTOR_SOURCE,
      metadata: buildMetadata(record),
    },
  });
}

type MetadataFilter = Prisma.JsonFilter;

type BankTransactionWhereOptions = {
  direction?: EntityDirection;
  kind?: EntityKind;
  from?: Date;
  to?: Date;
  metadataFilters?: MetadataFilter[];
};

export function buildBankTransactionWhere(
    actorId: string, options?: BankTransactionWhereOptions) {
  const {direction, kind, from, to, metadataFilters} = options ?? {};
  const where: Prisma.EntityWhereInput = {actorId};

  if (from || to) {
    where.createdAt = {
      ...(from ? {gte: from} : {}),
      ...(to ? {lte: to} : {}),
    };
  }

  if (direction) {
    where.direction = direction;
  }
  if (kind) {
    where.kind = kind;
  }

  const filterConditions: Prisma.EntityWhereInput[] = [];
  if (direction) {
    filterConditions.push({
      OR: [
        {direction},
        {metadata: {path: ['direction'], equals: direction}},
      ],
    });
  }
  if (kind) {
    filterConditions.push({
      OR: [
        {kind},
        {metadata: {path: ['kind'], equals: kind}},
      ],
    });
  }
  if (metadataFilters?.length) {
    metadataFilters.forEach(
        (filter) => filterConditions.push({metadata: filter}));
  }

  if (filterConditions.length) {
    const existingAnd =
        Array.isArray(where.AND) ? where.AND : (where.AND ? [where.AND] : []);
    where.AND = [...existingAnd, ...filterConditions];
  }

  return where;
}

export async function deleteBankActorWithEntities(
    tx: PrismaTx, userId: string) {
  const entities = await tx.entity.deleteMany({
    where: {
      actor: {userId, type: ActorType.BANK_ACCOUNT},
    },
  });
  const actors = await tx.actor.deleteMany({
    where: {userId, type: ActorType.BANK_ACCOUNT},
  });
  return {entities, actors};
}