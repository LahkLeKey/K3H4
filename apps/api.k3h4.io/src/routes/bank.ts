import { Prisma, PrismaClient } from "@prisma/client";
import { type FastifyInstance, type FastifyRequest } from "fastify";
import { buildTelemetryBase } from "./telemetry";
import { type RecordTelemetryFn } from "./types";

const MAX_ABSOLUTE_BALANCE = 1_000_000_000;

const normalizeAmount = (value: unknown) => {
  const num = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  if (!Number.isFinite(num)) return null;
  if (Math.abs(num) > MAX_ABSOLUTE_BALANCE) return null;
  return new Prisma.Decimal(num.toFixed(2));
};

const serializeTransaction = (txn: {
  id: string;
  amount: Prisma.Decimal;
  direction: string;
  kind: string;
  note: string | null;
  balanceAfter: Prisma.Decimal;
  createdAt: Date;
}) => ({
  ...txn,
  amount: txn.amount.toFixed(2),
  balanceAfter: txn.balanceAfter.toFixed(2),
});

export function registerBankRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  server.get(
    "/bank/balance",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const user = await prisma.user.findUnique({ where: { id: userId }, select: { k3h4CoinBalance: true } });
      if (!user) return reply.status(404).send({ error: "User not found" });

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: "bank.balance.fetch",
        source: "api",
        payload: { balance: user.k3h4CoinBalance ? user.k3h4CoinBalance.toFixed(2) : "0.00" },
      });
      return { balance: user.k3h4CoinBalance ? user.k3h4CoinBalance.toFixed(2) : "0.00" };
    },
  );

  server.post(
    "/bank/balance",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as { delta?: number | string; set?: number | string; reason?: string } | undefined;

      const hasDelta = body?.delta !== undefined;
      const hasSet = body?.set !== undefined;
      if (!hasDelta && !hasSet) return reply.status(400).send({ error: "Provide delta or set" });
      if (hasDelta && hasSet) return reply.status(400).send({ error: "Choose either delta or set" });

      const delta = hasDelta ? normalizeAmount(body?.delta) : null;
      const setAmount = hasSet ? normalizeAmount(body?.set) : null;

      if ((hasDelta && !delta) || (hasSet && !setAmount)) {
        return reply.status(400).send({ error: "Amount must be a finite number within limits" });
      }

      try {
        const { nextBalance, transaction } = await prisma.$transaction(async (tx) => {
          const user = await tx.user.findUnique({ where: { id: userId }, select: { k3h4CoinBalance: true } });
          if (!user) throw new Error("User not found");

          const prevBalance = user.k3h4CoinBalance;
          const nextBalance = setAmount ? setAmount : prevBalance.add(delta ?? new Prisma.Decimal(0));
          const change = nextBalance.sub(prevBalance);
          const isCredit = change.greaterThan(0) || change.equals(0);

          const saved = await tx.user.update({ where: { id: userId }, data: { k3h4CoinBalance: nextBalance } });
          const txn = await tx.bankTransaction.create({
            data: {
              userId,
              amount: change.abs(),
              direction: isCredit ? "credit" : "debit",
              kind: hasSet ? "set" : isCredit ? "deposit" : "withdrawal",
              note: body?.reason ?? null,
              balanceAfter: saved.k3h4CoinBalance,
            },
          });

          return { nextBalance: saved.k3h4CoinBalance, transaction: txn };
        });

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: "bank.balance.update",
          source: "api",
          payload: {
            mode: hasSet ? "set" : "delta",
            reason: body?.reason ?? null,
          },
        });

        return {
          balance: nextBalance ? nextBalance.toFixed(2) : "0.00",
          transaction: serializeTransaction(transaction),
        };
      } catch (err) {
        request.log.error({ err }, "balance update failed");
        return reply.status(400).send({ error: err instanceof Error ? err.message : "Unable to update balance" });
      }
    },
  );

  server.get(
    "/bank/transactions",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
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

      const direction = query?.direction === "credit" || query?.direction === "debit" ? query.direction : undefined;

      const createdAt: Prisma.DateTimeFilter | undefined = (() => {
        const from = query?.from ? new Date(query.from) : undefined;
        const to = query?.to ? new Date(query.to) : undefined;
        const validFrom = from && !Number.isNaN(from.valueOf()) ? from : undefined;
        const validTo = to && !Number.isNaN(to.valueOf()) ? to : undefined;
        if (!validFrom && !validTo) return undefined;
        return { gte: validFrom, lte: validTo };
      })();

      const where: Prisma.BankTransactionWhereInput = {
        userId,
        direction,
        createdAt,
      };

      const [total, txns] = await Promise.all([
        prisma.bankTransaction.count({ where }),
        prisma.bankTransaction.findMany({
          where,
          orderBy: { createdAt: "desc" },
          skip: offset,
          take: limit,
        }),
      ]);

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: "bank.transactions.list",
        source: "api",
        payload: { limit, offset, direction: direction ?? "", from: query?.from ?? null, to: query?.to ?? null, total },
      });

      return { transactions: txns.map(serializeTransaction), total };
    },
  );
}
