import { describe, it, expect, vi, beforeEach } from "vitest";
import Fastify from "fastify";
import { registerPersonaRoutes } from "../persona";

const recordTelemetry = vi.fn();
const userId = "user-1";

function buildServer(prisma: any) {
  const server = Fastify();
  server.decorate("authenticate", async (request: any) => {
    request.user = { sub: userId };
  });
  registerPersonaRoutes(server as any, prisma as any, recordTelemetry);
  return server;
}

describe("persona routes", () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
  });

  it("seeds personas when empty", async () => {
    const personas = [{ id: "p1", alias: "A", account: "a@test.com", handle: "@a", note: null, tags: [], createdAt: new Date(), updatedAt: new Date() }];
    const findMany = vi.fn().mockResolvedValueOnce([]).mockResolvedValue(personas);
    const prisma = {
      persona: {
        findMany,
        createMany: vi.fn().mockResolvedValue({ count: 3 }),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "GET", url: "/personas" });
    expect(res.statusCode).toBe(200);
    expect(prisma.persona.createMany).toHaveBeenCalled();
    expect(res.json().personas).toHaveLength(1);
  });

  it("creates a persona", async () => {
    const prisma = {
      persona: {
        create: vi.fn().mockResolvedValue({ id: "p2", alias: "B", account: "b@test.com", handle: null, note: null, tags: [], createdAt: new Date(), updatedAt: new Date() }),
        findMany: vi.fn(),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/personas", payload: { alias: "B", account: "b@test.com", tags: ["vip"] } });
    expect(res.statusCode).toBe(200);
    expect(prisma.persona.create).toHaveBeenCalled();
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "persona.create" }));
  });

  it("generates personas", async () => {
    const prisma = {
      persona: {
        createMany: vi.fn().mockResolvedValue({ count: 2 }),
        findMany: vi.fn().mockResolvedValue([
          { id: "p3", alias: "C", account: "c@test.com", handle: "@c", note: null, tags: [], createdAt: new Date(), updatedAt: new Date() },
          { id: "p4", alias: "D", account: "d@test.com", handle: "@d", note: null, tags: [], createdAt: new Date(), updatedAt: new Date() },
        ]),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/personas/generate", payload: { count: 2 } });
    expect(res.statusCode).toBe(200);
    expect(prisma.persona.createMany).toHaveBeenCalled();
    expect(res.json().personas).toHaveLength(2);
  });

  it("clamps generated persona count", async () => {
    const prisma = {
      persona: {
        createMany: vi.fn().mockResolvedValue({ count: 10 }),
        findMany: vi.fn().mockResolvedValue(Array.from({ length: 10 }).map((_, idx) => ({
          id: `p${idx}`,
          alias: `Alias${idx}`,
          account: `a${idx}@test.com`,
          handle: `@a${idx}`,
          note: null,
          tags: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        }))),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/personas/generate", payload: { count: 50 } });
    expect(res.statusCode).toBe(200);
    expect(prisma.persona.createMany).toHaveBeenCalledWith(expect.objectContaining({ data: expect.any(Array) }));
    expect(res.json().personas).toHaveLength(10);
  });
});
