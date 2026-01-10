import { describe, it, expect, vi, beforeEach } from "vitest";
import Fastify from "fastify";
import { registerUsdaRoutes } from "../usda";
import * as cache from "../../services/usda-cache";

vi.mock("../../services/usda-cache", () => {
  return {
    fetchAndCache: vi.fn(),
  };
});

const recordTelemetry = vi.fn();
const userId = "user-1";

const buildServer = () => {
  const server = Fastify();
  server.decorate("authenticate", async (request: any) => {
    request.user = { sub: userId };
  });
  const prisma = {} as any;
  registerUsdaRoutes(server as any, prisma, recordTelemetry);
  return server;
};

const fetchAndCache = cache.fetchAndCache as unknown as ReturnType<typeof vi.fn>;

describe("usda routes", () => {
  beforeEach(() => {
    fetchAndCache.mockReset();
    fetchAndCache.mockResolvedValue({ ok: true });
    recordTelemetry.mockClear();
  });

  it("fetches ESR exports by country with required params", async () => {
    const server = buildServer();
    const res = await server.inject({ method: "GET", url: "/usda/esr/exports/by-country?commodityCode=104&countryCode=1220&marketYear=2017" });
    expect(res.statusCode).toBe(200);
    expect(fetchAndCache).toHaveBeenCalledWith(expect.anything(), "esr", "/api/esr/exports/commodityCode/104/countryCode/1220/marketYear/2017", undefined, expect.anything());
    expect(recordTelemetry).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ eventType: "usda.esr.exports.byCountry.fetch" }));
  });

  it("validates missing ESR params", async () => {
    const server = buildServer();
    const res = await server.inject({ method: "GET", url: "/usda/esr/exports/by-country" });
    expect(res.statusCode).toBe(400);
    expect(fetchAndCache).not.toHaveBeenCalled();
  });

  it("fetches GATS census imports", async () => {
    const server = buildServer();
    const res = await server.inject({ method: "GET", url: "/usda/gats/census/imports?partnerCode=CH&year=2010&month=1" });
    expect(res.statusCode).toBe(200);
    expect(fetchAndCache).toHaveBeenCalledWith(expect.anything(), "gats", "/api/gats/censusImports/partnerCode/CH/year/2010/month/1", undefined, expect.anything());
  });

  it("fetches PSD commodity world data", async () => {
    const server = buildServer();
    const res = await server.inject({ method: "GET", url: "/usda/psd/commodity/world?commodityCode=0440000&marketYear=2017" });
    expect(res.statusCode).toBe(200);
    expect(fetchAndCache).toHaveBeenCalledWith(expect.anything(), "psd", "/api/psd/commodity/0440000/world/year/2017", undefined, expect.anything());
  });
});
