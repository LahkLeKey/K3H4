import '../../test/vitest-setup';

import {describe, expect, it, vi} from 'vitest';

import {createUsdaReferenceKit, type UsdaProviderAdapter,
  type WikidataProviderAdapter} from './index';

describe('USDA reference Kit', () => {
  it('looks up fast reference data with Kit-owned cache policy and no Wikidata request', async () => {
    const usda: UsdaProviderAdapter = {
      fetch: vi.fn().mockResolvedValue([{regionCode: 1, regionName: 'World'}]),
    };
    const wikidata: WikidataProviderAdapter = {
      search: vi.fn(),
      statements: vi.fn(),
    };
    const references = {
      load: vi.fn().mockResolvedValue(new Map()),
      save: vi.fn(),
      readCache: vi.fn().mockResolvedValue({payload: {total: 1}}),
      writeCache: vi.fn(),
    };
    const kit = createUsdaReferenceKit({usda, wikidata, references});

    await expect(kit.lookup({
      dataset: 'esr',
      resource: 'regions',
      query: {fast: true},
    })).resolves.toEqual([{
      regionCode: 1,
      regionName: 'World',
      wikidataId: null,
      enrichment: null,
    }]);
    expect(usda.fetch).toHaveBeenCalledWith({
      dataset: 'esr',
      path: '/api/esr/regions',
      cache: {maxAgeMinutes: 1440, staleWhileRevalidate: true},
    });
    expect(wikidata.search).not.toHaveBeenCalled();
  });

  it('looks up PSD world data with the existing provider path and telemetry', async () => {
    const usda: UsdaProviderAdapter = {
      fetch: vi.fn().mockResolvedValue({records: [{value: 42}]}),
    };
    const measure = vi.fn(async (_event, _payload, operation) => operation());
    const kit = createUsdaReferenceKit({
      usda,
      wikidata: {search: vi.fn(), statements: vi.fn()},
      references: {
        load: vi.fn(),
        save: vi.fn(),
        readCache: vi.fn(),
        writeCache: vi.fn(),
      },
      telemetry: {measure},
    });

    await expect(kit.lookup({
      dataset: 'psd',
      resource: 'commodity',
      subresource: 'world',
      query: {commodityCode: '440000', marketYear: 2017},
    })).resolves.toEqual({records: [{value: 42}]});
    expect(usda.fetch).toHaveBeenCalledWith({
      dataset: 'psd',
      path: '/api/psd/commodity/440000/world/year/2017',
      cache: {maxAgeMinutes: 60},
    });
    expect(measure).toHaveBeenCalledWith(
        'usda.psd.commodity.world.fetch',
        {commodity: '440000', year: 2017},
        expect.any(Function));
  });

  it('enriches reference rows through the Wikidata and reference-store adapters', async () => {
    const usda: UsdaProviderAdapter = {
      fetch: vi.fn().mockResolvedValue([{
        countryCode: 'US', countryName: 'United States',
      }]),
    };
    const wikidata: WikidataProviderAdapter = {
      search: vi.fn().mockResolvedValue({id: 'Q30'}),
      statements: vi.fn().mockResolvedValue({P36: ['Q61']}),
    };
    const save = vi.fn(async (record) => ({
      code: record.code,
      wikidataId: record.wikidataId,
      enrichment: record.enrichment,
    }));
    const references = {
      load: vi.fn().mockResolvedValue(new Map()),
      save,
      readCache: vi.fn().mockResolvedValue(null),
      writeCache: vi.fn(),
    };
    const kit = createUsdaReferenceKit({usda, wikidata, references});

    await expect(kit.lookup({
      dataset: 'psd',
      resource: 'countries',
    })).resolves.toEqual([{
      countryCode: 'US',
      countryName: 'United States',
      wikidataId: 'Q30',
      enrichment: {hit: {id: 'Q30'}, statements: {P36: ['Q61']}},
    }]);
    expect(wikidata.search).toHaveBeenCalledWith('United States US');
    expect(wikidata.statements).toHaveBeenCalledWith(
        'Q30', ['P17', 'P36', 'P1082']);
    expect(references.writeCache).toHaveBeenCalledWith(
        expect.objectContaining({sourceKey: '__meta__'}),
        expect.objectContaining({status: 'success'}),
        604800000);
  });
});