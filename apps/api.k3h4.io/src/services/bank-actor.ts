import {BankActorType, BankTransactionDirection, BankTransactionKind, Prisma, type PrismaClient} from '@prisma/client';

const BANK_ACTOR_LABEL = 'K3H4 Coin Account';
const BANK_ACTOR_NOTE = 'Ledger that tracks k3h4 coin movements';
const BANK_ACTOR_SOURCE = 'k3h4-api';

export {BankActorType, BankTransactionDirection, BankTransactionKind};

type PrismaTx = PrismaClient|Prisma.TransactionClient;

type BankEntityMetadata = {
  amount: string; balanceAfter: string; direction: BankTransactionDirection;
  kind: BankTransactionKind;
  note: string | null;
}&Record<string, unknown>;

export type BankTransactionRecord = {
  userId: string; amount: Prisma.Decimal; direction: BankTransactionDirection;
  kind: BankTransactionKind;
  balanceAfter: Prisma.Decimal;
  note?: string | null;
  targetType?: string | null;
  targetId?: string | null;
  name?: string | null;
  source?: string | null;
  actorType?: BankActorType;
  actorLabel?: string | null;
  actorNote?: string | null;
  actorMetadata?: Prisma.JsonValue | null;
  actorId?: string;
  metadata?: Prisma.JsonValue | null;
};

const toDecimalString = (value: Prisma.Decimal) => value.toFixed(2);

const buildMetadata = (record: BankTransactionRecord): BankEntityMetadata => ({
  amount: toDecimalString(record.amount.abs()),
  balanceAfter: toDecimalString(record.balanceAfter),
  direction: record.direction,
  kind: record.kind,
  note: record.note ?? null,
  ...((record.metadata ?? {}) as Record<string, unknown>),
});

const ensureActor = async (
    tx: PrismaTx, userId: string, type: BankActorType, label?: string|null,
    note?: string|null, metadata?: Prisma.JsonValue|null) => {
  const criteria: Prisma.ActorWhereInput = {
    userId,
    type,
    ...(label ? {label} : {}),
  };
  const existing = await tx.actor.findFirst({where: criteria});
  if (existing) return existing;
  return tx.actor.create({
    data: {
      userId,
      type,
      label,
      note,
      source: BANK_ACTOR_SOURCE,
      metadata,
    },
  });
};

export async function ensureBankActor(tx: PrismaTx, userId: string) {
  return ensureActor(
      tx, userId, BankActorType.BANK_ACCOUNT, BANK_ACTOR_LABEL,
      BANK_ACTOR_NOTE);
}

export async function recordBankTransactionEntity(
    tx: PrismaTx, record: BankTransactionRecord) {
  const actor = record.actorId ?
      await tx.actor.findUnique({where: {id: record.actorId}}) :
      await ensureActor(
          tx, record.userId, record.actorType ?? BankActorType.BANK_ACCOUNT,
          record.actorLabel ??
              (record.actorType === BankActorType.BANK_ACCOUNT ?
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
  direction?: BankTransactionDirection;
  kind?: BankTransactionKind;
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
    where.AND = [...(where.AND ?? []), ...filterConditions];
  }

  return where;
}

export async function deleteBankActorWithEntities(
    tx: PrismaTx, userId: string) {
  const entities = await tx.entity.deleteMany({
    where: {
      actor: {userId, type: BankActorType.BANK_ACCOUNT},
    },
  });
  const actors = await tx.actor.deleteMany({
    where: {userId, type: BankActorType.BANK_ACCOUNT},
  });
  return {entities, actors};
}