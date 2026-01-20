import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchWikidataWithCache, readWikidataCache } from "../wikidata-cache";
import * as client from "../../lib/wikidata-client";

vi.mock("../../lib/wikidata-client", () => ({
  fetchWikidataJson: vi.fn(),
}));

const fetchWikidataJson = client.fetchWikidataJson as unknown as ReturnType<typeof vi.fn>;

const makePrisma = () => {
  const store: Record<string, any> = {};
  const prisma = {
    wikidataCacheEntry: {
      findUnique: vi.fn(async ({ where }: any) => store[JSON.stringify(where)] ?? null),
      upsert: vi.fn(async ({ where, create, update }: any) => {
        store[JSON.stringify(where)] = { ...create, ...update, fetchedAt: new Date(create?.fetchedAt ?? Date.now()) };
        return store[JSON.stringify(where)];
      }),
    },
  } as any;
  return { prisma, store };
};

describe("wikidata-cache", () => {
  beforeEach(() => {
    fetchWikidataJson.mockReset();
  });

  it("returns cached entry when fresh", async () => {
    const { prisma } = makePrisma();
    const key = { resource_endpoint_paramsHash: { resource: "item", endpoint: "/wikibase/v1/entities/items/Q42", paramsHash: "abc" } };
    (prisma.wikidataCacheEntry.findUnique as any).mockResolvedValue({
      ...key.resource_endpoint_paramsHash,
      statusCode: 200,
      payload: { cached: true },
      url: "https://example.test",
      fetchedAt: new Date(),
    });

    const result = await fetchWikidataWithCache(prisma as any, "/wikibase/v1/entities/items/Q42", undefined, {
      resource: "item",
      maxAgeMinutes: 60,
    });

    expect(result).toEqual({ cached: true, status: 200, payload: { cached: true }, url: "https://example.test" });
    expect(fetchWikidataJson).not.toHaveBeenCalled();
  });

  it("fetches and upserts when missing", async () => {
    const { prisma, store } = makePrisma();
    fetchWikidataJson.mockResolvedValue({
      status: 200,
      ok: true,
      payload: { name: "Ada" },
      url: "https://www.wikidata.org/w/rest.php/wikibase/v1/entities/items/Q7251",
      cacheControlSeconds: 300,
      etag: "W/\"abc\"",
    });

    const result = await fetchWikidataWithCache(prisma as any, "/wikibase/v1/entities/items/Q7251", { language: "en" }, {
      resource: "item",
      maxAgeMinutes: 10,
    });

    expect(result.cached).toBe(false);
    expect(prisma.wikidataCacheEntry.upsert).toHaveBeenCalled();
    const cachedEntry = Object.values(store)[0];
    expect(cachedEntry?.expiresAt).toBeInstanceOf(Date);
    expect(cachedEntry?.cacheControlSeconds).toBe(300);
  });

  it("readWikidataCache returns null when absent", async () => {
    const { prisma } = makePrisma();
    const result = await readWikidataCache(prisma as any, "/wikibase/v0/search/items", { q: "test" }, "search-items");
    expect(result).toBeNull();
  });
});
