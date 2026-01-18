import { describe, it, expect, vi, beforeEach } from "vitest";
import Fastify from "fastify";
import { registerOsrmRoutes } from "../osrm";
import * as cache from "../../services/osrm-cache";

vi.mock("../../services/osrm-cache", () => ({
  fetchOsrmWithCache: vi.fn(),
}));

const fetchOsrmWithCache = cache.fetchOsrmWithCache as unknown as ReturnType<typeof vi.fn>;
const recordTelemetry = vi.fn();
const userId = "user-1";

const buildServer = () => {
  const server = Fastify();
  server.decorate("authenticate", async (request: any) => {
    request.user = { sub: userId };
  });
  const prisma = {} as any;
  registerOsrmRoutes(server as any, prisma, recordTelemetry as any);
  return server;
};

describe("osrm routes", () => {
  beforeEach(() => {
    fetchOsrmWithCache.mockReset();
    fetchOsrmWithCache.mockResolvedValue({ cached: false, response: { ok: true, status: 200, body: { ok: true }, url: "http://osrm" } });
    recordTelemetry.mockClear();
  });

  it("proxies route requests with required params", async () => {
    const server = buildServer();
    const url = "/osrm/route?profile=driving&coordinates=13.1,52.1;13.2,52.2&overview=false";
    const res = await server.inject({ method: "GET", url });
    expect(res.statusCode).toBe(200);
    expect(fetchOsrmWithCache).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ service: "route", profile: "driving" }), expect.anything());
  });

  it("rejects missing coordinates", async () => {
    const server = buildServer();
    const res = await server.inject({ method: "GET", url: "/osrm/route?profile=driving" });
    expect(res.statusCode).toBe(400);
    expect(fetchOsrmWithCache).not.toHaveBeenCalled();
  });
});