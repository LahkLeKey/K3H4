import {Prisma, type PrismaClient} from '@prisma/client';

import {buildBankTransactionWhere, recordBankTransactionEntity} from '../../actors/Bank/Bank';
import type {EntityDirection, EntityKind} from '../../lib/actor-entity-constants';
import {ACTOR_TYPES, ENTITY_DIRECTIONS, ENTITY_KINDS} from '../../lib/actor-entity-constants';

const MAX_ABSOLUTE_BALANCE = 1_000_000_000;

export type BankBalance = {
  balance: string;
};

export type BankTransaction = {
  id: string;
  amount: string;
  balanceAfter: string;
  direction: string;
  kind: string;
  note: string|null;
  createdAt: string;
  targetType: string|null;
  targetId: string|null;
  name: string|null;
};

export class BankLedgerValidationError extends Error {}

type BankTransactionEntity = {
  id: string;
  metadata: Prisma.JsonValue|null;
  createdAt: Date;
  targetType?: string|null;
  targetId?: string|null;
  name?: string|null;
  direction?: EntityDirection|null;
  kind?: EntityKind|null;
};

const normalizeAmount = (value: unknown) => {
  const numberValue = typeof value === 'number' ? value :
      typeof value === 'string'                  ? Number(value) :
                                                  Number.NaN;
  if (!Number.isFinite(numberValue) ||
      Math.abs(numberValue) > MAX_ABSOLUTE_BALANCE)
    return null;
  return new Prisma.Decimal(numberValue.toFixed(2));
};

const serializeTransaction = (entity: BankTransactionEntity): BankTransaction => {
  const metadata = (entity.metadata as {
                     amount?: string;
                     balanceAfter?: string;
                     direction?: string;
                     kind?: string;
                     note?: string|null;
                   } | null) ?? {};
  return {
    id: entity.id,
    amount: metadata.amount ?? '0.00',
    balanceAfter: metadata.balanceAfter ?? '0.00',
    direction: entity.direction?.toLowerCase() ?? metadata.direction ?? '',
    kind: entity.kind?.toLowerCase() ?? metadata.kind ?? '',
    note: metadata.note ?? null,
    createdAt: entity.createdAt.toISOString(),
    targetType: entity.targetType ?? null,
    targetId: entity.targetId ?? null,
    name: entity.name ?? null,
  };
};

export async function getBankBalance(
    prisma: PrismaClient, userId: string): Promise<BankBalance|null> {
  const user = await prisma.user.findUnique({
    where: {id: userId},
    select: {k3h4CoinBalance: true},
  });
  if (!user) return null;
  return {balance: user.k3h4CoinBalance?.toFixed(2) ?? '0.00'};
}

export type ChangeBankBalanceCommand = {
  userId: string;
  delta?: number|string;
  set?: number|string;
  reason?: string;
};

export type ChangeBankBalanceResult = BankBalance&{
  transaction: BankTransaction;
};

export type RecordBankLedgerEntryCommand = {
  userId: string;
  amount: number|string;
  direction: EntityDirection;
  kind: EntityKind;
  balanceAfter: number|string;
  note?: string|null;
  targetType?: string|null;
  targetId?: string|null;
  name?: string|null;
  actorId?: string;
  details?: Record<string, unknown>;
};

export type BankLedgerEntryReceipt = {
  id: string;
  createdAt: string;
};

const parseLedgerAmount = (value: number|string) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue))
    throw new BankLedgerValidationError('Ledger amounts must be finite');
  return new Prisma.Decimal(numericValue.toFixed(2));
};

export async function recordBankLedgerEntry(
    transaction: PrismaClient|Prisma.TransactionClient,
    command: RecordBankLedgerEntryCommand,
    ): Promise<BankLedgerEntryReceipt> {
  const amount = parseLedgerAmount(command.amount);
  const balanceAfter = parseLedgerAmount(command.balanceAfter);
  const entry = await recordBankTransactionEntity(transaction, {
    userId: command.userId,
    amount,
    direction: command.direction,
    kind: command.kind,
    balanceAfter,
    note: command.note,
    targetType: command.targetType,
    targetId: command.targetId,
    name: command.name,
    actorId: command.actorId,
    metadata: command.details as Prisma.JsonValue|undefined,
  });
  return {id: entry.id, createdAt: entry.createdAt.toISOString()};
}

export async function changeBankBalance(
    prisma: PrismaClient,
    command: ChangeBankBalanceCommand,
    ): Promise<ChangeBankBalanceResult> {
  const hasDelta = command.delta !== undefined;
  const hasSet = command.set !== undefined;
  if (!hasDelta && !hasSet)
    throw new BankLedgerValidationError('Provide delta or set');
  if (hasDelta && hasSet)
    throw new BankLedgerValidationError('Choose either delta or set');

  const delta = hasDelta ? normalizeAmount(command.delta) : null;
  const setAmount = hasSet ? normalizeAmount(command.set) : null;
  if ((hasDelta && !delta) || (hasSet && !setAmount)) {
    throw new BankLedgerValidationError(
        'Amount must be a finite number within limits');
  }

  const {nextBalance, transaction} = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique(
        {where: {id: command.userId}, select: {k3h4CoinBalance: true}});
    if (!user) throw new Error('User not found');

    const previousBalance = user.k3h4CoinBalance;
    const nextBalance = setAmount ??
        previousBalance.add(delta ?? new Prisma.Decimal(0));
    const change = nextBalance.sub(previousBalance);
    const isCredit = change.greaterThan(0) || change.equals(0);
    const saved = await tx.user.update(
        {where: {id: command.userId}, data: {k3h4CoinBalance: nextBalance}});
    const transaction = await recordBankTransactionEntity(tx, {
      userId: command.userId,
      amount: change.abs(),
      direction: isCredit ? ENTITY_DIRECTIONS.CREDIT :
                            ENTITY_DIRECTIONS.DEBIT,
      kind: hasSet ? ENTITY_KINDS.SET :
          isCredit ? ENTITY_KINDS.DEPOSIT : ENTITY_KINDS.WITHDRAWAL,
      note: command.reason ?? null,
      balanceAfter: saved.k3h4CoinBalance,
    });
    return {nextBalance: saved.k3h4CoinBalance, transaction};
  });

  return {
    balance: nextBalance?.toFixed(2) ?? '0.00',
    transaction: serializeTransaction(transaction),
  };
}

export type ListBankTransactionsQuery = {
  userId: string;
  limit?: string;
  offset?: string;
  from?: string;
  to?: string;
  direction?: string;
};

export type BankTransactionPage = {
  transactions: BankTransaction[];
  total: number;
  request: {
    limit: number;
    offset: number;
    direction: string;
    from: string|null;
    to: string|null;
  };
};

const parseLimit = (value?: string) => {
  const parsed = value ? Number(value) : 20;
  return Number.isFinite(parsed) ?
      Math.min(Math.max(Math.floor(parsed), 1), 100) :
      20;
};

const parseOffset = (value?: string) => {
  const parsed = value ? Number(value) : 0;
  return Number.isFinite(parsed) ? Math.max(Math.floor(parsed), 0) : 0;
};

export async function listBankTransactions(
    prisma: PrismaClient,
    query: ListBankTransactionsQuery,
    ): Promise<BankTransactionPage> {
  const limit = parseLimit(query.limit);
  const offset = parseOffset(query.offset);
  const direction = query.direction === 'credit' ? ENTITY_DIRECTIONS.CREDIT :
      query.direction === 'debit'                ? ENTITY_DIRECTIONS.DEBIT :
                                                   undefined;
  const from = query.from ? new Date(query.from) : undefined;
  const to = query.to ? new Date(query.to) : undefined;
  const validFrom = from && !Number.isNaN(from.valueOf()) ? from : undefined;
  const validTo = to && !Number.isNaN(to.valueOf()) ? to : undefined;
  const request = {
    limit,
    offset,
    direction: direction?.toLowerCase() ?? '',
    from: query.from ?? null,
    to: query.to ?? null,
  };

  const actor = await prisma.actor.findFirst({
    where: {userId: query.userId, type: ACTOR_TYPES.BANK_ACCOUNT},
    select: {id: true},
  });
  if (!actor) return {transactions: [], total: 0, request};

  const where = buildBankTransactionWhere(actor.id, {
    direction,
    from: validFrom,
    to: validTo,
  });
  const [total, transactions] = await Promise.all([
    prisma.entity.count({where}),
    prisma.entity.findMany({
      where,
      orderBy: {createdAt: 'desc'},
      skip: offset,
      take: limit,
    }),
  ]);
  return {transactions: transactions.map(serializeTransaction), total, request};
}