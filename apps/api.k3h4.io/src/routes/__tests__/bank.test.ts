import { describe, it, expect, vi, beforeEach } from "vitest";
import Fastify from "fastify";
import { Prisma } from "@prisma/client";
import { registerBankRoutes } from "../bank";
import { type RecordTelemetryFn } from "../types";

const recordTelemetry = vi.fn() as unknown as RecordTelemetryFn;
const userId = "user-1";

function buildServer(prisma: any) {
  const server = Fastify();
  server.decorate("authenticate", async (request: any) => {
    request.user = { sub: userId };
  });
  registerBankRoutes(server as any, prisma as any, recordTelemetry);
  return server;
}

describe("bank routes", () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
  });

  it("returns balance", async () => {
    const prisma = {
      user: { findUnique: vi.fn().mockResolvedValue({ k3h4CoinBalance: new Prisma.Decimal("100.00") }) },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "GET", url: "/bank/balance" });
    expect(res.statusCode).toBe(200);
    expect(res.json().balance).toBe("100.00");
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "bank.balance.fetch" }));
  });

  it("returns 404 when balance user missing", async () => {
    const prisma = { user: { findUnique: vi.fn().mockResolvedValue(null) } };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "GET", url: "/bank/balance" });
    expect(res.statusCode).toBe(404);
  });

  it("updates balance with delta", async () => {
    const txBank = { create: vi.fn().mockResolvedValue({ id: "t1", amount: new Prisma.Decimal("10"), balanceAfter: new Prisma.Decimal("110") }) };
    const txUser = {
      findUnique: vi.fn().mockResolvedValue({ k3h4CoinBalance: new Prisma.Decimal("100.00") }),
      update: vi.fn().mockResolvedValue({ k3h4CoinBalance: new Prisma.Decimal("110.00") }),
    };
    const prisma = {
      user: txUser,
      bankTransaction: { count: vi.fn(), findMany: vi.fn() },
      $transaction: vi.fn(async (cb) => cb({ user: txUser, bankTransaction: txBank } as any)),
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/bank/balance", payload: { delta: 10, reason: "bonus" } });
    expect(res.statusCode).toBe(200);
    expect(txBank.create).toHaveBeenCalled();
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "bank.balance.update" }));
  });

  it("handles balance update when user missing", async () => {
    const prisma = {
      user: {
        findUnique: vi.fn().mockResolvedValue(null),
      },
      bankTransaction: {},
      $transaction: vi.fn(async (cb) => cb({ user: { findUnique: prisma.user.findUnique } } as any)),
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/bank/balance", payload: { delta: 5 } });
    expect(res.statusCode).toBe(400);
  });

  it("rejects missing amounts", async () => {
    const prisma = {
      user: { findUnique: vi.fn() },
      bankTransaction: { count: vi.fn(), findMany: vi.fn() },
      $transaction: vi.fn(),
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/bank/balance", payload: {} });
    expect(res.statusCode).toBe(400);
  });

  it("rejects conflicting set and delta", async () => {
    const prisma = { user: { findUnique: vi.fn() }, bankTransaction: { count: vi.fn(), findMany: vi.fn() }, $transaction: vi.fn() };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/bank/balance", payload: { delta: 1, set: 2 } });
    expect(res.statusCode).toBe(400);
  });

  it("sets balance explicitly", async () => {
    const txBank = { create: vi.fn().mockResolvedValue({
      id: "t2",
      amount: new Prisma.Decimal("40"),
      direction: "credit",
      kind: "set",
      note: null,
      balanceAfter: new Prisma.Decimal("50"),
      createdAt: new Date(),
    }) };
    const txUser = {
      findUnique: vi.fn().mockResolvedValue({ k3h4CoinBalance: new Prisma.Decimal("10.00") }),
      update: vi.fn().mockResolvedValue({ k3h4CoinBalance: new Prisma.Decimal("50.00") }),
    };
    const prisma = {
      user: txUser,
      bankTransaction: { count: vi.fn(), findMany: vi.fn() },
      $transaction: vi.fn(async (cb) => cb({ user: txUser, bankTransaction: txBank } as any)),
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/bank/balance", payload: { set: 50 } });
    expect(res.statusCode).toBe(200);
    expect(txBank.create).toHaveBeenCalled();
  });

  it("rejects amounts over limit", async () => {
    const prisma = { user: { findUnique: vi.fn() }, bankTransaction: { count: vi.fn(), findMany: vi.fn() }, $transaction: vi.fn() };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/bank/balance", payload: { delta: 2_000_000_000 } });
    expect(res.statusCode).toBe(400);
  });

  it("rejects non-numeric delta", async () => {
    const prisma = { user: { findUnique: vi.fn() }, bankTransaction: { count: vi.fn(), findMany: vi.fn() }, $transaction: vi.fn() };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/bank/balance", payload: { delta: "abc" } });
    expect(res.statusCode).toBe(400);
  });

  it("lists transactions", async () => {
    const prisma = {
      user: { findUnique: vi.fn() },
      bankTransaction: {
        count: vi.fn().mockResolvedValue(1),
        findMany: vi.fn().mockResolvedValue([
          {
            id: "t1",
            amount: new Prisma.Decimal("5"),
            direction: "credit",
            kind: "deposit",
            note: null,
            balanceAfter: new Prisma.Decimal("105"),
            createdAt: new Date(),
          },
        ]),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "GET", url: "/bank/transactions?limit=1" });
    expect(res.statusCode).toBe(200);
    expect(res.json().total).toBe(1);
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "bank.transactions.list" }));
  });

  it("applies transaction filters", async () => {
    const prisma = {
      user: { findUnique: vi.fn() },
      bankTransaction: {
        count: vi.fn().mockResolvedValue(0),
        findMany: vi.fn().mockResolvedValue([]),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "GET", url: "/bank/transactions?direction=credit&from=2024-01-01&to=2024-02-01" });
    expect(res.statusCode).toBe(200);
    expect(prisma.bankTransaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ direction: "credit", createdAt: expect.objectContaining({ gte: expect.any(Date), lte: expect.any(Date) }) }) }),
    );
  });

  it("ignores invalid transaction filters", async () => {
    const prisma = {
      user: { findUnique: vi.fn() },
      bankTransaction: {
        count: vi.fn().mockResolvedValue(0),
        findMany: vi.fn().mockResolvedValue([]),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "GET", url: "/bank/transactions?direction=invalid&from=bad&to=alsobad" });
    expect(res.statusCode).toBe(200);
    expect(prisma.bankTransaction.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ direction: undefined, createdAt: undefined }) }),
    );
  });
});
