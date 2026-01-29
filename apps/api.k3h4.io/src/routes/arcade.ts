import {LifecycleStatus, Prisma, type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {BankTransactionDirection, BankTransactionKind, recordBankTransactionEntity,} from '../services/bank-actor';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const serializeDecimal = (val: Prisma.Decimal|number|null|undefined) => {
  if (val === null || val === undefined) return '0.00';
  if (val instanceof Prisma.Decimal) return val.toFixed(2);
  if (typeof val === 'number') return val.toFixed(2);
  return '0.00';
};

export function registerArcadeRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get(
      '/arcade/overview',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const [machines, cards, prizes, sessions, redemptions] =
            await Promise.all([
              prisma.arcadeMachine.findMany(
                  {where: {userId}, orderBy: {createdAt: 'desc'}}),
              prisma.arcadeCard.findMany({
                where: {userId},
                orderBy: {createdAt: 'desc'},
                include: {topUps: true}
              }),
              prisma.arcadePrize.findMany(
                  {where: {userId}, orderBy: {createdAt: 'desc'}}),
              prisma.arcadeSession.findMany(
                  {where: {userId}, orderBy: {startedAt: 'desc'}, take: 20}),
              prisma.arcadeRedemption.findMany(
                  {where: {userId}, orderBy: {createdAt: 'desc'}, take: 20}),
            ]);

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'arcade.overview.fetch',
          source: 'api',
          payload: {
            machines: machines.length,
            cards: cards.length,
            prizes: prizes.length,
            sessions: sessions.length,
            redemptions: redemptions.length,
          },
        });

        return {
          machines,
          cards: cards.map(
              (card) => ({
                ...card,
                balance: serializeDecimal(card.balance),
                topUps: card.topUps.map(
                    (t) => ({...t, amount: serializeDecimal(t.amount)})),
              })),
          prizes,
          sessions,
          redemptions,
        };
      },
  );

  server.post(
      '/arcade/cards',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {label?: string} | undefined;
        const card = await prisma.arcadeCard.create({
          data: {
            userId,
            label: body?.label?.trim() || 'Arcade card',
            balance: new Prisma.Decimal(0),
          },
        });
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'arcade.card.create',
          source: 'api',
          payload: {label: card.label ?? ''},
        });
        return {card: {...card, balance: serializeDecimal(card.balance)}};
      },
  );

  server.post(
      '/arcade/cards/:id/topup',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const id = (request.params as {id: string}).id;
        const body = request.body as {
          amount?: number|string;
          source?: string
        }
        |undefined;
        const amountNum =
            body?.amount !== undefined ? Number(body.amount) : NaN;
        if (!Number.isFinite(amountNum) || amountNum <= 0)
          return reply.status(400).send({error: 'amount must be > 0'});
        const amount = new Prisma.Decimal(amountNum.toFixed(2));

        try {
          const {card, nextBalance} = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique(
                {where: {id: userId}, select: {k3h4CoinBalance: true}});
            if (!user) throw new Error('User not found');
            if (user.k3h4CoinBalance.lessThan(amount))
              throw new Error('Insufficient k3h4-coin balance');

            const card = await tx.arcadeCard.findFirst({where: {id, userId}});
            if (!card) throw new Error('Card not found');

            const nextUserBalance = user.k3h4CoinBalance.sub(amount);
            const nextCardBalance = card.balance.add(amount);

            await tx.user.update({
              where: {id: userId},
              data: {k3h4CoinBalance: nextUserBalance}
            });
            await recordBankTransactionEntity(tx, {
              userId,
              amount,
              direction: BankTransactionDirection.DEBIT,
              kind: BankTransactionKind.ARCADE_TOPUP,
              note: `Top-up card ${card.id}`,
              balanceAfter: nextUserBalance,
              targetType: 'arcade_card',
              targetId: card.id,
              name: card.label ?? card.id,
            });

            const updatedCard = await tx.arcadeCard.update(
                {where: {id}, data: {balance: nextCardBalance}});
            await tx.arcadeTopUp.create({
              data: {
                userId,
                cardId: card.id,
                amount,
                source: body?.source ?? 'k3h4-coin',
              },
            });

            return {card: updatedCard, nextBalance: nextCardBalance};
          });

          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'arcade.card.topup',
            source: 'api',
            payload: {cardId: id, amount: amount.toFixed(2)},
          });
          return {card: {...card, balance: serializeDecimal(nextBalance)}};
        } catch (err) {
          request.log.error({err}, 'arcade top-up failed');
          return reply.status(400).send(
              {error: err instanceof Error ? err.message : 'Unable to top up'});
        }
      },
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
          stock?: number
        };
        const cost = new Prisma.Decimal(Number(body.costCoins).toFixed(2));
        const prize = await prisma.arcadePrize.create({
          data: {
            userId,
            name: body.name,
            sku: body.sku ?? null,
            costCoins: cost,
            stock: Number.isFinite(body.stock) ?
                Math.max(0, Math.floor(Number(body.stock))) :
                0,
          },
        });
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'arcade.prize.create',
          source: 'api',
          payload: {name: prize.name, stock: prize.stock},
        });
        return {prize};
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
          score?: number
        };
        const credits = Number(body.creditsSpent);
        if (!Number.isFinite(credits) || credits <= 0)
          return reply.status(400).send({error: 'creditsSpent must be > 0'});

        try {
          const session = await prisma.$transaction(async (tx) => {
            const card = await tx.arcadeCard.findFirst(
                {where: {id: body.cardId, userId}});
            if (!card) throw new Error('Card not found');
            if (card.balance.lessThan(credits))
              throw new Error('Insufficient card balance');
            const machine = await tx.arcadeMachine.findFirst(
                {where: {id: body.machineId, userId}});
            if (!machine) throw new Error('Machine not found');

            const nextBalance = card.balance.sub(credits);
            await tx.arcadeCard.update(
                {where: {id: card.id}, data: {balance: nextBalance}});

            const session = await tx.arcadeSession.create({
              data: {
                userId,
                machineId: machine.id,
                cardId: card.id,
                creditsSpent: new Prisma.Decimal(credits.toFixed(2)),
                score: Number.isFinite(body.score) ?
                    Math.floor(Number(body.score)) :
                    null,
              },
            });

            return {session, nextBalance};
          });

          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'arcade.session.start',
            source: 'api',
            payload: {machineId: body.machineId, credits: credits.toFixed(2)},
          });

          return {
            session: session.session,
            balance: serializeDecimal(session.nextBalance)
          };
        } catch (err) {
          request.log.error({err}, 'arcade session failed');
          return reply.status(400).send({
            error: err instanceof Error ? err.message :
                                          'Unable to start session'
          });
        }
      },
  );

  server.post(
      '/arcade/prizes/:id/redeem',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const prizeId = (request.params as {id: string}).id;
        const body = request.body as {
          cardId: string;
          sessionId?: string
        };

        try {
          const redemption = await prisma.$transaction(async (tx) => {
            const prize =
                await tx.arcadePrize.findFirst({where: {id: prizeId, userId}});
            if (!prize) throw new Error('Prize not found');
            if (prize.stock <= 0) throw new Error('Prize out of stock');

            const card = await tx.arcadeCard.findFirst(
                {where: {id: body.cardId, userId}});
            if (!card) throw new Error('Card not found');
            if (card.balance.lessThan(prize.costCoins))
              throw new Error('Insufficient card balance');

            const nextCardBalance = card.balance.sub(prize.costCoins);
            await tx.arcadeCard.update(
                {where: {id: card.id}, data: {balance: nextCardBalance}});

            const updatedPrize = await tx.arcadePrize.update(
                {where: {id: prize.id}, data: {stock: prize.stock - 1}});

            const redemption = await tx.arcadeRedemption.create({
              data: {
                userId,
                cardId: card.id,
                prizeId: prize.id,
                status: LifecycleStatus.PENDING,
                sessions: body.sessionId ? {connect: {id: body.sessionId}} :
                                           undefined,
              },
            });

            return {
              redemption,
              cardBalance: nextCardBalance,
              prizeStock: updatedPrize.stock
            };
          });

          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'arcade.prize.redeem',
            source: 'api',
            payload: {prizeId, cardId: body.cardId},
          });

          return {
            redemption: redemption.redemption,
            balance: serializeDecimal(redemption.cardBalance),
            prizeStock: redemption.prizeStock
          };
        } catch (err) {
          request.log.error({err}, 'arcade redemption failed');
          return reply.status(400).send({
            error: err instanceof Error ? err.message : 'Unable to redeem prize'
          });
        }
      },
  );
}
