export type UsdaDataset = 'esr'|'gats'|'psd';
export type UsdaReferenceKind =
    'region'|'country'|'commodity'|'unit'|'attribute';
export type JsonObject = {[key: string]: JsonValue};
export type JsonValue =
    string|number|boolean|null|JsonObject|JsonValue[];

export type UsdaCachePolicy = {
  maxAgeMinutes: number;
  staleWhileRevalidate?: boolean;
};

export interface UsdaProviderAdapter {
  fetch(request: {
    dataset: UsdaDataset;
    path: string;
    cache: UsdaCachePolicy;
  }): Promise<unknown>;
}

export interface WikidataProviderAdapter {
  search(query: string): Promise<{id: string}|null>;
  statements(
      itemId: string,
      properties: string[],
      ): Promise<Record<string, JsonValue>|null>;
}

export type ReferenceRecord = {
  code: string;
  wikidataId: string|null;
  enrichment: JsonValue|null;
};

export interface UsdaReferenceStoreAdapter {
  load(
      dataset: UsdaDataset,
      kind: UsdaReferenceKind,
      codes: string[],
      ): Promise<Map<string, ReferenceRecord>>;
  save(record: ReferenceRecord&{
    dataset: UsdaDataset;
    kind: UsdaReferenceKind;
    name: string;
    row: JsonObject;
  }): Promise<ReferenceRecord>;
  readCache(key: {
    dataset: UsdaDataset;
    kind: UsdaReferenceKind;
    sourceKey: string;
  }): Promise<{payload: JsonValue|null; wikidataId?: string|null}|null>;
  writeCache(
      key: {
        dataset: UsdaDataset;
        kind: UsdaReferenceKind;
        sourceKey: string;
      },
      value: {
        payload: JsonValue|null;
        wikidataId: string|null;
        status: 'success'|'error';
        fetchedAt: string;
      },
      ttlMs: number,
      ): Promise<void>;
}

export type UsdaLookupRequest = {
  dataset: UsdaDataset;
  resource: string;
  subresource?: string;
  detail?: string;
  query?: Record<string, string|number|boolean|undefined>;
};

export interface UsdaReferenceKit {
  lookup(request: UsdaLookupRequest): Promise<unknown>;
}

type UsdaReferenceKitAdapters = {
  usda: UsdaProviderAdapter;
  wikidata: WikidataProviderAdapter;
  references: UsdaReferenceStoreAdapter;
  telemetry?: {
    measure<T>(
        event: string,
        payload: Record<string, unknown>|undefined,
        operation: () => Promise<T>,
        ): Promise<T>;
  };
  logger?: {
    info(data: Record<string, unknown>, message: string): void;
    warn(data: Record<string, unknown>, message: string): void;
  };
};

type ReferenceConfig = {
  path: string;
  cache: UsdaCachePolicy;
  kind?: UsdaReferenceKind;
  allowFast?: boolean;
};

const DEFAULT_CACHE = {maxAgeMinutes: 60} as const;
const REFERENCE_CACHE = {
  maxAgeMinutes: 24 * 60,
  staleWhileRevalidate: true,
} as const;
const PSD_REFERENCE_CACHE = {
  maxAgeMinutes: 7 * 24 * 60,
  staleWhileRevalidate: true,
} as const;
const ENRICH_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const ENRICH_ERROR_CACHE_TTL_MS = 30 * 60 * 1000;

const referenceConfig: Record<
    UsdaDataset,
    Record<string, ReferenceConfig&{event: string}>
> = {
  esr: {
    regions: {
      path: '/api/esr/regions',
      cache: REFERENCE_CACHE,
      kind: 'region',
      allowFast: true,
      event: 'usda.esr.regions.fetch',
    },
    countries: {
      path: '/api/esr/countries', cache: REFERENCE_CACHE, kind: 'country',
      allowFast: true, event: 'usda.esr.countries.fetch',
    },
    commodities: {
      path: '/api/esr/commodities', cache: REFERENCE_CACHE, kind: 'commodity',
      allowFast: true, event: 'usda.esr.commodities.fetch',
    },
    units: {
      path: '/api/esr/unitsOfMeasure', cache: DEFAULT_CACHE,
      event: 'usda.esr.units.fetch',
    },
  },
  gats: {
    regions: {
      path: '/api/gats/regions', cache: DEFAULT_CACHE, kind: 'region',
      allowFast: true, event: 'usda.gats.regions.fetch',
    },
    countries: {
      path: '/api/gats/countries', cache: DEFAULT_CACHE, kind: 'country',
      allowFast: true, event: 'usda.gats.countries.fetch',
    },
    commodities: {
      path: '/api/gats/commodities', cache: DEFAULT_CACHE, kind: 'commodity',
      allowFast: true, event: 'usda.gats.commodities.fetch',
    },
    'hs6-commodities': {
      path: '/api/gats/HS6Commodities', cache: DEFAULT_CACHE,
      kind: 'commodity', allowFast: true, event: 'usda.gats.hs6.fetch',
    },
    units: {
      path: '/api/gats/unitsOfMeasure', cache: DEFAULT_CACHE,
      event: 'usda.gats.units.fetch',
    },
    'customs-districts': {
      path: '/api/gats/customsDistricts', cache: DEFAULT_CACHE,
      event: 'usda.gats.customsDistricts.fetch',
    },
  },
  psd: {
    regions: {
      path: '/api/psd/regions', cache: PSD_REFERENCE_CACHE, kind: 'region',
      event: 'usda.psd.regions.fetch',
    },
    countries: {
      path: '/api/psd/countries', cache: PSD_REFERENCE_CACHE, kind: 'country',
      allowFast: true, event: 'usda.psd.countries.fetch',
    },
    commodities: {
      path: '/api/psd/commodities', cache: PSD_REFERENCE_CACHE,
      kind: 'commodity', event: 'usda.psd.commodities.fetch',
    },
    units: {
      path: '/api/psd/unitsOfMeasure', cache: PSD_REFERENCE_CACHE, kind: 'unit',
      event: 'usda.psd.units.fetch',
    },
    'commodity-attributes': {
      path: '/api/psd/commodityAttributes', cache: PSD_REFERENCE_CACHE,
      kind: 'attribute', event: 'usda.psd.attributes.fetch',
    },
  },
};

const normalizeReference = (row: JsonObject) => ({
  code: row.code ?? row.regionCode ?? row.countryCode ?? row.commodityCode ??
      row.unitCode ?? row.attributeCode ?? row.Code ?? row.codeId ?? null,
  name: row.name ?? row.regionName ?? row.countryName ?? row.commodityName ??
      row.unitName ?? row.attributeName ?? row.description ?? row.Name ?? null,
});

const toInt = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim() &&
      Number.isFinite(Number(value))) return Number(value);
  return null;
};

const toStringParam = (value: unknown) => {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (typeof value === 'number') return String(value);
  return null;
};

export class UsdaReferenceValidationError extends Error {}

type ResolvedLookup = {
  path: string;
  cache: UsdaCachePolicy;
  event: string;
  telemetryPayload?: Record<string, unknown>;
  reference?: ReferenceConfig;
};

const invalid = (message: string): never => {
  throw new UsdaReferenceValidationError(message);
};

const resolveLookup = (request: UsdaLookupRequest): ResolvedLookup => {
  const reference = referenceConfig[request.dataset]?.[request.resource];
  if (reference) {
    const fast = Boolean(request.query?.fast);
    return {
      ...reference,
      reference,
      telemetryPayload: reference.allowFast ? {fast} : undefined,
    };
  }

  const query = request.query ?? {};
  const {dataset, resource, subresource, detail} = request;
  if (dataset === 'esr') {
    if (resource === 'data-release' && !subresource) {
      return {path: '/api/esr/datareleasedates', cache: DEFAULT_CACHE,
        event: 'usda.esr.dataRelease.fetch'};
    }
    if (resource === 'exports' && subresource === 'all-countries') {
      const commodity = toInt(query.commodityCode);
      const year = toInt(query.marketYear);
      if (commodity === null || year === null)
        invalid('commodityCode and marketYear are required numbers');
      return {
        path: `/api/esr/exports/commodityCode/${encodeURIComponent(String(commodity))}/allCountries/marketYear/${encodeURIComponent(String(year))}`,
        cache: DEFAULT_CACHE,
        event: 'usda.esr.exports.allCountries.fetch',
        telemetryPayload: {commodity, year},
      };
    }
    if (resource === 'exports' && subresource === 'by-country') {
      const commodity = toInt(query.commodityCode);
      const country = toInt(query.countryCode);
      const year = toInt(query.marketYear);
      if (commodity === null || country === null || year === null)
        invalid('commodityCode, countryCode, and marketYear are required numbers');
      return {
        path: `/api/esr/exports/commodityCode/${encodeURIComponent(String(commodity))}/countryCode/${encodeURIComponent(String(country))}/marketYear/${encodeURIComponent(String(year))}`,
        cache: DEFAULT_CACHE,
        event: 'usda.esr.exports.byCountry.fetch',
        telemetryPayload: {commodity, country, year},
      };
    }
  }

  if (dataset === 'gats') {
    if ((resource === 'census' || resource === 'un') &&
        detail === 'data-release' &&
        (subresource === 'exports' || subresource === 'imports')) {
      const census = resource === 'census';
      const direction = subresource === 'exports' ? 'exports' : 'imports';
      return {
        path: census ?
            `/api/gats/census/data/${direction}/dataReleaseDates` :
            `/api/gats/UNTrade/data/${direction}/dataReleaseDates`,
        cache: DEFAULT_CACHE,
        event: `usda.gats.${census ? 'census' : 'un'}.${direction}.release.fetch`,
      };
    }
    if ((resource === 'census' || resource === 'customs') && subresource) {
      const partner = toStringParam(query.partnerCode);
      const year = toInt(query.year);
      const month = toInt(query.month);
      if (!partner || year === null || month === null)
        invalid('partnerCode, year, and month are required');
      if (subresource !== 'imports' && subresource !== 'exports' &&
          subresource !== 'reexports') invalid('subresource is invalid');
      const type = subresource === 'imports' ? 'Imports' :
          subresource === 'exports' ? 'Exports' : 'ReExports';
      const prefix = resource === 'census' ? 'census' : 'customsDistrict';
      return {
        path: `/api/gats/${prefix}${type}/partnerCode/${encodeURIComponent(partner!)}/year/${encodeURIComponent(String(year))}/month/${encodeURIComponent(String(month))}`,
        cache: DEFAULT_CACHE,
        event: `usda.gats.${resource}.${subresource}.fetch`,
        telemetryPayload: {partner, y: year, m: month},
      };
    }
    if (resource === 'un' && subresource) {
      const reporter = toStringParam(query.reporterCode);
      const year = toStringParam(query.year);
      if (!reporter || !year) invalid('reporterCode and year are required');
      if (subresource !== 'imports' && subresource !== 'exports' &&
          subresource !== 'reexports') invalid('subresource is invalid');
      const type = subresource === 'imports' ? 'Imports' :
          subresource === 'exports' ? 'Exports' : 'ReExports';
      return {
        path: `/api/gats/UNTrade${type}/reporterCode/${encodeURIComponent(reporter!)}/year/${encodeURIComponent(year!)}`,
        cache: DEFAULT_CACHE,
        event: `usda.gats.un.${subresource}.fetch`,
        telemetryPayload: {reporter, y: year},
      };
    }
  }

  if (dataset === 'psd' && resource === 'commodity') {
    const commodity = toStringParam(query.commodityCode);
    if (subresource === 'data-release') {
      if (!commodity) invalid('commodityCode is required');
      return {
        path: `/api/psd/commodity/${encodeURIComponent(commodity!)}/dataReleaseDates`,
        cache: DEFAULT_CACHE,
        event: 'usda.psd.release.fetch',
        telemetryPayload: {commodity},
      };
    }
    const year = toInt(query.marketYear);
    if (subresource === 'all-countries' || subresource === 'world') {
      if (!commodity || year === null)
        invalid('commodityCode and marketYear are required');
      const suffix = subresource === 'all-countries' ?
          `country/all/year/${encodeURIComponent(String(year))}` :
          `world/year/${encodeURIComponent(String(year))}`;
      return {
        path: `/api/psd/commodity/${encodeURIComponent(commodity!)}/${suffix}`,
        cache: DEFAULT_CACHE,
        event: subresource === 'all-countries' ?
            'usda.psd.commodity.allCountries.fetch' :
            'usda.psd.commodity.world.fetch',
        telemetryPayload: {commodity, year},
      };
    }
    if (subresource === 'by-country') {
      const country = toStringParam(query.countryCode);
      if (!commodity || !country || year === null)
        invalid('commodityCode, countryCode, and marketYear are required');
      return {
        path: `/api/psd/commodity/${encodeURIComponent(commodity!)}/country/${encodeURIComponent(country!)}/year/${encodeURIComponent(String(year))}`,
        cache: DEFAULT_CACHE,
        event: 'usda.psd.commodity.country.fetch',
        telemetryPayload: {commodity, country, year},
      };
    }
  }

  return invalid('resource is invalid');
};

const propertyWhitelist: Record<UsdaReferenceKind, string[]> = {
  region: ['P17', 'P1082'],
  country: ['P17', 'P36', 'P1082'],
  commodity: ['P495', 'P279'],
  unit: ['P558', 'P1686'],
  attribute: ['P279', 'P31'],
};

const enrichReferences = async (
    adapters: UsdaReferenceKitAdapters,
    request: UsdaLookupRequest,
    config: ReferenceConfig,
    payload: unknown,
    ) => {
  if (!Array.isArray(payload) || !config.kind) return payload;
  const rows = payload as JsonObject[];
  const normalized = rows.map((row) => ({row, ...normalizeReference(row)}));
  const codes = normalized.map(({code}) => code === null ? null : String(code))
                    .filter((code): code is string => code !== null);
  const existing = await adapters.references.load(
      request.dataset, config.kind, codes);
  const meta = await adapters.references.readCache({
    dataset: request.dataset, kind: config.kind, sourceKey: '__meta__',
  });
  const skipEnrichment = Boolean(config.allowFast && request.query?.fast);
  if (meta || skipEnrichment) {
    const result = normalized.map(({row, code}) => {
      const record = code === null ? undefined : existing.get(String(code));
      return {...row, wikidataId: record?.wikidataId ?? null,
        enrichment: record?.enrichment ?? null};
    });
    adapters.logger?.info({kind: config.kind, dataset: request.dataset,
      total: rows.length,
      enriched: result.filter((entry) => entry.wikidataId).length,
      metaFresh: Boolean(meta), skipped: true}, 'usda enrichment');
    return result;
  }

  const result: JsonObject[] = [];
  for (const {row, code, name} of normalized) {
    if (code === null || name === null) {
      result.push(row);
      continue;
    }
    const stringCode = String(code);
    const stringName = String(name);
    let record = await adapters.references.save({
      dataset: request.dataset, kind: config.kind, code: stringCode,
      name: stringName, row, wikidataId: existing.get(stringCode)?.wikidataId ?? null,
      enrichment: existing.get(stringCode)?.enrichment ?? null,
    });
    const cacheKey = {
      dataset: request.dataset, kind: config.kind, sourceKey: stringCode,
    };
    const cached = await adapters.references.readCache(cacheKey);
    if (cached) {
      record = await adapters.references.save({
        dataset: request.dataset, kind: config.kind, code: stringCode,
        name: stringName, row,
        wikidataId: record.wikidataId ?? cached.wikidataId ?? null,
        enrichment: record.enrichment ?? cached.payload,
      });
    } else if (!record.wikidataId) {
      try {
        const hit = await adapters.wikidata.search(`${stringName} ${stringCode}`);
        if (hit) {
          const statements = await adapters.wikidata.statements(
              hit.id, propertyWhitelist[config.kind]);
          const enrichment: JsonObject = {
            hit: hit as unknown as JsonObject,
            ...(statements ? {statements} : {}),
          };
          record = await adapters.references.save({
            dataset: request.dataset, kind: config.kind, code: stringCode,
            name: stringName, row, wikidataId: hit.id, enrichment,
          });
          await adapters.references.writeCache(cacheKey, {
            payload: enrichment, wikidataId: hit.id, status: 'success',
            fetchedAt: new Date().toISOString(),
          }, ENRICH_CACHE_TTL_MS);
        }
      } catch (error) {
        adapters.logger?.warn(
            {error, kind: config.kind, code: stringCode, name: stringName},
            'wikidata enrichment failed');
        await adapters.references.writeCache(cacheKey, {
          payload: null, wikidataId: null, status: 'error',
          fetchedAt: new Date().toISOString(),
        }, ENRICH_ERROR_CACHE_TTL_MS);
      }
    }
    result.push({...row, wikidataId: record.wikidataId,
      enrichment: record.enrichment});
  }
  await adapters.references.writeCache({
    dataset: request.dataset, kind: config.kind, sourceKey: '__meta__',
  }, {payload: {total: rows.length}, wikidataId: null, status: 'success',
    fetchedAt: new Date().toISOString()}, ENRICH_CACHE_TTL_MS);
  adapters.logger?.info({kind: config.kind, dataset: request.dataset,
    total: rows.length,
    enriched: result.filter((entry) => entry.wikidataId).length},
  'usda enrichment');
  return result;
};

export function createUsdaReferenceKit(
    adapters: UsdaReferenceKitAdapters): UsdaReferenceKit {
  return {
    async lookup(request) {
      const resolved = resolveLookup(request);
      const operation = async () => {
        const payload = await adapters.usda.fetch({
          dataset: request.dataset,
          path: resolved.path,
          cache: resolved.cache,
        });
        return resolved.reference?.kind ?
            enrichReferences(adapters, request, resolved.reference, payload) :
            payload;
      };
      return adapters.telemetry ?
          adapters.telemetry.measure(
              resolved.event, resolved.telemetryPayload, operation) :
          operation();
    },
  };
}