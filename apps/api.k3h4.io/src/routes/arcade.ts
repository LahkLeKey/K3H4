import {type Actor, type Entity, Prisma, type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {recordBankTransactionEntity} from '../actors/Bank/Bank';
import {ACTOR_TYPES, ENTITY_DIRECTIONS, ENTITY_KINDS, type EntityDirection as EntityDirectionType,} from '../lib/actor-entity-constants';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const ActorType = ACTOR_TYPES;
const EntityKind = ENTITY_KINDS;
const EntityDirection = ENTITY_DIRECTIONS;

const serializeDecimal = (val: Prisma.Decimal|number|null|undefined) => {
  if (val === null || val === undefined) return '0.00';
  if (val instanceof Prisma.Decimal) return val.toFixed(2);
  if (typeof val === 'number') return val.toFixed(2);
  return '0.00';
};

type PrismaTx = PrismaClient|Prisma.TransactionClient;

const parseJsonObject = (value: Prisma.JsonValue|null|undefined) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
};

const parseAmountFromMetadata = (metadata: Prisma.JsonValue|null|undefined) => {
  const record = parseJsonObject(metadata);
  const amount = record.amount;
  if (typeof amount === 'string' && amount.length)
    return new Prisma.Decimal(amount);
  if (typeof amount === 'number') return new Prisma.Decimal(amount.toFixed(2));
  return new Prisma.Decimal(0);
};

const computeBalance = (entries: Array<{
  direction: EntityDirectionType | null; metadata: Prisma.JsonValue | null;
}>) => entries.reduce((balance, entry) => {
  const amount = parseAmountFromMetadata(entry.metadata);
  if (entry.direction === EntityDirection.DEBIT) return balance.sub(amount);
  return balance.add(amount);
}, new Prisma.Decimal(0));

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
  const stockRaw = metadata.stock;
  const stock = typeof stockRaw === 'number' ? stockRaw : Number(stockRaw ?? 0);
  const costRaw = metadata.costCoins;
  const cost = typeof costRaw === 'string' ? costRaw :
      typeof costRaw === 'number'          ? costRaw.toFixed(2) :
                                             null;
  return {
    id: actor.id,
    name: actor.label,
    sku: (metadata.sku as string | undefined) ?? null,
    costCoins: cost,
    stock: Number.isFinite(stock) ? Math.max(0, Math.floor(stock)) : 0,
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
  const balance = computeBalance(entries);
  const topUps =
      entries.filter((entity) => entity.kind === EntityKind.ARCADE_TOPUP)
          .map(buildCardTopUp);
  return {
    id: card.id,
    label: card.label,
    balance: serializeDecimal(balance),
    topUps,
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

const getActorBalance = async (tx: PrismaTx, actorId: string) => {
  const entries = await tx.entity.findMany({
    where: {actorId},
    select: {direction: true, metadata: true},
  });
  return computeBalance(entries);
};

export function registerArcadeRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get(
      '/arcade/overview',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const machinesPromise = prisma.actor.findMany({
          where: {userId, type: ActorType.ARCADE_MACHINE},
          orderBy: {createdAt: 'desc'},
        });
        const cardsPromise = prisma.actor.findMany({
          where: {userId, type: ActorType.ARCADE_PLAYER_CARD},
          orderBy: {createdAt: 'desc'},
        });
        const prizesPromise = prisma.actor.findMany({
          where: {userId, type: ActorType.ARCADE_PRIZE},
          orderBy: {createdAt: 'desc'},
        });
        const [machines, cards, prizes] = await Promise.all([
          machinesPromise,
          cardsPromise,
          prizesPromise,
        ]);

        const cardEntities = cards.length ? await prisma.entity.findMany({
          where: {actorId: {in : cards.map((card) => card.id)}},
          orderBy: {createdAt: 'desc'},
        }) :
                                            [];
        const sessionsPromise = prisma.entity.findMany({
          where: {
            actor: {userId, type: ActorType.ARCADE_PLAYER_CARD},
            kind: EntityKind.ARCADE_SESSION,
          },
          orderBy: {createdAt: 'desc'},
          take: 20,
        });
        const redemptionsPromise = prisma.entity.findMany({
          where: {
            actor: {userId, type: ActorType.ARCADE_PLAYER_CARD},
            kind: EntityKind.ARCADE_PRIZE_REDEMPTION,
          },
          orderBy: {createdAt: 'desc'},
          take: 20,
        });
        const [sessions, redemptions] =
            await Promise.all([sessionsPromise, redemptionsPromise]);

        const entriesByCard = new Map<string, Entity[]>();
        cardEntities.forEach((entity) => {
          const bucket = entriesByCard.get(entity.actorId) ?? [];
          bucket.push(entity);
          entriesByCard.set(entity.actorId, bucket);
        });

        const response = {
          machines: machines.map(buildMachineSummary),
          cards: cards.map((card) => {
            return buildCardSummary(card, entriesByCard.get(card.id) ?? []);
          }),
          prizes: prizes.map(buildPrizeSummary),
          sessions: sessions.map(buildSessionSummary),
          redemptions: redemptions.map(buildRedemptionSummary),
        };

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'arcade.overview.fetch',
          source: 'api',
          payload: {
            machines: response.machines.length,
            cards: response.cards.length,
            prizes: response.prizes.length,
            sessions: response.sessions.length,
            redemptions: response.redemptions.length,
          },
        });

        return response;
      },
  );

  server.post(
      '/arcade/cards',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {label?: string} | undefined;
        const card = await prisma.actor.create({
          data: {
            userId,
            type: ActorType.ARCADE_PLAYER_CARD,
            label: body?.label?.trim() || 'Arcade card',
            source: 'k3h4-api',
          },
        });
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'arcade.card.create',
          source: 'api',
          payload: {label: card.label ?? ''},
        });
        return {card: {...buildCardSummary(card, []), balance: '0.00'}};
      },
  );

  const handleCardTopUp = async (request: any, reply: any) => {
    const userId = (request.user as {sub: string}).sub;
    const id = (request.params as {id: string}).id;
    const body = request.body as {
      amount?: number|string;
      source?: string;
    }
    |undefined;
    const amountNum = body?.amount !== undefined ? Number(body.amount) : NaN;
    if (!Number.isFinite(amountNum) || amountNum <= 0)
      return reply.status(400).send({error: 'amount must be > 0'});
    const amount = new Prisma.Decimal(amountNum.toFixed(2));

    try {
      const {balance} = await prisma.$transaction(async (tx) => {
        const user = await tx.user.findUnique({
          where: {id: userId},
          select: {k3h4CoinBalance: true},
        });
        if (!user) throw new Error('User not found');
        if (user.k3h4CoinBalance.lessThan(amount))
          throw new Error('Insufficient k3h4-coin balance');

        const card = await tx.actor.findFirst({
          where: {id, userId, type: ActorType.ARCADE_PLAYER_CARD},
        });
        if (!card) throw new Error('Card not found');

        const cardBalance = await getActorBalance(tx, card.id);
        const nextUserBalance = user.k3h4CoinBalance.sub(amount);
        const nextCardBalance = cardBalance.add(amount);

        await tx.user.update({
          where: {id: userId},
          data: {k3h4CoinBalance: nextUserBalance},
        });
        await recordBankTransactionEntity(tx, {
          userId,
          amount,
          direction: EntityDirection.DEBIT,
          kind: EntityKind.ARCADE_TOPUP,
          balanceAfter: nextUserBalance,
          targetType: 'arcade_card',
          targetId: card.id,
          name: card.label ?? card.id,
        });

        await recordBankTransactionEntity(tx, {
          userId,
          actorId: card.id,
          amount,
          direction: EntityDirection.CREDIT,
          kind: EntityKind.ARCADE_TOPUP,
          balanceAfter: nextCardBalance,
          metadata: {source: body?.source ?? 'k3h4-coin'},
          name: 'Arcade card top-up',
        });

        return {balance: nextCardBalance};
      });

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: 'arcade.card.topup',
        source: 'api',
        payload: {cardId: id, amount: amount.toFixed(2)},
      });

      return {balance: serializeDecimal(balance)};
    } catch (err) {
      request.log.error({err}, 'arcade top-up failed');
      return reply.status(400).send(
          {error: err instanceof Error ? err.message : 'Unable to top up'});
    }
  };

  server.post(
      '/arcade/cards/:id/actions/topup',
      {preHandler: [server.authenticate]},
      handleCardTopUp,
  );

  server.post(
      '/arcade/prizes',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          name: string;
          sku?: string;
          costCoins: number;
          stock?: number;
        };
        const cost = new Prisma.Decimal(Number(body.costCoins).toFixed(2));
        const stock = Number.isFinite(body.stock) ?
            Math.max(0, Math.floor(Number(body.stock))) :
            0;
        const prize = await prisma.actor.create({
          data: {
            userId,
            type: ActorType.ARCADE_PRIZE,
            label: body.name,
            metadata: {
              sku: body.sku ?? null,
              costCoins: cost.toFixed(2),
              stock,
            },
            source: 'k3h4-api',
          },
        });
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'arcade.prize.create',
          source: 'api',
          payload: {name: prize.label, stock},
        });
        return {prize: buildPrizeSummary(prize)};
      },
  );

  server.post(
      '/arcade/sessions',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          machineId: string;
          cardId: string;
          creditsSpent: number;
          score?: number;
        };
        const credits = Number(body.creditsSpent);
        if (!Number.isFinite(credits) || credits <= 0)
          return reply.status(400).send({error: 'creditsSpent must be > 0'});
        const amount = new Prisma.Decimal(credits.toFixed(2));

        try {
          const {entity, balance} = await prisma.$transaction(async (tx) => {
            const card = await tx.actor.findFirst({
              where:
                  {id: body.cardId, userId, type: ActorType.ARCADE_PLAYER_CARD},
            });
            if (!card) throw new Error('Card not found');

            const machine = await tx.actor.findFirst({
              where:
                  {id: body.machineId, userId, type: ActorType.ARCADE_MACHINE},
            });
            if (!machine) throw new Error('Machine not found');

            const cardBalance = await getActorBalance(tx, card.id);
            if (cardBalance.lessThan(amount))
              throw new Error('Insufficient card balance');

            const nextBalance = cardBalance.sub(amount);
            const scoreValue = Number.isFinite(body.score) ?
                Math.floor(Number(body.score)) :
                null;
            const session = await recordBankTransactionEntity(tx, {
              userId,
              actorId: card.id,
              amount,
              direction: EntityDirection.DEBIT,
              kind: EntityKind.ARCADE_SESSION,
              balanceAfter: nextBalance,
              targetType: 'arcade_machine',
              targetId: machine.id,
              metadata: {
                machineId: machine.id,
                creditsSpent: amount.toFixed(2),
                score: scoreValue,
              },
            });

            return {entity: session, balance: nextBalance};
          });

          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'arcade.session.start',
            source: 'api',
            payload: {machineId: body.machineId, credits: credits.toFixed(2)},
          });

          return {
            session: buildSessionSummary(entity),
            balance: serializeDecimal(balance),
          };
        } catch (err) {
          request.log.error({err}, 'arcade session failed');
          return reply.status(400).send({
            error: err instanceof Error ? err.message :
                                          'Unable to start session',
          });
        }
      },
  );

  const handlePrizeRedeem = async (request: any, reply: any) => {
    const userId = (request.user as {sub: string}).sub;
    const prizeId = (request.params as {id: string}).id;
    const body = request.body as {
      cardId: string;
      sessionId?: string
    };

    try {
      const {entity, balance, stock} = await prisma.$transaction(async (tx) => {
        const prize = await tx.actor.findFirst({
          where: {id: prizeId, userId, type: ActorType.ARCADE_PRIZE},
        });
        if (!prize) throw new Error('Prize not found');
        const prizeMetadata = parseJsonObject(prize.metadata);
        const stockRaw = prizeMetadata.stock;
        const currentStock =
            typeof stockRaw === 'number' ? stockRaw : Number(stockRaw ?? 0);
        if (currentStock <= 0) throw new Error('Prize out of stock');
        const costRaw = prizeMetadata.costCoins;
        const cost = typeof costRaw === 'string' ? new Prisma.Decimal(costRaw) :
                                                   new Prisma.Decimal('0.00');

        const card = await tx.actor.findFirst({
          where: {id: body.cardId, userId, type: ActorType.ARCADE_PLAYER_CARD},
        });
        if (!card) throw new Error('Card not found');

        const cardBalance = await getActorBalance(tx, card.id);
        if (cardBalance.lessThan(cost))
          throw new Error('Insufficient card balance');

        const nextBalance = cardBalance.sub(cost);
        const entity = await recordBankTransactionEntity(tx, {
          userId,
          actorId: card.id,
          amount: cost,
          direction: EntityDirection.DEBIT,
          kind: EntityKind.ARCADE_PRIZE_REDEMPTION,
          balanceAfter: nextBalance,
          targetType: 'arcade_prize',
          targetId: prize.id,
          metadata: {
            prizeId: prize.id,
            sessionId: body.sessionId ?? null,
          },
        });

        await tx.actor.update({
          where: {id: prize.id},
          data: {
            metadata: {
              ...prizeMetadata,
              stock: Math.max(0, currentStock - 1),
            },
          },
        });

        return {
          entity,
          balance: nextBalance,
          stock: Math.max(0, currentStock - 1),
        };
      });

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: 'arcade.prize.redeem',
        source: 'api',
        payload: {prizeId, cardId: body.cardId},
      });

      return {
        redemption: buildRedemptionSummary(entity),
        balance: serializeDecimal(balance),
        prizeStock: stock,
      };
    } catch (err) {
      request.log.error({err}, 'arcade redemption failed');
      return reply.status(400).send({
        error: err instanceof Error ? err.message : 'Unable to redeem prize',
      });
    }
  };

  server.post(
      '/arcade/prizes/:id/actions/redeem',
      {preHandler: [server.authenticate]},
      handlePrizeRedeem,
  );
}
