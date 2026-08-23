import {Prisma, type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {recordBankLedgerEntry} from '../kits/bank-ledger';
import {createArcadeCard, createArcadeMachine, createArcadePrize, getArcadeOverview, redeemArcadePrize, startArcadeSession, topUpArcadeCard} from '../kits/arcade-operations';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

export function registerArcadeRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get(
      '/arcade/overview',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const response = await getArcadeOverview(prisma, userId);

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
      '/arcade/machines',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {name: string; status?: string};
        const machine = await createArcadeMachine(prisma, {
          userId,
          name: body.name,
          status: body.status,
        });
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'arcade.machine.create',
          source: 'api',
          payload: {name: machine.name},
        });
        return {machine};
      },
  );

  server.post(
      '/arcade/cards',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {label?: string} | undefined;
        const card = await createArcadeCard(prisma, {
          userId,
          label: body?.label,
        });
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'arcade.card.create',
          source: 'api',
          payload: {label: card.label ?? ''},
        });
        return {card};
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
        return topUpArcadeCard(tx, {
          userId,
          cardId: id,
          amount: amount.toFixed(2),
          source: body?.source,
        });
      });

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: 'arcade.card.topup',
        source: 'api',
        payload: {cardId: id, amount: amount.toFixed(2)},
      });

      return {balance};
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
        const prize = await createArcadePrize(prisma, {
          userId,
          name: body.name,
          sku: body.sku,
          costCoins: body.costCoins,
          stock: body.stock,
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
          score?: number;
        };
        const credits = Number(body.creditsSpent);
        if (!Number.isFinite(credits) || credits <= 0)
          return reply.status(400).send({error: 'creditsSpent must be > 0'});
        const amount = new Prisma.Decimal(credits.toFixed(2));

        try {
          const result = await prisma.$transaction(async (tx) => {
            return startArcadeSession(tx, {
              userId,
              cardId: body.cardId,
              machineId: body.machineId,
              creditsSpent: amount.toFixed(2),
              score: body.score,
            });
          });

          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'arcade.session.start',
            source: 'api',
            payload: {machineId: body.machineId, credits: credits.toFixed(2)},
          });

          return result;
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
      const result = await prisma.$transaction(async (tx) =>
        redeemArcadePrize(tx, {
          userId,
          prizeId,
          cardId: body.cardId,
          sessionId: body.sessionId,
        }));

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: 'arcade.prize.redeem',
        source: 'api',
        payload: {prizeId, cardId: body.cardId},
      });

      return {
        redemption: result.redemption,
        balance: result.balance,
        prizeStock: result.prizeStock,
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
