import {type Actor, type Entity, Prisma, type PrismaClient} from '@prisma/client';

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

export type CreateArcadeMachineCommand = {
  userId: string;
  name: string;
  status?: string;
};

export type CreateArcadeCardCommand = {
  userId: string;
  label?: string;
};

export type CreateArcadePrizeCommand = {
  userId: string;
  name: string;
  sku?: string;
  costCoins: number|string;
  stock?: number;
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

const buildMachineSummary = (actor: Actor) => {
  const metadata = parseJsonObject(actor.metadata);
  return {
    id: actor.id,
    name: actor.label,
    status: (metadata.status as string | undefined) ?? null,
    createdAt: actor.createdAt.toISOString(),
  };
};

const buildPrizeSummary = (actor: Actor) => {
  const metadata = parseJsonObject(actor.metadata);
  const stockValue = Number(metadata.stock ?? 0);
  const costValue = metadata.costCoins;
  return {
    id: actor.id,
    name: actor.label,
    sku: (metadata.sku as string | undefined) ?? null,
    costCoins: typeof costValue === 'string' ? costValue :
      typeof costValue === 'number' ? costValue.toFixed(2) : null,
    stock: Number.isFinite(stockValue) ? Math.max(0, Math.floor(stockValue)) : 0,
  };
};

const buildCardTopUp = (entity: Entity) => {
  const metadata = parseJsonObject(entity.metadata);
  return {
    id: entity.id,
    amount: (metadata.amount as string) ?? '0.00',
    source: entity.source ?? ((metadata.source as string | undefined) ?? null),
    createdAt: entity.createdAt.toISOString(),
  };
};

const buildCardSummary = (card: Actor, entries: Entity[]) => {
  const balance = entries.reduce((current, entry) => {
    const metadata = parseJsonObject(entry.metadata);
    const amount = new Prisma.Decimal(String(metadata.amount ?? '0'));
    return entry.direction === ENTITY_DIRECTIONS.DEBIT ?
      current.sub(amount) : current.add(amount);
  }, new Prisma.Decimal(0));
  return {
    id: card.id,
    label: card.label,
    balance: balance.toFixed(2),
    topUps: entries
        .filter((entity) => entity.kind === ENTITY_KINDS.ARCADE_TOPUP)
        .map(buildCardTopUp),
  };
};

const buildSessionSummary = (entity: Entity) => {
  const metadata = parseJsonObject(entity.metadata);
  const scoreValue = metadata.score;
  return {
    id: entity.id,
    machineId:
      (metadata.machineId as string | undefined) ?? entity.targetId ?? '',
    cardId: entity.actorId,
    creditsSpent: (metadata.creditsSpent as string) ?? '0.00',
    score: typeof scoreValue === 'number' ? Math.floor(scoreValue) : null,
    startedAt: entity.createdAt.toISOString(),
  };
};

const buildRedemptionSummary = (entity: Entity) => {
  const metadata = parseJsonObject(entity.metadata);
  return {
    id: entity.id,
    prizeId: (metadata.prizeId as string | undefined) ?? '',
    cardId: entity.actorId,
    sessionId: (metadata.sessionId as string | undefined) ?? null,
    createdAt: entity.createdAt.toISOString(),
  };
};

export async function getArcadeOverview(
    transaction: ArcadeTransaction, userId: string) {
  const [machines, cards, prizes] = await Promise.all([
    transaction.actor.findMany({
      where: {userId, type: ACTOR_TYPES.ARCADE_MACHINE},
      orderBy: {createdAt: 'desc'},
    }),
    transaction.actor.findMany({
      where: {userId, type: ACTOR_TYPES.ARCADE_PLAYER_CARD},
      orderBy: {createdAt: 'desc'},
    }),
    transaction.actor.findMany({
      where: {userId, type: ACTOR_TYPES.ARCADE_PRIZE},
      orderBy: {createdAt: 'desc'},
    }),
  ]);
  const cardEntities = cards.length ? await transaction.entity.findMany({
    where: {actorId: {in: cards.map((card) => card.id)}},
    orderBy: {createdAt: 'desc'},
  }) : [];
  const [sessions, redemptions] = await Promise.all([
    transaction.entity.findMany({
      where: {
        actor: {userId, type: ACTOR_TYPES.ARCADE_PLAYER_CARD},
        kind: ENTITY_KINDS.ARCADE_SESSION,
      },
      orderBy: {createdAt: 'desc'},
      take: 20,
    }),
    transaction.entity.findMany({
      where: {
        actor: {userId, type: ACTOR_TYPES.ARCADE_PLAYER_CARD},
        kind: ENTITY_KINDS.ARCADE_PRIZE_REDEMPTION,
      },
      orderBy: {createdAt: 'desc'},
      take: 20,
    }),
  ]);
  const entriesByCard = new Map<string, Entity[]>();
  cardEntities.forEach((entity) => {
    const entries = entriesByCard.get(entity.actorId) ?? [];
    entries.push(entity);
    entriesByCard.set(entity.actorId, entries);
  });
  return {
    machines: machines.map(buildMachineSummary),
    cards: cards.map((card) =>
      buildCardSummary(card, entriesByCard.get(card.id) ?? [])),
    prizes: prizes.map(buildPrizeSummary),
    sessions: sessions.map(buildSessionSummary),
    redemptions: redemptions.map(buildRedemptionSummary),
  };
}

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

const createActor = async (
    transaction: ArcadeTransaction,
    data: Record<string, unknown>) => transaction.actor.create({data: data as any});

export async function createArcadeMachine(
    transaction: ArcadeTransaction,
    command: CreateArcadeMachineCommand) {
  const actor = await createActor(transaction, {
    userId: command.userId,
    type: ACTOR_TYPES.ARCADE_MACHINE,
    label: command.name,
    metadata: {status: command.status ?? 'idle'},
    source: 'k3h4-api',
  });
  return buildMachineSummary(actor);
}

export async function createArcadeCard(
    transaction: ArcadeTransaction,
    command: CreateArcadeCardCommand) {
  const actor = await createActor(transaction, {
    userId: command.userId,
    type: ACTOR_TYPES.ARCADE_PLAYER_CARD,
    label: command.label?.trim() || 'Arcade card',
    source: 'k3h4-api',
  });
  return buildCardSummary(actor, []);
}

export async function createArcadePrize(
    transaction: ArcadeTransaction,
    command: CreateArcadePrizeCommand) {
  const cost = parseCredits(command.costCoins);
  const stock = Number.isFinite(command.stock) ?
      Math.max(0, Math.floor(Number(command.stock))) :
      0;
  const actor = await createActor(transaction, {
    userId: command.userId,
    type: ACTOR_TYPES.ARCADE_PRIZE,
    label: command.name,
    metadata: {
      sku: command.sku ?? null,
      costCoins: cost.toFixed(2),
      stock,
    },
    source: 'k3h4-api',
  });
  return buildPrizeSummary(actor);
}

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