import {beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';

vi.mock('../../lib/usda-client', () => ({
                                   fetchUsdaJson: vi.fn(),
                                 }));
vi.mock('../api-cache', () => ({
                          readApiCache: vi.fn(),
                          writeApiCache: vi.fn(),
                        }));

let fetchAndCache: typeof import('../usda-cache').fetchAndCache;
let readCache: typeof import('../usda-cache').readCache;
let fetchUsdaJson: ReturnType<typeof vi.fn>;
let readApiCache: ReturnType<typeof vi.fn>;
let writeApiCache: ReturnType<typeof vi.fn>;

describe('usda-cache', () => {
  beforeAll(async () => {
    ({fetchAndCache, readCache} = await import('../usda-cache'));
    const client = await import('../../lib/usda-client');
    const apiCache = await import('../api-cache');
    fetchUsdaJson = client.fetchUsdaJson as ReturnType<typeof vi.fn>;
    readApiCache = apiCache.readApiCache as ReturnType<typeof vi.fn>;
    writeApiCache = apiCache.writeApiCache as ReturnType<typeof vi.fn>;
  });

  beforeEach(() => {
    fetchUsdaJson.mockReset();
    readApiCache.mockReset();
    writeApiCache.mockReset();
  });

  it('returns cached entry when fresh', async () => {
    const cachedPayload = {ok: true};
    const now = Date.now();
    readApiCache.mockResolvedValue({
      payload: cachedPayload,
      metadata: {
        fetchedAt: new Date(now - 1000).toISOString(),
        expiresAt: new Date(now + 5 * 60 * 1000).toISOString(),
      },
    });

    const result = await fetchAndCache(
        {} as any, 'esr', '/api/esr/regions', undefined, {maxAgeMinutes: 60});
    expect(result).toEqual(cachedPayload);
    expect(fetchUsdaJson).not.toHaveBeenCalled();
    expect(writeApiCache).not.toHaveBeenCalled();
  });

  it('fetches and upserts when missing', async () => {
    const payload = {ok: true};
    fetchUsdaJson.mockResolvedValue(payload);
    readApiCache.mockResolvedValue({payload: null, metadata: null});

    const result = await fetchAndCache({} as any, 'esr', '/api/esr/regions');
    expect(result).toEqual(payload);
  });

  it('readCache returns null when absent', async () => {
    readApiCache.mockResolvedValue({payload: null, metadata: null});
    const result = await readCache({} as any, 'gats', '/api/gats/regions');
    expect(result).toBeNull();
  });
});
