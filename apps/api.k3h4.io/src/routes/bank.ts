import {Prisma, PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {
  BankActorType,
  BankTransactionDirection,
  BankTransactionKind,
  buildBankTransactionWhere,
  recordBankTransactionEntity,
} from '../services/bank-actor';

import {withTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const MAX_ABSOLUTE_BALANCE = 1_000_000_000;

const normalizeAmount = (value: unknown) => {
  const num = typeof value === 'number' ? value :
      typeof value === 'string'         ? Number(value) :
                                          NaN;
  if (!Number.isFinite(num)) return null;
  if (Math.abs(num) > MAX_ABSOLUTE_BALANCE) return null;
  return new Prisma.Decimal(num.toFixed(2));
};

const serializeTransaction = (entity: {
  id: string; metadata: Prisma.JsonValue | null; createdAt: Date;
  targetType?: string | null;
  targetId?: string | null;
  name?: string | null;
  direction?: BankTransactionDirection | null;
  kind?: BankTransactionKind | null;
}) => {
  const metadata = (entity.metadata as {
                     amount?: string;
                     balanceAfter?: string;
                     direction?: string;
                     kind?: string;
                     note?: string|null;
                   } |
                    null) ??
      {};

  return {
    id: entity.id,
    amount: metadata.amount ?? '0.00',
    balanceAfter: metadata.balanceAfter ?? '0.00',
    direction: entity.direction?.toLowerCase() ?? metadata.direction ?? '',
    kind: entity.kind?.toLowerCase() ?? metadata.kind ?? '',
    note: metadata.note ?? null,
    createdAt: entity.createdAt,
    targetType: entity.targetType ?? null,
    targetId: entity.targetId ?? null,
    name: entity.name ?? null,
  };
};

export function registerBankRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get(
      '/bank/balance',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const user = await prisma.user.findUnique(
            {where: {id: userId}, select: {k3h4CoinBalance: true}});
        if (!user) return reply.status(404).send({error: 'User not found'});

        await rt({
          eventType: 'bank.balance.fetch',
          source: 'api',
          payload: {
            balance: user.k3h4CoinBalance ? user.k3h4CoinBalance.toFixed(2) :
                                            '0.00'
          }
        });
        return {
          balance: user.k3h4CoinBalance ? user.k3h4CoinBalance.toFixed(2) :
                                          '0.00'
        };
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

        const hasDelta = body?.delta !== undefined;
        const hasSet = body?.set !== undefined;
        if (!hasDelta && !hasSet)
          return reply.status(400).send({error: 'Provide delta or set'});
        if (hasDelta && hasSet)
          return reply.status(400).send({error: 'Choose either delta or set'});

        const delta = hasDelta ? normalizeAmount(body?.delta) : null;
        const setAmount = hasSet ? normalizeAmount(body?.set) : null;

        if ((hasDelta && !delta) || (hasSet && !setAmount)) {
          return reply.status(400).send(
              {error: 'Amount must be a finite number within limits'});
        }

        try {
          const {
            nextBalance,
            transaction
          } = await prisma.$transaction(async (tx) => {
            const user = await tx.user.findUnique(
                {where: {id: userId}, select: {k3h4CoinBalance: true}});
            if (!user) throw new Error('User not found');

            const prevBalance = user.k3h4CoinBalance;
            const nextBalance = setAmount ?
                setAmount :
                prevBalance.add(delta ?? new Prisma.Decimal(0));
            const change = nextBalance.sub(prevBalance);
            const isCredit = change.greaterThan(0) || change.equals(0);

            const saved = await tx.user.update(
                {where: {id: userId}, data: {k3h4CoinBalance: nextBalance}});
            const txn = await recordBankTransactionEntity(tx, {
              userId,
              amount: change.abs(),
              direction: isCredit ? BankTransactionDirection.CREDIT :
                                         BankTransactionDirection.DEBIT,
              kind: hasSet ? BankTransactionKind.SET :
                  isCredit ? BankTransactionKind.DEPOSIT :
                             BankTransactionKind.WITHDRAWAL,
              note: body?.reason ?? null,
              balanceAfter: saved.k3h4CoinBalance,
            });

            return {nextBalance: saved.k3h4CoinBalance, transaction: txn};
          });

          await rt({
            eventType: 'bank.balance.update',
            source: 'api',
            payload:
                {mode: hasSet ? 'set' : 'delta', reason: body?.reason ?? null}
          });

          return {
            balance: nextBalance ? nextBalance.toFixed(2) : '0.00',
            transaction: serializeTransaction(transaction),
          };
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

        const limit = (() => {
          const parsed = query?.limit ? Number(query.limit) : 20;
          if (!Number.isFinite(parsed)) return 20;
          return Math.min(Math.max(Math.floor(parsed), 1), 100);
        })();

        const offset = (() => {
          const parsed = query?.offset ? Number(query.offset) : 0;
          if (!Number.isFinite(parsed)) return 0;
          return Math.max(Math.floor(parsed), 0);
        })();

        const direction =
          query?.direction === 'credit' ? BankTransactionDirection.CREDIT :
          query?.direction === 'debit' ? BankTransactionDirection.DEBIT :
          undefined;
        const directionLabel = direction?.toLowerCase() ?? '';

        const from = query?.from ? new Date(query.from) : undefined;
        const to = query?.to ? new Date(query.to) : undefined;
        const validFrom =
            from && !Number.isNaN(from.valueOf()) ? from : undefined;
        const validTo = to && !Number.isNaN(to.valueOf()) ? to : undefined;

        const actor = await prisma.actor.findFirst(
          {where: {userId, type: BankActorType.BANK_ACCOUNT},
           select: {id: true}});
        if (!actor) {
          await rt({
            eventType: 'bank.transactions.list',
            source: 'api',
            payload: {
              limit,
              offset,
              direction: directionLabel,
              from: query?.from ?? null,
              to: query?.to ?? null,
              total: 0,
            },
          });
          return {transactions: [], total: 0};
        }

        const where = buildBankTransactionWhere(actor.id, {
          direction,
          from: validFrom,
          to: validTo,
        });

        const [total, txns] = await Promise.all([
          prisma.entity.count({where}),
          prisma.entity.findMany({
            where,
            orderBy: {createdAt: 'desc'},
            skip: offset,
            take: limit,
          }),
        ]);

        await rt({
          eventType: 'bank.transactions.list',
          source: 'api',
          payload: {
            limit,
            offset,
            direction: directionLabel,
            from: query?.from ?? null,
            to: query?.to ?? null,
            total
          }
        });

        return {transactions: txns.map(serializeTransaction), total};
      },
  );
}
