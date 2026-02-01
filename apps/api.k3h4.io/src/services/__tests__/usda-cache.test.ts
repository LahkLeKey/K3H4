import {beforeEach, describe, expect, it, vi} from 'vitest';

import * as client from '../../lib/usda-client';
import * as apiCache from '../api-cache';
import {fetchAndCache, readCache} from '../usda-cache';

vi.mock('../../lib/usda-client', () => ({
                                   fetchUsdaJson: vi.fn(),
                                 }));
vi.mock('../api-cache', () => ({
                          readApiCache: vi.fn(),
                          writeApiCache: vi.fn(),
                        }));

const fetchUsdaJson = client.fetchUsdaJson as ReturnType<typeof vi.fn>;
const readApiCache = apiCache.readApiCache as ReturnType<typeof vi.fn>;
const writeApiCache = apiCache.writeApiCache as ReturnType<typeof vi.fn>;

describe('usda-cache', () => {
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
    expect(writeApiCache).toHaveBeenCalled();
  });

  it('readCache returns null when absent', async () => {
    readApiCache.mockResolvedValue({payload: null, metadata: null});
    const result = await readCache({} as any, 'gats', '/api/gats/regions');
    expect(result).toBeNull();
  });
});
