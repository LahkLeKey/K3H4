import {Prisma, type PrismaClient} from '@prisma/client';

import {recordBankLedgerEntry} from '../bank-ledger';
import {ACTOR_TYPES, ENTITY_DIRECTIONS, ENTITY_KINDS} from '../../lib/actor-entity-constants';

type ArcadeTransaction = PrismaClient|Prisma.TransactionClient;

export type TopUpArcadeCardCommand = {
  userId: string;
  cardId: string;
  amount: number|string;
  source?: string;
};

export type TopUpArcadeCardResult = {balance: string};

export type StartArcadeSessionCommand = {
  userId: string;
  cardId: string;
  machineId: string;
  creditsSpent: number|string;
  score?: number;
};

export type StartArcadeSessionResult = {
  session: {
    id: string;
    machineId: string;
    cardId: string;
    creditsSpent: string;
    score: number|null;
    startedAt: string;
  };
  balance: string;
};

export type RedeemArcadePrizeCommand = {
  userId: string;
  prizeId: string;
  cardId: string;
  sessionId?: string;
};

export type RedeemArcadePrizeResult = {
  redemption: {
    id: string;
    prizeId: string;
    cardId: string;
    sessionId: string|null;
    createdAt: string;
  };
  balance: string;
  prizeStock: number;
};

const parseAmount = (value: number|string) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue <= 0)
    throw new Error('amount must be > 0');
  return new Prisma.Decimal(numericValue.toFixed(2));
};

const parseJsonObject = (value: Prisma.JsonValue|null|undefined) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
};

const getActorBalance = async (transaction: ArcadeTransaction, actorId: string) => {
  const entries = await transaction.entity.findMany({
    where: {actorId},
    select: {direction: true, metadata: true},
  });
  return entries.reduce((balance, entry) => {
    const metadata = parseJsonObject(entry.metadata);
    const amount = typeof metadata.amount === 'string' ?
        new Prisma.Decimal(metadata.amount) :
        typeof metadata.amount === 'number' ?
        new Prisma.Decimal(metadata.amount.toFixed(2)) :
        new Prisma.Decimal(0);
    return entry.direction === ENTITY_DIRECTIONS.DEBIT ?
        balance.sub(amount) :
        balance.add(amount);
  }, new Prisma.Decimal(0));
};

const parseCredits = (value: number|string) => {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue <= 0)
    throw new Error('creditsSpent must be > 0');
  return new Prisma.Decimal(numericValue.toFixed(2));
};

export async function topUpArcadeCard(
    transaction: ArcadeTransaction,
    command: TopUpArcadeCardCommand,
    ): Promise<TopUpArcadeCardResult> {
  const amount = parseAmount(command.amount);
  const user = await transaction.user.findUnique({
    where: {id: command.userId},
    select: {k3h4CoinBalance: true},
  });
  if (!user) throw new Error('User not found');
  if (user.k3h4CoinBalance.lessThan(amount))
    throw new Error('Insufficient k3h4-coin balance');

  const card = await transaction.actor.findFirst({
    where: {
      id: command.cardId,
      userId: command.userId,
      type: ACTOR_TYPES.ARCADE_PLAYER_CARD,
    },
  });
  if (!card) throw new Error('Card not found');

  const cardBalance = await getActorBalance(transaction, card.id);
  const nextUserBalance = user.k3h4CoinBalance.sub(amount);
  const nextCardBalance = cardBalance.add(amount);
  await transaction.user.update({
    where: {id: command.userId},
    data: {k3h4CoinBalance: nextUserBalance},
  });

  await recordBankLedgerEntry(transaction, {
    userId: command.userId,
    amount: amount.toFixed(2),
    direction: ENTITY_DIRECTIONS.DEBIT,
    kind: ENTITY_KINDS.ARCADE_TOPUP,
    balanceAfter: nextUserBalance.toFixed(2),
    targetType: 'arcade_card',
    targetId: card.id,
    name: card.label ?? card.id,
  });
  await recordBankLedgerEntry(transaction, {
    userId: command.userId,
    actorId: card.id,
    amount: amount.toFixed(2),
    direction: ENTITY_DIRECTIONS.CREDIT,
    kind: ENTITY_KINDS.ARCADE_TOPUP,
    balanceAfter: nextCardBalance.toFixed(2),
    details: {source: command.source ?? 'k3h4-coin'},
    name: 'Arcade card top-up',
  });

  return {balance: nextCardBalance.toFixed(2)};
}

export async function startArcadeSession(
    transaction: ArcadeTransaction,
    command: StartArcadeSessionCommand,
    ): Promise<StartArcadeSessionResult> {
  const amount = parseCredits(command.creditsSpent);
  const card = await transaction.actor.findFirst({
    where: {
      id: command.cardId,
      userId: command.userId,
      type: ACTOR_TYPES.ARCADE_PLAYER_CARD,
    },
  });
  if (!card) throw new Error('Card not found');
  const machine = await transaction.actor.findFirst({
    where: {
      id: command.machineId,
      userId: command.userId,
      type: ACTOR_TYPES.ARCADE_MACHINE,
    },
  });
  if (!machine) throw new Error('Machine not found');
  const cardBalance = await getActorBalance(transaction, card.id);
  if (cardBalance.lessThan(amount))
    throw new Error('Insufficient card balance');

  const nextBalance = cardBalance.sub(amount);
  const receipt = await recordBankLedgerEntry(transaction, {
    userId: command.userId,
    actorId: card.id,
    amount: amount.toFixed(2),
    direction: ENTITY_DIRECTIONS.DEBIT,
    kind: ENTITY_KINDS.ARCADE_SESSION,
    balanceAfter: nextBalance.toFixed(2),
    targetType: 'arcade_machine',
    targetId: machine.id,
    details: {
      machineId: machine.id,
      creditsSpent: amount.toFixed(2),
      score: Number.isFinite(command.score) ? Math.floor(Number(command.score)) : null,
    },
  });
  return {
    session: {
      id: receipt.id,
      machineId: machine.id,
      cardId: card.id,
      creditsSpent: amount.toFixed(2),
      score: Number.isFinite(command.score) ? Math.floor(Number(command.score)) : null,
      startedAt: receipt.createdAt,
    },
    balance: nextBalance.toFixed(2),
  };
}

export async function redeemArcadePrize(
    transaction: ArcadeTransaction,
    command: RedeemArcadePrizeCommand,
    ): Promise<RedeemArcadePrizeResult> {
  const prize = await transaction.actor.findFirst({
    where: {
      id: command.prizeId,
      userId: command.userId,
      type: ACTOR_TYPES.ARCADE_PRIZE,
    },
  });
  if (!prize) throw new Error('Prize not found');
  const prizeMetadata = parseJsonObject(prize.metadata);
  const currentStock = Math.max(0, Math.floor(Number(prizeMetadata.stock ?? 0)));
  if (currentStock <= 0) throw new Error('Prize out of stock');
  const cost = new Prisma.Decimal(String(prizeMetadata.costCoins ?? '0'));

  const card = await transaction.actor.findFirst({
    where: {
      id: command.cardId,
      userId: command.userId,
      type: ACTOR_TYPES.ARCADE_PLAYER_CARD,
    },
  });
  if (!card) throw new Error('Card not found');
  const cardBalance = await getActorBalance(transaction, card.id);
  if (cardBalance.lessThan(cost))
    throw new Error('Insufficient card balance');

  const nextBalance = cardBalance.sub(cost);
  const receipt = await recordBankLedgerEntry(transaction, {
    userId: command.userId,
    actorId: card.id,
    amount: cost.toFixed(2),
    direction: ENTITY_DIRECTIONS.DEBIT,
    kind: ENTITY_KINDS.ARCADE_PRIZE_REDEMPTION,
    balanceAfter: nextBalance.toFixed(2),
    targetType: 'arcade_prize',
    targetId: prize.id,
    details: {prizeId: prize.id, sessionId: command.sessionId ?? null},
  });
  const prizeStock = currentStock - 1;
  await transaction.actor.update({
    where: {id: prize.id},
    data: {metadata: {...prizeMetadata, stock: prizeStock}},
  });

  return {
    redemption: {
      id: receipt.id,
      prizeId: prize.id,
      cardId: card.id,
      sessionId: command.sessionId ?? null,
      createdAt: receipt.createdAt,
    },
    balance: nextBalance.toFixed(2),
    prizeStock,
  };
}