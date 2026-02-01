import {beforeEach, describe, expect, it, vi} from 'vitest';

import * as client from '../../lib/wikidata-client';
import * as actorCache from '../actor-cache';
import {ensureCacheActorId} from '../cache-actor';
import {fetchWikidataWithCache, readWikidataCache} from '../wikidata-cache';

vi.mock('../../lib/wikidata-client', () => ({
                                       fetchWikidataJson: vi.fn(),
                                     }));
vi.mock('../actor-cache', () => ({
                            readActorCache: vi.fn(),
                            writeActorCache: vi.fn(),
                          }));
vi.mock('../cache-actor', () => ({
                            ensureCacheActorId: vi.fn(async () => 'actor-id'),
                          }));

const fetchWikidataJson =
    client.fetchWikidataJson as unknown as ReturnType<typeof vi.fn>;
const readActorCache = actorCache.readActorCache as ReturnType<typeof vi.fn>;
const writeActorCache = actorCache.writeActorCache as ReturnType<typeof vi.fn>;
const ensureCacheActorIdMock =
    ensureCacheActorId as unknown as ReturnType<typeof vi.fn>;

const prisma = {} as any;

describe('wikidata-cache', () => {
  beforeEach(() => {
    fetchWikidataJson.mockReset();
    readActorCache.mockReset();
    writeActorCache.mockReset();
    ensureCacheActorIdMock.mockResolvedValue('actor-id');
  });

  it('returns cached entry when fresh', async () => {
    const cachedEntry = {
      resource: 'item',
      endpoint: '/wikibase/v1/entities/items/Q42',
      paramsHash: 'abc',
      url: 'https://example.test',
      statusCode: 200,
      payload: {cached: true},
      fetchedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 10000).toISOString(),
    };
    readActorCache.mockResolvedValue(cachedEntry);

    const result =
        await fetchWikidataWithCache(prisma, cachedEntry.endpoint, undefined, {
          resource: 'item',
          maxAgeMinutes: 60,
        });

    expect(result).toEqual({
      cached: true,
      status: cachedEntry.statusCode,
      payload: cachedEntry.payload,
      url: cachedEntry.url,
    });
    expect(fetchWikidataJson).not.toHaveBeenCalled();
    expect(writeActorCache).not.toHaveBeenCalled();
  });

  it('fetches new data when cache miss', async () => {
    readActorCache.mockResolvedValue(null);
    fetchWikidataJson.mockResolvedValue({
      status: 200,
      ok: true,
      payload: {name: 'Ada'},
      url:
          'https://www.wikidata.org/w/rest.php/wikibase/v1/entities/items/Q7251',
      cacheControlSeconds: 300,
      etag: 'W/"abc"',
    });

    const result = await fetchWikidataWithCache(
        prisma, '/wikibase/v1/entities/items/Q7251', {language: 'en'}, {
          resource: 'item',
          maxAgeMinutes: 10,
        });

    expect(result.cached).toBe(false);
    expect(fetchWikidataJson).toHaveBeenCalled();
    expect(writeActorCache)
        .toHaveBeenCalledWith(
            prisma,
            'actor-id',
            expect.stringContaining(
                'wikidata:item:/wikibase/v1/entities/items/Q7251'),
            expect.objectContaining({
              endpoint: '/wikibase/v1/entities/items/Q7251',
              statusCode: 200,
              payload: {name: 'Ada'},
            }),
            expect.any(Number),
        );
  });

  it('readWikidataCache returns payload when entry exists', async () => {
    const cachedEntry = {payload: {hits: 1}};
    readActorCache.mockResolvedValue(cachedEntry);
    const result = await readWikidataCache(
        prisma, '/wikibase/v0/search/items', {q: 'test'}, 'search-items');
    expect(result).toEqual(cachedEntry.payload);
  });

  it('readWikidataCache returns null when missing', async () => {
    readActorCache.mockResolvedValue(null);
    const result = await readWikidataCache(
        prisma, '/wikibase/v0/search/items', {q: 'test'}, 'search-items');
    expect(result).toBeNull();
  });
});
