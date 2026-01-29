import {Prisma, type PrismaClient} from '@prisma/client';

const BANK_ACTOR_LABEL = 'K3H4 Coin Account';
const BANK_ACTOR_NOTE = 'Ledger that tracks k3h4 coin movements';
const BANK_ACTOR_SOURCE = 'k3h4-api';

export const BANK_ACTOR_TYPE = 'bank-account';
export const BANK_TRANSACTION_KIND = 'bank-transaction';

type PrismaTx = PrismaClient|Prisma.TransactionClient;

const toDecimalString = (value: Prisma.Decimal) => value.toFixed(2);

export type BankTransactionRecord = {
  userId: string; amount: Prisma.Decimal; direction: 'credit' | 'debit';
  kind: string;
  note?: string | null; balanceAfter: Prisma.Decimal;
};

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
  const amount = record.amount.abs();
  return tx.entity.create({
    data: {
      actorId: actor.id,
      kind: BANK_TRANSACTION_KIND,
      metadata: {
        amount: toDecimalString(amount),
        balanceAfter: toDecimalString(record.balanceAfter),
        direction: record.direction,
        kind: record.kind,
        note: record.note ?? null,
      },
    },
  });
}