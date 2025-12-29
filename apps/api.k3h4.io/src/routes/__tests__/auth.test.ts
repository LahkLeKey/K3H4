import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import Fastify from "fastify";
import { registerAuthRoutes } from "../auth";

const recordTelemetry = vi.fn();
const userId = "user-1";

function buildServer(prisma: any) {
  const server = Fastify();
  server.decorate("authenticate", async (request: any) => {
    request.user = { sub: userId, email: "user@test.com" };
  });
  server.jwt = { sign: vi.fn(() => "access-token"), verify: vi.fn() } as any;
  registerAuthRoutes(server as any, prisma as any, recordTelemetry);
  return server;
}

describe("auth routes", () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
    process.env.GITHUB_CLIENT_ID = "gh-id";
    process.env.GITHUB_CLIENT_SECRET = "gh-secret";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns authorize url for github", async () => {
    const prisma = {};
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/auth/github/url", payload: { redirectUri: "https://app/cb" } });
    expect(res.statusCode).toBe(200);
    expect(res.json().authorizeUrl).toContain("client_id=gh-id");
  });

  it("rejects github url without redirect", async () => {
    const prisma = {};
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/auth/github/url", payload: {} });
    expect(res.statusCode).toBe(400);
  });

  it("handles github callback and issues tokens", async () => {
    const fetchMock = vi.fn((url: RequestInfo | URL) => {
      const href = String(url);
      if (href.includes("access_token")) {
        return Promise.resolve({ ok: true, json: async () => ({ access_token: "gh-token" }) } as Response);
      }
      if (href.includes("api.github.com/user")) {
        return Promise.resolve({ ok: true, json: async () => ({ id: 42, login: "ghuser", email: "user@test.com" }) } as Response);
      }
      return Promise.resolve({ ok: false, json: async () => ({}) } as Response);
    });
    vi.stubGlobal("fetch", fetchMock);

    const prisma = {
      refreshToken: { create: vi.fn().mockResolvedValue({}) },
      user: { upsert: vi.fn().mockResolvedValue({ id: userId, email: "user@test.com" }) },
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: "POST",
      url: "/auth/github/callback",
      payload: { code: "abc", redirectUri: "https://app/cb" },
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.user.upsert).toHaveBeenCalled();
    expect(prisma.refreshToken.create).toHaveBeenCalled();
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "auth.github.callback.success" }));
  });

  it("fetches primary email when user email missing", async () => {
    const fetchMock = vi.fn((url: RequestInfo | URL) => {
      const href = String(url);
      if (href.includes("access_token")) return Promise.resolve({ ok: true, json: async () => ({ access_token: "gh-token" }) } as Response);
      if (href.endsWith("/user")) return Promise.resolve({ ok: true, json: async () => ({ id: 99, login: "nouser" }) } as Response);
      if (href.endsWith("/user/emails")) {
        return Promise.resolve({ ok: true, json: async () => ([{ email: "primary@test.com", primary: true, verified: true }]) } as Response);
      }
      return Promise.resolve({ ok: false, json: async () => ({}) } as Response);
    });
    vi.stubGlobal("fetch", fetchMock);

    const prisma = {
      refreshToken: { create: vi.fn().mockResolvedValue({}) },
      user: { upsert: vi.fn().mockResolvedValue({ id: userId, email: "primary@test.com" }) },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/auth/github/callback", payload: { code: "abc", redirectUri: "https://app/cb" } });
    expect(res.statusCode).toBe(200);
    expect(prisma.user.upsert).toHaveBeenCalledWith(expect.objectContaining({ create: expect.objectContaining({ email: "primary@test.com" }) }));
  });

  it("handles stale verification code", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: "bad_verification_code" }) } as Response);
    vi.stubGlobal("fetch", fetchMock);
    const prisma = { refreshToken: { create: vi.fn() }, user: { upsert: vi.fn() } };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/auth/github/callback", payload: { code: "bad", redirectUri: "https://app/cb" } });
    expect(res.statusCode).toBe(401);
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "auth.github.callback.failed" }));
    expect(res.json().staleCode).toBe(true);
  });

  it("fails when github config missing", async () => {
    process.env.GITHUB_CLIENT_ID = "";
    const server = buildServer({});
    const res = await server.inject({ method: "POST", url: "/auth/github/callback", payload: { code: "abc", redirectUri: "https://app/cb" } });
    expect(res.statusCode).toBe(500);
  });

  it("handles linkedin missing config", async () => {
    process.env.LINKEDIN_CLIENT_ID = "";
    process.env.LINKEDIN_CLIENT_SECRET = "";
    const server = buildServer({});
    const res = await server.inject({ method: "POST", url: "/auth/linkedin/callback", payload: { code: "c", redirectUri: "https://app/cb" } });
    expect(res.statusCode).toBe(500);
  });

  it("rejects linkedin callback when code or redirect missing", async () => {
    process.env.LINKEDIN_CLIENT_ID = "ln-id";
    process.env.LINKEDIN_CLIENT_SECRET = "ln-secret";
    const server = buildServer({});
    const res = await server.inject({ method: "POST", url: "/auth/linkedin/callback", payload: { code: "" } });
    expect(res.statusCode).toBe(400);
  });

  it("handles github profile fetch failure", async () => {
    const fetchMock = vi.fn((url: RequestInfo | URL) => {
      const href = String(url);
      if (href.includes("access_token")) return Promise.resolve({ ok: true, json: async () => ({ access_token: "tok" }) } as Response);
      return Promise.resolve({ ok: false, status: 500, json: async () => ({ message: "boom" }) } as Response);
    });
    vi.stubGlobal("fetch", fetchMock);
    const server = buildServer({ user: { upsert: vi.fn() }, refreshToken: { create: vi.fn() } });
    const res = await server.inject({ method: "POST", url: "/auth/github/callback", payload: { code: "abc", redirectUri: "https://app/cb" } });
    expect(res.statusCode).toBe(401);
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "auth.github.callback.failed" }));
  });

  it("fails when github email fetch returns non-200", async () => {
    const fetchMock = vi.fn((url: RequestInfo | URL) => {
      const href = String(url);
      if (href.includes("access_token")) return Promise.resolve({ ok: true, json: async () => ({ access_token: "tok" }) } as Response);
      if (href.endsWith("/user")) return Promise.resolve({ ok: true, json: async () => ({ id: 77, login: "no-email" }) } as Response);
      return Promise.resolve({ ok: false, status: 401, json: async () => ({ message: "denied" }) } as Response);
    });
    vi.stubGlobal("fetch", fetchMock);
    const server = buildServer({ user: { upsert: vi.fn() }, refreshToken: { create: vi.fn() } });
    const res = await server.inject({ method: "POST", url: "/auth/github/callback", payload: { code: "abc", redirectUri: "https://app/cb" } });
    expect(res.statusCode).toBe(401);
  });

  it("throws when github email still missing", async () => {
    const fetchMock = vi.fn((url: RequestInfo | URL) => {
      const href = String(url);
      if (href.includes("access_token")) return Promise.resolve({ ok: true, json: async () => ({ access_token: "tok" }) } as Response);
      if (href.endsWith("/user")) return Promise.resolve({ ok: true, json: async () => ({ id: 88, login: "no-email" }) } as Response);
      if (href.endsWith("/user/emails")) return Promise.resolve({ ok: true, json: async () => ([] as any[]) } as Response);
      return Promise.resolve({ ok: false, json: async () => ({}) } as Response);
    });
    vi.stubGlobal("fetch", fetchMock);
    const server = buildServer({ user: { upsert: vi.fn() }, refreshToken: { create: vi.fn() } });
    const res = await server.inject({ method: "POST", url: "/auth/github/callback", payload: { code: "abc", redirectUri: "https://app/cb" } });
    expect(res.statusCode).toBe(401);
  });

  it("logs when email fetch throws and returns unauthorized", async () => {
    const fetchMock = vi.fn((url: RequestInfo | URL) => {
      const href = String(url);
      if (href.includes("access_token")) return Promise.resolve({ ok: true, json: async () => ({ access_token: "tok" }) } as Response);
      if (href.endsWith("/user")) return Promise.resolve({ ok: true, json: async () => ({ id: 123, login: "erruser" }) } as Response);
      if (href.endsWith("/user/emails")) return Promise.reject(new Error("network"));
      return Promise.resolve({ ok: false, json: async () => ({}) } as Response);
    });
    vi.stubGlobal("fetch", fetchMock);
    const server = buildServer({ user: { upsert: vi.fn() }, refreshToken: { create: vi.fn() } });
    const res = await server.inject({ method: "POST", url: "/auth/github/callback", payload: { code: "abc", redirectUri: "https://app/cb" } });
    expect(res.statusCode).toBe(401);
  });

  it("handles callback exceptions", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("network"));
    vi.stubGlobal("fetch", fetchMock);
    const server = buildServer({ user: { upsert: vi.fn() }, refreshToken: { create: vi.fn() } });
    const res = await server.inject({ method: "POST", url: "/auth/github/callback", payload: { code: "abc", redirectUri: "https://app/cb" } });
    expect(res.statusCode).toBe(500);
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "auth.github.callback.error" }));
  });

  it("handles linkedin success", async () => {
    const fetchMock = vi.fn((url: RequestInfo | URL) => {
      const href = String(url);
      if (href.includes("accessToken")) return Promise.resolve({ ok: true, json: async () => ({ access_token: "ln-token" }) } as Response);
      return Promise.resolve({ ok: true, json: async () => ({ sub: "ln-1", name: "L", email: "l@test.com" }) } as Response);
    });
    vi.stubGlobal("fetch", fetchMock);
    process.env.LINKEDIN_CLIENT_ID = "ln-id";
    process.env.LINKEDIN_CLIENT_SECRET = "ln-secret";
    const prisma = {
      refreshToken: { create: vi.fn().mockResolvedValue({}) },
      user: { upsert: vi.fn().mockResolvedValue({ id: "ln-1", email: "l@test.com" }) },
    };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "POST", url: "/auth/linkedin/callback", payload: { code: "c", redirectUri: "https://app/cb" } });
    expect(res.statusCode).toBe(200);
    expect(prisma.user.upsert).toHaveBeenCalled();
  });

  it("handles linkedin token failure", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: "bad" }) } as Response);
    vi.stubGlobal("fetch", fetchMock);
    process.env.LINKEDIN_CLIENT_ID = "ln-id";
    process.env.LINKEDIN_CLIENT_SECRET = "ln-secret";
    const server = buildServer({ user: { upsert: vi.fn() }, refreshToken: { create: vi.fn() } });
    const res = await server.inject({ method: "POST", url: "/auth/linkedin/callback", payload: { code: "c", redirectUri: "https://app/cb" } });
    expect(res.statusCode).toBe(401);
  });

  it("handles linkedin profile fetch failure", async () => {
    const fetchMock = vi.fn((url: RequestInfo | URL) => {
      const href = String(url);
      if (href.includes("accessToken")) return Promise.resolve({ ok: true, json: async () => ({ access_token: "ln-token" }) } as Response);
      return Promise.resolve({ ok: false, json: async () => ({}) } as Response);
    });
    vi.stubGlobal("fetch", fetchMock);
    process.env.LINKEDIN_CLIENT_ID = "ln-id";
    process.env.LINKEDIN_CLIENT_SECRET = "ln-secret";
    const server = buildServer({ user: { upsert: vi.fn() }, refreshToken: { create: vi.fn() } });
    const res = await server.inject({ method: "POST", url: "/auth/linkedin/callback", payload: { code: "c", redirectUri: "https://app/cb" } });
    expect(res.statusCode).toBe(401);
  });

  it("returns current user", async () => {
    const prisma = { user: { findUnique: vi.fn().mockResolvedValue({ id: userId, email: "user@test.com" }) } };
    const server = buildServer(prisma);
    const res = await server.inject({ method: "GET", url: "/auth/me" });
    expect(res.statusCode).toBe(200);
    expect(res.json().user.email).toBe("user@test.com");
  });
});
