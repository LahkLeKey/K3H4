import { describe, it, expect, vi, beforeEach } from "vitest";
import Fastify from "fastify";
import { registerPersonaRoutes } from "../persona";
import { type RecordTelemetryFn } from "../types";

const recordTelemetry = vi.fn() as unknown as RecordTelemetryFn;
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
      personaAttribute: {
        createMany: vi.fn(),
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
      personaAttribute: {
        createMany: vi.fn(),
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
      personaAttribute: {
        createMany: vi.fn(),
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
      personaAttribute: {
        createMany: vi.fn(),
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/personas/generate", payload: { count: 50 } });
    expect(res.statusCode).toBe(200);
    expect(prisma.persona.createMany).toHaveBeenCalledWith(expect.objectContaining({ data: expect.any(Array) }));
    expect(res.json().personas).toHaveLength(10);
  });

  it("updates persona attributes", async () => {
    const persona = { id: "p-attr", alias: "Attr", account: "attr@test.com", handle: null, note: null, tags: [], userId, createdAt: new Date(), updatedAt: new Date() };
    const prisma = {
      persona: {
        findFirst: vi.fn().mockResolvedValue(persona),
        findUnique: vi.fn().mockResolvedValue({ ...persona, attributes: [{ id: "a1", category: "skill", value: "ops", weight: 1 }] }),
      },
      personaAttribute: {
        deleteMany: vi.fn().mockResolvedValue({ count: 1 }),
        createMany: vi.fn().mockResolvedValue({ count: 2 }),
      },
      personaCompatibility: { deleteMany: vi.fn(), createMany: vi.fn(), findMany: vi.fn() },
    };

    const server = buildServer(prisma);
    const res = await server.inject({ method: "PUT", url: "/personas/p-attr/attributes", payload: { attributes: [{ category: "skill", values: ["ops", "infra"] }] } });
    expect(res.statusCode).toBe(200);
    expect(prisma.personaAttribute.deleteMany).toHaveBeenCalled();
    expect(prisma.personaAttribute.createMany).toHaveBeenCalledWith(expect.objectContaining({ data: expect.any(Array) }));
    expect(res.json().persona.attributes).toHaveLength(1);
  });

  it("recomputes compatibility graph", async () => {
    const personas = [
      {
        id: "p1",
        userId,
        alias: "Alpha",
        account: "a@test.com",
        handle: null,
        note: null,
        tags: ["fintech", "payments"],
        attributes: [{ id: "a1", category: "stack", value: "node", weight: 1 }],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "p2",
        userId,
        alias: "Beta",
        account: "b@test.com",
        handle: null,
        note: null,
        tags: ["fintech", "logistics"],
        attributes: [{ id: "a2", category: "stack", value: "node", weight: 1 }],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const compatRecord = {
      id: "c1",
      userId,
      sourceId: "p1",
      targetId: "p2",
      jaccardScore: 0.25,
      intersectionCount: 2,
      unionCount: 8,
      overlappingTokens: ["fintech", "stack:node"],
      computedAt: new Date(),
      rationale: null,
      status: "active",
      source: personas[0],
      target: personas[1],
    };

    const prisma = {
      persona: {
        findMany: vi.fn().mockResolvedValue(personas),
      },
      personaCompatibility: {
        deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
        createMany: vi.fn().mockResolvedValue({ count: 1 }),
        findMany: vi.fn().mockResolvedValue([compatRecord]),
      },
    };

    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/personas/compatibility/recompute" });
    expect(res.statusCode).toBe(200);
    expect(prisma.personaCompatibility.createMany).toHaveBeenCalled();
    const body = res.json();
    expect(body.compatibilities[0].jaccardScore).toBeCloseTo(0.25);
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "persona.compatibility.recompute" }));
  });

  it("returns confusion matrix", async () => {
    const compat = {
      id: "c2",
      userId,
      sourceId: "p1",
      targetId: "p2",
      jaccardScore: 0.6,
      intersectionCount: 3,
      unionCount: 5,
      overlappingTokens: ["a", "b"],
      computedAt: new Date(),
      rationale: null,
      status: "active",
      source: { id: "p1", alias: "One", account: "one@test.com", handle: null, note: null, tags: [], createdAt: new Date(), updatedAt: new Date(), attributes: [] },
      target: { id: "p2", alias: "Two", account: "two@test.com", handle: null, note: null, tags: [], createdAt: new Date(), updatedAt: new Date(), attributes: [] },
    };

    const prisma = {
      personaCompatibility: {
        findMany: vi.fn().mockResolvedValue([compat]),
      },
    };

    const server = buildServer(prisma);
    const res = await server.inject({
      method: "POST",
      url: "/personas/compatibility/confusion",
      payload: { pairs: [{ sourceId: "p1", targetId: "p2", label: true }], threshold: 0.4 },
    });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.counts.tp).toBe(1);
    expect(body.metrics.recall).toBeCloseTo(1);
  });
});
