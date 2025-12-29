import { describe, it, expect, vi, beforeEach } from "vitest";
import Fastify from "fastify";
import { Prisma } from "@prisma/client";
import { registerCulinaryRoutes } from "../culinary";

const recordTelemetry = vi.fn();
const userId = "user-1";

function buildServer(mocks: any) {
  const server = Fastify();
  server.decorate("authenticate", async (request: any) => {
    request.user = { sub: userId };
  });
  registerCulinaryRoutes(server as any, mocks as any, recordTelemetry);
  return server;
}

describe("Culinary routes", () => {
  beforeEach(() => recordTelemetry.mockClear());

  it("returns overview", async () => {
    const prisma = {
      culinaryMenuItem: { findMany: vi.fn().mockResolvedValue([]) },
      culinaryPrepTask: { findMany: vi.fn().mockResolvedValue([]) },
      culinarySupplierNeed: { findMany: vi.fn().mockResolvedValue([]) },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "GET", url: "/culinary/overview" });
    expect(res.statusCode).toBe(200);
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "culinary.overview.fetch" }));
  });

  it("creates menu item, prep task, and supplier need", async () => {
    const prisma = {
      culinaryMenuItem: { create: vi.fn().mockResolvedValue({ id: "m1" }) },
      culinaryPrepTask: { create: vi.fn().mockResolvedValue({ id: "p1", station: "Garde" }) },
      culinarySupplierNeed: { create: vi.fn().mockResolvedValue({ id: "s1", status: "open" }) },
    };
    const server = buildServer(prisma);

    const menuRes = await server.inject({ method: "POST", url: "/culinary/menu-items", payload: { name: "Bowl", prepMinutes: 10, cost: 4.5, price: 12 } });
    expect(menuRes.statusCode).toBe(200);

    const prepRes = await server.inject({ method: "POST", url: "/culinary/prep-tasks", payload: { task: "Chop", station: "Garde", dueAt: "2025-01-01", status: "done" } });
    expect(prepRes.statusCode).toBe(200);

    const supplierRes = await server.inject({ method: "POST", url: "/culinary/supplier-needs", payload: { item: "Greens", quantity: "3", dueDate: "2025-01-02", status: "closed" } });
    expect(supplierRes.statusCode).toBe(200);
  });
});
