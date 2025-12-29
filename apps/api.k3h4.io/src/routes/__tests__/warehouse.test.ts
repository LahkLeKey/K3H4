import { describe, it, expect, vi, beforeEach } from "vitest";
import Fastify from "fastify";
import { registerWarehouseRoutes } from "../warehouse";

const recordTelemetry = vi.fn();
const userId = "user-1";

function buildServer(prisma: any) {
  const server = Fastify();
  server.decorate("authenticate", async (request: any) => {
    request.user = { sub: userId };
  });
  registerWarehouseRoutes(server as any, prisma as any, recordTelemetry);
  return server;
}

describe("warehouse routes", () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
  });

  it("lists items", async () => {
    const prisma = {
      warehouseItem: {
        findMany: vi.fn().mockResolvedValue([{ id: "w1", sku: "SKU", quantity: 5, location: "A", status: "stored", createdAt: new Date() }]),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "GET", url: "/warehouse/items" });
    expect(res.statusCode).toBe(200);
    expect(res.json().items[0].quantity).toBe(5);
  });

  it("creates an item linked to freight", async () => {
    const prisma = {
      freightLoad: { findFirst: vi.fn().mockResolvedValue({ id: "f1" }) },
      warehouseItem: {
        create: vi.fn().mockResolvedValue({ id: "w2", sku: "SKU2", quantity: 1, location: "B", status: "stored", createdAt: new Date() }),
        findMany: vi.fn(),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: "POST",
      url: "/warehouse/items",
      payload: { sku: "SKU2", location: "B", quantity: 1, freightLoadId: "f1" },
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.warehouseItem.create).toHaveBeenCalled();
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "warehouse.create" }));
  });

  it("rejects missing sku", async () => {
    const prisma = { freightLoad: { findFirst: vi.fn() }, warehouseItem: { create: vi.fn(), findFirst: vi.fn() } };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/warehouse/items", payload: { location: "A" } });
    expect(res.statusCode).toBe(400);
  });

  it("rejects missing location", async () => {
    const prisma = { freightLoad: { findFirst: vi.fn() }, warehouseItem: { create: vi.fn(), findFirst: vi.fn() } };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/warehouse/items", payload: { sku: "SKU" } });
    expect(res.statusCode).toBe(400);
  });

  it("rejects negative quantity on create", async () => {
    const prisma = { freightLoad: { findFirst: vi.fn() }, warehouseItem: { create: vi.fn(), findFirst: vi.fn() } };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/warehouse/items", payload: { sku: "SKU", location: "A", quantity: -5 } });
    expect(res.statusCode).toBe(400);
  });

  it("rejects unknown freight link", async () => {
    const prisma = {
      freightLoad: { findFirst: vi.fn().mockResolvedValue(null) },
      warehouseItem: { create: vi.fn(), findFirst: vi.fn() },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/warehouse/items", payload: { sku: "S", location: "A", freightLoadId: "missing" } });
    expect(res.statusCode).toBe(404);
  });

  it("rejects negative quantity on update", async () => {
    const prisma = {
      freightLoad: { findFirst: vi.fn() },
      warehouseItem: { findFirst: vi.fn().mockResolvedValue({ id: "w4", sku: "S", quantity: 1, location: "A", status: "stored", freightLoadId: null }) },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "PATCH", url: "/warehouse/items/w4", payload: { quantity: -1 } });
    expect(res.statusCode).toBe(400);
  });

  it("rejects linking to missing freight on update", async () => {
    const prisma = {
      freightLoad: { findFirst: vi.fn().mockResolvedValue(null) },
      warehouseItem: { findFirst: vi.fn().mockResolvedValue({ id: "w5", sku: "S", quantity: 1, location: "A", status: "stored", freightLoadId: null }) },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "PATCH", url: "/warehouse/items/w5", payload: { freightLoadId: "missing" } });
    expect(res.statusCode).toBe(404);
  });

  it("updates an item", async () => {
    const prisma = {
      freightLoad: { findFirst: vi.fn() },
      warehouseItem: {
        findFirst: vi.fn().mockResolvedValue({ id: "w3", sku: "SKU3", quantity: 2, location: "C", status: "stored", freightLoadId: null }),
        update: vi.fn().mockResolvedValue({ id: "w3", sku: "SKU3", quantity: 3, location: "C", status: "stored", freightLoadId: null }),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "PATCH", url: "/warehouse/items/w3", payload: { quantity: 3 } });
    expect(res.statusCode).toBe(200);
    expect(prisma.warehouseItem.update).toHaveBeenCalled();
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "warehouse.update" }));
  });
});
