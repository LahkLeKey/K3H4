import { describe, it, expect, vi, beforeEach } from "vitest";
import Fastify from "fastify";
import { Prisma } from "@prisma/client";
import { registerPosRoutes } from "../pos";

const recordTelemetry = vi.fn();
const userId = "user-1";

function buildServer(mocks: any) {
  const server = Fastify();
  server.decorate("authenticate", async (request: any) => {
    request.user = { sub: userId };
  });
  registerPosRoutes(server as any, mocks as any, recordTelemetry);
  return server;
}

describe("POS routes", () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
  });

  it("returns overview aggregates", async () => {
    const prisma = {
      posStore: { findMany: vi.fn().mockResolvedValue([{ id: "s1", name: "Main", channel: "In-store" }]) },
      posTicket: {
        findMany: vi.fn().mockResolvedValue([
          { id: "t1", userId, storeId: "s1", channel: "In-store", total: new Prisma.Decimal("50"), store: { name: "Main" } },
          { id: "t2", userId, storeId: "s1", channel: "Delivery", total: new Prisma.Decimal("30"), store: { name: "Main" } },
        ]),
      },
      posLineItem: {
        findMany: vi.fn().mockResolvedValue([
          { id: "l1", name: "Burger", quantity: 2, price: new Prisma.Decimal("10"), ticket: { userId } },
        ]),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "GET", url: "/pos/overview" });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.metrics.tickets).toBe(2);
    expect(body.orders.length).toBe(2);
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "pos.overview.fetch" }));
  });

  it("handles empty overview data", async () => {
    const prisma = {
      posStore: { findMany: vi.fn().mockResolvedValue([]) },
      posTicket: { findMany: vi.fn().mockResolvedValue([]) },
      posLineItem: { findMany: vi.fn().mockResolvedValue([]) },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "GET", url: "/pos/overview" });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.metrics.grossRevenue).toBe("0.00");
    expect(body.orders).toHaveLength(0);
    expect(body.topItems).toHaveLength(0);
  });

  it("creates a ticket with new store", async () => {
    const createdTicket = { id: "t1", itemsCount: 1, total: new Prisma.Decimal("10.00") };
    const prisma = {
      posStore: {
        findFirst: vi.fn().mockResolvedValue(null),
        upsert: vi.fn().mockResolvedValue({ id: "s1", name: "Main", channel: "In-store" }),
      },
      posTicket: {
        create: vi.fn().mockResolvedValue({ ...createdTicket, lineItems: [] }),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: "POST",
      url: "/pos/tickets",
      payload: { storeName: "Main", total: 10, items: [{ name: "Burger", price: 10, quantity: 1 }] },
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.posStore.upsert).toHaveBeenCalled();
    expect(prisma.posTicket.create).toHaveBeenCalled();
  });

  it("creates a ticket with existing store id", async () => {
    const prisma = {
      posStore: { findFirst: vi.fn().mockResolvedValue({ id: "s2", name: "Existing", channel: "Delivery" }) },
      posTicket: { create: vi.fn().mockResolvedValue({ id: "t2", itemsCount: 1, total: new Prisma.Decimal("5.00") }) },
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: "POST",
      url: "/pos/tickets",
      payload: { storeId: "s2", total: 5, items: [{ name: "Fries", price: 5, quantity: 1 }] },
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.posStore.findFirst).toHaveBeenCalled();
    expect(prisma.posTicket.create).toHaveBeenCalled();
  });

  it("creates a store", async () => {
    const prisma = {
      posStore: {
        create: vi.fn().mockResolvedValue({ id: "s1", name: "Popup", channel: "Delivery" }),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/pos/stores", payload: { name: "Popup", channel: "Delivery" } });
    expect(res.statusCode).toBe(200);
    expect(prisma.posStore.create).toHaveBeenCalled();
  });

  it("rejects ticket without total", async () => {
    const prisma = { posStore: { findFirst: vi.fn(), upsert: vi.fn() }, posTicket: { create: vi.fn() } };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/pos/tickets", payload: { storeName: "Main" } });
    expect(res.statusCode).toBe(400);
  });

  it("rejects ticket without store", async () => {
    const prisma = { posStore: { findFirst: vi.fn(), upsert: vi.fn() }, posTicket: { create: vi.fn() } };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/pos/tickets", payload: { total: 10 } });
    expect(res.statusCode).toBe(400);
  });
});
