import { describe, it, expect, vi, beforeEach } from "vitest";
import Fastify from "fastify";
import { Prisma } from "@prisma/client";
import { registerAssignmentRoutes } from "../assignment";
import { type RecordTelemetryFn } from "../types";

const recordTelemetry = vi.fn() as unknown as RecordTelemetryFn;
const userId = "user-1";

function buildServer(prisma: any) {
  const server = Fastify();
  server.decorate("authenticate", async (request: any) => {
    request.user = { sub: userId };
  });
  registerAssignmentRoutes(server as any, prisma as any, recordTelemetry);
  return server;
}

describe("assignment routes", () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
  });

  it("lists assignments", async () => {
    const prisma = {
      assignment: {
        findMany: vi.fn().mockResolvedValue([
          {
            id: "a1",
            title: "Gig",
            hourlyRate: new Prisma.Decimal("100"),
            persona: { id: "p1", alias: "A", account: "a@test.com", handle: "@a" },
            timecards: [],
            payouts: [],
            createdAt: new Date(),
          },
        ]),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "GET", url: "/assignments" });
    expect(res.statusCode).toBe(200);
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "assignment.list" }));
  });

  it("creates an assignment", async () => {
    const prisma = {
      persona: { findFirst: vi.fn().mockResolvedValue({ id: "p1" }) },
      assignment: {
        create: vi.fn().mockResolvedValue({
          id: "a2",
          title: "New Gig",
          hourlyRate: new Prisma.Decimal("50"),
          persona: { id: "p1", alias: "A", account: "a@test.com", handle: "@a" },
          timecards: [],
          payouts: [],
        }),
        findMany: vi.fn(),
        findUnique: vi.fn(),
        findFirst: vi.fn(),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/assignments", payload: { title: "New Gig", personaId: "p1", hourlyRate: 50 } });
    expect(res.statusCode).toBe(200);
    expect(prisma.assignment.create).toHaveBeenCalled();
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "assignment.create" }));
  });

  it("rejects missing title", async () => {
    const prisma = { persona: { findFirst: vi.fn() }, assignment: { create: vi.fn() } };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/assignments", payload: { personaId: "p1" } });
    expect(res.statusCode).toBe(400);
  });

  it("creates a timecard and payout", async () => {
    const txUser = {
      findUnique: vi.fn().mockResolvedValue({ k3h4CoinBalance: new Prisma.Decimal("200.00") }),
      update: vi.fn().mockResolvedValue({ k3h4CoinBalance: new Prisma.Decimal("100.00") }),
    };
    const txBank = { create: vi.fn() };
    const txPayout = { create: vi.fn().mockResolvedValue({ id: "pay1", amount: new Prisma.Decimal("100") }) };
    const txTimecard = { update: vi.fn() };

    const prisma = {
      persona: { findFirst: vi.fn().mockResolvedValue({ id: "p1" }) },
      assignment: {
        findFirst: vi.fn().mockResolvedValue({ id: "a3", userId, hourlyRate: new Prisma.Decimal("100"), title: "Gig", personaId: "p1", timecards: [{ id: "t1", amount: new Prisma.Decimal("100"), status: "approved" }], persona: { alias: "A" } }),
        findUnique: vi.fn().mockResolvedValue({
          id: "a3",
          title: "Gig",
          hourlyRate: new Prisma.Decimal("100"),
          persona: { id: "p1", alias: "A", account: "a@test.com", handle: "@a" },
          timecards: [],
          payouts: [],
        }),
      },
      assignmentTimecard: {
        create: vi.fn().mockResolvedValue({ id: "t1", hours: new Prisma.Decimal("1"), amount: new Prisma.Decimal("100"), status: "approved" }),
      },
      bankTransaction: txBank,
      assignmentPayout: txPayout,
      $transaction: vi.fn(async (cb) => cb({ user: txUser, bankTransaction: txBank, assignmentPayout: txPayout, assignmentTimecard: txTimecard } as any)),
    };
    const server = buildServer(prisma);

    const timecardRes = await server.inject({ method: "POST", url: "/assignments/a3/timecards", payload: { hours: 1 } });
    expect(timecardRes.statusCode).toBe(200);
    expect(prisma.assignmentTimecard.create).toHaveBeenCalled();

    const payRes = await server.inject({ method: "POST", url: "/assignments/a3/pay", payload: { timecardId: "t1", note: "pay now" } });
    expect(payRes.statusCode).toBe(200);
    expect(txBank.create).toHaveBeenCalled();
    expect(txPayout.create).toHaveBeenCalled();
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "assignment.payout" }));
  });

  it("rejects invalid timecard hours", async () => {
    const prisma = {
      assignment: { findFirst: vi.fn().mockResolvedValue({ id: "a3", userId, hourlyRate: new Prisma.Decimal("100") }) },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/assignments/a3/timecards", payload: { hours: 0 } });
    expect(res.statusCode).toBe(400);
  });

  it("handles payout errors gracefully", async () => {
    const prisma = {
      assignment: {
        findFirst: vi.fn().mockResolvedValue({ id: "a4", userId, hourlyRate: new Prisma.Decimal("50"), title: "Gig", personaId: "p1", timecards: [{ id: "t1", amount: new Prisma.Decimal("50"), status: "approved" }], persona: { alias: "A" } }),
        findUnique: vi.fn(),
      },
      user: {},
      bankTransaction: {},
      assignmentPayout: {},
      assignmentTimecard: {},
      $transaction: vi.fn(async () => {
        throw new Error("payout fail");
      }),
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/assignments/a4/pay", payload: { timecardId: "t1" } });
    expect(res.statusCode).toBe(400);
  });

  it("returns payout even when refreshed assignment missing", async () => {
    const txUser = {
      findUnique: vi.fn().mockResolvedValue({ k3h4CoinBalance: new Prisma.Decimal("100.00") }),
      update: vi.fn().mockResolvedValue({ k3h4CoinBalance: new Prisma.Decimal("50.00") }),
    };
    const txBank = { create: vi.fn().mockResolvedValue({}) };
    const txPayout = { create: vi.fn().mockResolvedValue({ id: "pay-missing", amount: new Prisma.Decimal("50"), note: "" }) };
    const prisma = {
      assignment: {
        findFirst: vi.fn().mockResolvedValue({ id: "a5", userId, hourlyRate: new Prisma.Decimal("50"), title: "Gig", personaId: "p1", timecards: [{ id: "t1", amount: new Prisma.Decimal("50"), status: "approved" }], persona: { alias: "A" } }),
        findUnique: vi.fn().mockResolvedValue(null),
      },
      bankTransaction: txBank,
      assignmentPayout: txPayout,
      assignmentTimecard: { update: vi.fn() },
      user: txUser,
      $transaction: vi.fn(async (cb) => cb({ user: txUser, bankTransaction: txBank, assignmentPayout: txPayout, assignmentTimecard: { update: vi.fn() } } as any)),
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/assignments/a5/pay", payload: { timecardId: "t1" } });
    expect(res.statusCode).toBe(200);
    expect(res.json().assignment).toBeNull();
    expect(res.json().payout).toBeDefined();
  });
});
