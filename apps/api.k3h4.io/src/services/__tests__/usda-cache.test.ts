import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchAndCache, readCache } from "../usda-cache";
import * as client from "../../lib/usda-client";

vi.mock("../../lib/usda-client", () => ({
  fetchUsdaJson: vi.fn(),
}));

const fetchUsdaJson = client.fetchUsdaJson as unknown as ReturnType<typeof vi.fn>;

const makePrisma = () => {
  const store: Record<string, any> = {};
  return {
    usdaCacheEntry: {
      findUnique: vi.fn(async ({ where }: any) => store[JSON.stringify(where)] ?? null),
      upsert: vi.fn(async ({ where, create, update }: any) => {
        store[JSON.stringify(where)] = { ...create, ...update, fetchedAt: new Date(create?.fetchedAt ?? Date.now()) };
        return store[JSON.stringify(where)];
      }),
    },
  } as any;
};

describe("usda-cache", () => {
  beforeEach(() => {
    fetchUsdaJson.mockReset();
  });

  it("returns cached entry when fresh", async () => {
    const prisma = makePrisma();
    const key = { dataset: "esr", endpoint: "/api/esr/regions", paramsHash: "abc" };
    const now = new Date();
    (prisma.usdaCacheEntry.findUnique as any).mockResolvedValue({ ...key, payload: { cached: true }, fetchedAt: now });

    const result = await fetchAndCache(prisma as any, "esr", "/api/esr/regions", undefined, { maxAgeMinutes: 60 });
    expect(result).toEqual({ cached: true });
    expect(fetchUsdaJson).not.toHaveBeenCalled();
  });

  it("fetches and upserts when missing", async () => {
    const prisma = makePrisma();
    fetchUsdaJson.mockResolvedValue({ regions: [1] });

    const result = await fetchAndCache(prisma as any, "esr", "/api/esr/regions");
    expect(result).toEqual({ regions: [1] });
    expect(prisma.usdaCacheEntry.upsert).toHaveBeenCalled();
  });

  it("readCache returns null when absent", async () => {
    const prisma = makePrisma();
    const result = await readCache(prisma as any, "gats", "/api/gats/regions");
    expect(result).toBeNull();
  });
});
