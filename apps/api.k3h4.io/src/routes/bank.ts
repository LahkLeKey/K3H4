import {type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {changeBankBalance, getBankBalance, listBankTransactions} from '../kits/bank-ledger';

import {withTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

export function registerBankRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get(
      '/bank/balance',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const balance = await getBankBalance(prisma, userId);
        if (!balance) return reply.status(404).send({error: 'User not found'});

        await rt({
          eventType: 'bank.balance.fetch',
          source: 'api',
          payload: {balance: balance.balance}
        });
        return balance;
      },
  );

  server.post(
      '/bank/balance',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          delta?: number|string;
          set?: number|string;
          reason?: string
        }
        |undefined;

        try {
          const result = await changeBankBalance(prisma, {
            userId,
            delta: body?.delta,
            set: body?.set,
            reason: body?.reason,
          });

          await rt({
            eventType: 'bank.balance.update',
            source: 'api',
            payload:
                {mode: body?.set !== undefined ? 'set' : 'delta',
                  reason: body?.reason ?? null}
          });

          return result;
        } catch (err) {
          request.log.error({err}, 'balance update failed');
          return reply.status(400).send({
            error: err instanceof Error ? err.message :
                                          'Unable to update balance'
          });
        }
      },
  );

  server.get(
      '/bank/transactions',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const query = request.query as {
          limit?: string;
          offset?: string;
          from?: string;
          to?: string;
          direction?: string;
        };

        const result = await listBankTransactions(prisma, {userId, ...query});

        await rt({
          eventType: 'bank.transactions.list',
          source: 'api',
          payload: {
            ...result.request,
            total: result.total
          }
        });

        return {transactions: result.transactions, total: result.total};
      },
  );
}
