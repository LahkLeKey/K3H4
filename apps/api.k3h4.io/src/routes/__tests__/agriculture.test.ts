import { describe, it, expect, vi, beforeEach } from "vitest";
import Fastify from "fastify";
import { registerAgricultureRoutes } from "../agriculture";

const recordTelemetry = vi.fn();
const userId = "user-1";

function buildServer(mocks: any) {
  const server = Fastify();
  server.decorate("authenticate", async (request: any) => {
    request.user = { sub: userId };
  });
  registerAgricultureRoutes(server as any, mocks as any, recordTelemetry);
  return server;
}

describe("Agriculture routes", () => {
  beforeEach(() => recordTelemetry.mockClear());

  it("returns overview", async () => {
    const prisma = {
      agriculturePlot: { findMany: vi.fn().mockResolvedValue([]) },
      agricultureTask: { findMany: vi.fn().mockResolvedValue([]) },
      agricultureShipment: { findMany: vi.fn().mockResolvedValue([]) },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "GET", url: "/agriculture/overview" });
    expect(res.statusCode).toBe(200);
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "agriculture.overview.fetch" }));
  });

  it("creates plot, task, and shipment", async () => {
    const prisma = {
      agriculturePlot: { create: vi.fn().mockResolvedValue({ id: "p1" }) },
      agricultureTask: { create: vi.fn().mockResolvedValue({ id: "t1" }) },
      agricultureShipment: { create: vi.fn().mockResolvedValue({ id: "s1" }) },
    };
    const server = buildServer(prisma);

    const plotRes = await server.inject({ method: "POST", url: "/agriculture/plots", payload: { name: "North", crop: "Corn", acres: 10 } });
    expect(plotRes.statusCode).toBe(200);

    const taskRes = await server.inject({ method: "POST", url: "/agriculture/tasks", payload: { title: "Irrigate", assignee: "Alex", dueDate: "2025-01-01", status: "done" } });
    expect(taskRes.statusCode).toBe(200);

    const shipRes = await server.inject({ method: "POST", url: "/agriculture/shipments", payload: { lot: "LOT1", destination: "CHI", mode: "Truck", eta: "2025-01-02", freightLoadId: "f1" } });
    expect(shipRes.statusCode).toBe(200);
  });
});
