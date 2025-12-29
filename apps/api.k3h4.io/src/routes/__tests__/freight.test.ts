import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import Fastify from "fastify";
import { Prisma } from "@prisma/client";
import { registerFreightRoutes } from "../freight";

const recordTelemetry = vi.fn();
const userId = "user-1";

function buildServer(prisma: any) {
  const server = Fastify();
  server.decorate("authenticate", async (request: any) => {
    request.user = { sub: userId };
  });
  registerFreightRoutes(server as any, prisma as any, recordTelemetry);
  return server;
}

describe("freight routes", () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("lists loads", async () => {
    const prisma = {
      freightLoad: { findMany: vi.fn().mockResolvedValue([{ id: "l1", distanceKm: new Prisma.Decimal("10"), cost: new Prisma.Decimal("20"), createdAt: new Date() }]) },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "GET", url: "/freight" });
    expect(res.statusCode).toBe(200);
    expect(res.json().loads).toHaveLength(1);
  });

  it("creates a load with osrm data", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ routes: [{ distance: 10000, duration: 600, geometry: {} }] }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const prisma = {
      freightLoad: { create: vi.fn().mockResolvedValue({ id: "l1", distanceKm: new Prisma.Decimal("10"), cost: new Prisma.Decimal("20"), createdAt: new Date() }) },
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: "POST",
      url: "/freight",
      payload: {
        title: "Load",
        originName: "A",
        originLat: 1,
        originLng: 1,
        destinationName: "B",
        destinationLat: 2,
        destinationLng: 2,
        ratePerKm: 2,
      },
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.freightLoad.create).toHaveBeenCalled();
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "freight.create" }));
  });

  it("falls back when osrm fails", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("network"));
    vi.stubGlobal("fetch", fetchMock);

    const prisma = {
      freightLoad: {
        create: vi.fn().mockResolvedValue({ id: "l2", distanceKm: new Prisma.Decimal("0"), cost: new Prisma.Decimal("0"), createdAt: new Date() }),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: "POST",
      url: "/freight",
      payload: { title: "Fallback", originName: "A", originLat: 1, originLng: 1, destinationName: "B", destinationLat: 2, destinationLng: 2 },
    });

    expect(res.statusCode).toBe(200);
    expect(prisma.freightLoad.create).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ distanceKm: new Prisma.Decimal("0.00"), cost: new Prisma.Decimal("0.00") }) }),
    );
  });

  it("falls back when osrm returns empty route", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ routes: [] }) } as Response);
    vi.stubGlobal("fetch", fetchMock);
    const prisma = {
      freightLoad: { create: vi.fn().mockResolvedValue({ id: "l3", distanceKm: new Prisma.Decimal("0"), cost: new Prisma.Decimal("0"), createdAt: new Date() }) },
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: "POST",
      url: "/freight",
      payload: { title: "Empty", originName: "A", originLat: 1, originLng: 1, destinationName: "B", destinationLat: 2, destinationLng: 2 },
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.freightLoad.create).toHaveBeenCalled();
  });

  it("rejects invalid coordinates", async () => {
    const prisma = { freightLoad: { create: vi.fn() } };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: "POST",
      url: "/freight",
      payload: { title: "Bad", originName: "A", destinationName: "B", originLat: "NaN", originLng: 1, destinationLat: 2, destinationLng: 3 },
    });
    expect(res.statusCode).toBe(400);
  });

  it("rejects missing required text fields", async () => {
    const prisma = { freightLoad: { create: vi.fn() } };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: "POST",
      url: "/freight",
      payload: { title: "", originName: "", destinationName: "", originLat: 1, originLng: 1, destinationLat: 2, destinationLng: 2 },
    });
    expect(res.statusCode).toBe(400);
  });

  it("completes a load and debits balance", async () => {
    const txUser = {
      findUnique: vi.fn().mockResolvedValue({ k3h4CoinBalance: new Prisma.Decimal("500.00") }),
      update: vi.fn().mockResolvedValue({ k3h4CoinBalance: new Prisma.Decimal("480.00") }),
    };
    const txBank = { create: vi.fn() };
    const txFreight = { update: vi.fn().mockResolvedValue({ id: "l1", status: "completed", cost: new Prisma.Decimal("20") }) };

    const prisma = {
      freightLoad: { findFirst: vi.fn().mockResolvedValue({ id: "l1", userId, status: "planning", cost: new Prisma.Decimal("20.00") }) },
      user: txUser,
      bankTransaction: txBank,
      $transaction: vi.fn(async (cb) => cb({ user: txUser, bankTransaction: txBank, freightLoad: txFreight } as any)),
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/freight/l1/complete" });
    expect(res.statusCode).toBe(200);
    expect(txBank.create).toHaveBeenCalled();
    expect(txFreight.update).toHaveBeenCalled();
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "freight.complete" }));
  });

  it("rejects missing load", async () => {
    const prisma = {
      freightLoad: { findFirst: vi.fn().mockResolvedValue(null) },
      user: {},
      bankTransaction: {},
      $transaction: vi.fn(),
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/freight/missing/complete" });
    expect(res.statusCode).toBe(404);
  });

  it("rejects already completed load", async () => {
    const prisma = {
      freightLoad: { findFirst: vi.fn().mockResolvedValue({ id: "l1", userId, status: "completed", cost: new Prisma.Decimal("1") }) },
      user: {},
      bankTransaction: {},
      $transaction: vi.fn(),
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/freight/l1/complete" });
    expect(res.statusCode).toBe(400);
  });

  it("returns 400 when completion transaction fails", async () => {
    const prisma = {
      freightLoad: { findFirst: vi.fn().mockResolvedValue({ id: "l1", userId, status: "planning", cost: new Prisma.Decimal("5") }) },
      $transaction: vi.fn(async () => {
        throw new Error("tx failed");
      }),
      user: {},
      bankTransaction: {},
      freightLoadUpdate: {},
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/freight/l1/complete" });
    expect(res.statusCode).toBe(400);
  });
});
