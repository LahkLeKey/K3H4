import {Prisma, type PrismaClient} from '@prisma/client';

const BANK_ACTOR_LABEL = 'K3H4 Coin Account';
const BANK_ACTOR_NOTE = 'Ledger that tracks k3h4 coin movements';
const BANK_ACTOR_SOURCE = 'k3h4-api';

export const BANK_ACTOR_TYPE = 'bank-account';
export const BANK_TRANSACTION_KIND = 'bank-transaction';

type PrismaTx = PrismaClient|Prisma.TransactionClient;

export type BankTransactionDirection = 'credit'|'debit';

type BankEntityMetadata = {
  amount: string; balanceAfter: string; direction: BankTransactionDirection;
  kind: string;
  note: string | null;
};

export type BankTransactionRecord = {
  userId: string; amount: Prisma.Decimal; direction: BankTransactionDirection;
  kind: string;
  balanceAfter: Prisma.Decimal;
  note?: string | null;
  targetType?: string | null;
  targetId?: string | null;
  name?: string | null;
  source?: string | null;
};

const toDecimalString = (value: Prisma.Decimal) => value.toFixed(2);

const buildMetadata = (record: BankTransactionRecord): BankEntityMetadata => ({
  amount: toDecimalString(record.amount.abs()),
  balanceAfter: toDecimalString(record.balanceAfter),
  direction: record.direction,
  kind: record.kind,
  note: record.note ?? null,
});

export async function ensureBankActor(tx: PrismaTx, userId: string) {
  const existing =
      await tx.actor.findFirst({where: {userId, type: BANK_ACTOR_TYPE}});
  if (existing) return existing;
  return tx.actor.create({
    data: {
      userId,
      label: BANK_ACTOR_LABEL,
      type: BANK_ACTOR_TYPE,
      note: BANK_ACTOR_NOTE,
      source: BANK_ACTOR_SOURCE,
    },
  });
}

export async function recordBankTransactionEntity(
    tx: PrismaTx, record: BankTransactionRecord) {
  const actor = await ensureBankActor(tx, record.userId);
  return tx.entity.create({
    data: {
      actorId: actor.id,
      kind: BANK_TRANSACTION_KIND,
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
  kind?: string;
  from?: Date;
  to?: Date;
  metadataFilters?: MetadataFilter[];
};

export function buildBankTransactionWhere(
    actorId: string, options?: BankTransactionWhereOptions) {
  const {direction, kind, from, to, metadataFilters} = options ?? {};
  const where: Prisma.EntityWhereInput = {
    actorId,
    kind: BANK_TRANSACTION_KIND,
  };

  if (from || to) {
    where.createdAt = {
      ...(from ? {gte: from} : {}),
      ...(to ? {lte: to} : {}),
    };
  }

  const metadataConditions: Prisma.EntityWhereInput[] = [];
  if (direction) {
    metadataConditions.push(
        {metadata: {path: ['direction'], equals: direction}});
  }
  if (kind) {
    metadataConditions.push({metadata: {path: ['kind'], equals: kind}});
  }
  if (metadataFilters?.length) {
    metadataFilters.forEach(
        (filter) => metadataConditions.push({metadata: filter}));
  }

  if (metadataConditions.length) {
    where.AND = [...(where.AND ?? []), ...metadataConditions];
  }

  return where;
}

export async function deleteBankActorWithEntities(
    tx: PrismaTx, userId: string) {
  const entities = await tx.entity.deleteMany({
    where: {
      kind: BANK_TRANSACTION_KIND,
      actor: {userId, type: BANK_ACTOR_TYPE},
    },
  });
  const actors =
      await tx.actor.deleteMany({where: {userId, type: BANK_ACTOR_TYPE}});
  return {entities, actors};
}