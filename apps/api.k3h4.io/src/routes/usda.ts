import {Prisma, type PrismaClient} from '@prisma/client';
import {type FastifyInstance, type FastifyReply} from 'fastify';

import type {EntityKind} from '../lib/actor-entity-constants';
import {ACTOR_TYPES, ENTITY_KINDS} from '../lib/actor-entity-constants';
import {createTelemetryTimer} from '../lib/telemetry-timer';
import {readEnrichmentCache, writeEnrichmentCache} from '../services/enrichment-cache';
import {fetchAndCache} from '../services/usda-cache';
import {fetchWikidataWithCache} from '../services/wikidata-cache';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const DEFAULT_MAX_AGE_MINUTES = 60;
const REFERENCE_CACHE_MAX_AGE_MINUTES = 24 * 60;
const REFERENCE_CACHE_OPTIONS = {
  maxAgeMinutes: REFERENCE_CACHE_MAX_AGE_MINUTES,
  staleWhileRevalidate: true
} as const;
const PSD_REFERENCE_MAX_AGE_MINUTES = 7 * 24 * 60;
const ENRICH_CACHE_TTL_MINUTES = 7 * 24 * 60;
const ENRICH_ERROR_CACHE_TTL_MINUTES = 30;
const ENRICH_CACHE_TTL_MS = ENRICH_CACHE_TTL_MINUTES * 60 * 1000;
const ENRICH_ERROR_CACHE_TTL_MS = ENRICH_ERROR_CACHE_TTL_MINUTES * 60 * 1000;

const ActorType = ACTOR_TYPES;
const EntityKind = ENTITY_KINDS;

const cloneMetadata = (value?: Record<string, unknown>|null) => {
  if (value && typeof value === 'object' && !Array.isArray(value))
    return {...value};
  return {} as Record<string, unknown>;
};

const metadataRecord =
    (value: Prisma.JsonValue|null|undefined): Record<string, unknown> => {
      if (value && typeof value === 'object' && !Array.isArray(value))
        return value as Record<string, unknown>;
      return {} as Record<string, unknown>;
    };

const toJsonValue = (record: Record<string, unknown>) => {
  return Object.keys(record).length ? (record as Prisma.InputJsonValue) :
                                      Prisma.JsonNull;
};

const badRequest = (reply: FastifyReply, message: string) =>
    reply.status(400).send({error: message});

const toInt = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim().length > 0 &&
      Number.isFinite(Number(value)))
    return Number(value);
  return null;
};

const toStringParam = (value: unknown) => {
  if (typeof value === 'string' && value.trim().length > 0) return value.trim();
  if (typeof value === 'number') return String(value);
  return null;
};

export function registerUsdaRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  const auth = {preHandler: [server.authenticate]};
  const withApiTiming = (request: Parameters<RecordTelemetryFn>[0]) =>
      createTelemetryTimer(request, recordTelemetry, {source: 'api'});

  const datasetActorIds: Record<string, string> = {};
  const entityKindByLabel:
      Record<'region'|'country'|'commodity'|'unit'|'attribute', EntityKind> = {
        region: EntityKind.USDA_REGION,
        country: EntityKind.USDA_COUNTRY,
        commodity: EntityKind.USDA_COMMODITY,
        unit: EntityKind.USDA_UNIT,
        attribute: EntityKind.USDA_ATTRIBUTE,
      };

  const ensureDatasetActor = async (dataset: string) => {
    if (datasetActorIds[dataset]) return datasetActorIds[dataset];
    const label = `usda-${dataset}`;
    const existing = await prisma.actor.findFirst({
      where: {type: ActorType.USDA_FEED, source: 'usda', label},
    });
    if (existing) {
      datasetActorIds[dataset] = existing.id;
      return existing.id;
    }
    const created = await prisma.actor.create({
      data: {
        type: ActorType.USDA_FEED,
        label,
        source: 'usda',
        metadata: {dataset},
      },
    });
    datasetActorIds[dataset] = created.id;
    return created.id;
  };

  const buildTargetId = (dataset: string, code: string) => `${dataset}:${code}`;

  const enrichReference = async (
      kind: 'region'|'country'|'commodity'|'unit'|'attribute',
      dataset: 'esr'|'gats'|'psd',
      items: any,
      opts?: {skipEnrichment?: boolean},
      ) => {
    if (!Array.isArray(items)) return items;
    const actorId = await ensureDatasetActor(dataset);
    const entityKind = entityKindByLabel[kind];
    const normalize = (item: any) => {
      const code = item.code ?? item.regionCode ?? item.countryCode ??
          item.commodityCode ?? item.unitCode ?? item.attributeCode ??
          item.Code ?? item.codeId ?? null;
      const name = item.name ?? item.regionName ?? item.countryName ??
          item.commodityName ?? item.unitName ?? item.attributeName ??
          item.description ?? item.Name ?? null;
      return {
        code: code ? String(code) : null,
        name: name ? String(name) : null
      };
    };
    const normalizedItems =
        items.map((row: any) => ({row, normalized: normalize(row)}));
    const codes = normalizedItems.map(({normalized}) => normalized.code)
                      .filter(Boolean) as string[];
    const targetType = `usda:${kind}`;
    const targetIds = codes.map((code) => buildTargetId(dataset, code));
    const existingEntities = targetIds.length ? await prisma.entity.findMany({
      where: {
        actorId,
        kind: entityKind,
        targetType,
        targetId: {in : targetIds},
      },
    }) :
                                                [];
    const entityMap =
        new Map(existingEntities.map((entity) => [entity.targetId, entity]));
    const now = Date.now();
    const metaKey = {
      provider: 'wikidata',
      namespace: dataset,
      kind,
      sourceKey: '__meta__',
    } as const;
    const metaHit = await readEnrichmentCache(prisma, metaKey);
    const metaFresh = Boolean(metaHit);

    if (metaFresh || opts?.skipEnrichment) {
      const enriched = normalizedItems.map(({row, normalized}) => {
        const code = normalized.code;
        const targetId = code ? buildTargetId(dataset, code) : null;
        const metadata = targetId ?
            metadataRecord(entityMap.get(targetId)?.metadata) :
            ({}) as Record<string, unknown>;
        return {
          ...row,
          wikidataId: metadata.wikidataId ?? null,
          enrichment: metadata.enrichment ?? null,
        };
      });
      server.log.info(
          {
            kind,
            dataset,
            total: items.length,
            enriched: enriched.filter((entry) => entry.wikidataId).length,
            metaFresh: Boolean(metaFresh),
            skipped: true,
          },
          'usda enrichment',
      );
      return enriched;
    }

    const enriched: any[] = [];
    for (const {row, normalized} of normalizedItems) {
      const {code, name} = normalized;
      if (!code || !name) {
        enriched.push(row);
        continue;
      }

      const targetId = buildTargetId(dataset, code);
      const existing = entityMap.get(targetId);
      const existingMetadata = metadataRecord(existing?.metadata);
      const baseMetadata = {
        dataset,
        code,
        enrichment: existingMetadata.enrichment ?? null,
        wikidataId: existingMetadata.wikidataId ?? null,
        row,
      };
      const entityPayload = {
        actorId,
        kind: entityKind,
        name,
        targetType,
        targetId,
        source: dataset,
        metadata: toJsonValue(baseMetadata),
      };

      let entity = existing ?
          await prisma.entity.update(
              {where: {id: existing.id}, data: entityPayload}) :
          await prisma.entity.create({data: entityPayload});
      entityMap.set(targetId, entity);

      const cacheKey = {
        provider: 'wikidata',
        namespace: dataset,
        kind,
        sourceKey: code,
      } as const;
      const cacheHit = await readEnrichmentCache(prisma, cacheKey);

      if (cacheHit) {
        const currentMetadata = metadataRecord(entity.metadata);
        const updatedMetadata = {
          ...currentMetadata,
          enrichment:
              currentMetadata.enrichment ?? (cacheHit.payload as any) ?? null,
          wikidataId: currentMetadata.wikidataId ?? cacheHit.wikidataId ?? null,
          row,
        };
        entity = await prisma.entity.update({
          where: {id: entity.id},
          data: {metadata: toJsonValue(updatedMetadata)}
        });
        enriched.push({
          ...row,
          wikidataId: updatedMetadata.wikidataId ?? null,
          enrichment: updatedMetadata.enrichment ?? null,
        });
        continue;
      }

      const entityMetadata = metadataRecord(entity.metadata);
      if (!entityMetadata.wikidataId && name) {
        try {
          const query = code ? `${name} ${code}` : name;
          const search = await fetchWikidataWithCache(
              prisma, '/wikidata/search/items', {q: query, limit: 1}, {
                resource: 'usda-wikidata',
                maxAgeMinutes: 24 * 60,
              });
          const payload = search.payload as any;
          const hit = payload?.search?.[0] ?? payload?.items?.[0];
          if (hit?.id) {
            const propertyWhitelist: Record<typeof kind, string[]> = {
              region: ['P17', 'P1082'],
              country: ['P17', 'P36', 'P1082'],
              commodity: ['P495', 'P279'],
              unit: ['P558', 'P1686'],
              attribute: ['P279', 'P31'],
            } as const;

            let statements: any = null;
            const props = propertyWhitelist[kind];
            if (props && props.length > 0) {
              try {
                const stmt = await fetchWikidataWithCache(
                    prisma, `/wikidata/items/${hit.id}/statements`, undefined, {
                      resource: 'usda-wikidata-statements',
                      maxAgeMinutes: 24 * 60,
                    });
                const payloadStmt: any = stmt.payload;
                const filtered: Record<string, any> = {};
                props.forEach((p) => {
                  const val = payloadStmt?.statements?.[p] ?? payloadStmt?.[p];
                  if (val) filtered[p] = val;
                });
                statements = filtered;
              } catch (err) {
                server.log.warn(
                    {err, kind, code, name, hitId: hit.id},
                    'wikidata statements fetch failed');
              }
            }
            const enrichmentPayload = {
              hit,
              statements: statements ?? undefined
            };
            const updatedMetadata = {
              ...entityMetadata,
              enrichment: enrichmentPayload,
              wikidataId: hit.id as string,
              row,
            };
            entity = await prisma.entity.update({
              where: {id: entity.id},
              data: {metadata: toJsonValue(updatedMetadata)}
            });

            await writeEnrichmentCache(
                prisma, cacheKey, {
                  payload: enrichmentPayload,
                  wikidataId: hit.id,
                  status: 'success',
                  fetchedAt: new Date(now).toISOString(),
                  paramsHash: null,
                },
                ENRICH_CACHE_TTL_MS);
          }
        } catch (err) {
          server.log.warn(
              {err, kind, code, name}, 'wikidata enrichment failed');
          await writeEnrichmentCache(
              prisma, cacheKey, {
                payload: Prisma.JsonNull,
                wikidataId: null,
                status: 'error',
                fetchedAt: new Date(now).toISOString(),
              },
              ENRICH_ERROR_CACHE_TTL_MS);
        }
      }

      const finalMetadata = metadataRecord(entity.metadata);
      enriched.push({
        ...row,
        wikidataId: finalMetadata.wikidataId ?? null,
        enrichment: finalMetadata.enrichment ?? null,
      });
    }

    if (!metaFresh && !opts?.skipEnrichment) {
      await writeEnrichmentCache(
          prisma, metaKey, {
            payload: {total: items.length},
            wikidataId: null,
            status: 'success',
            fetchedAt: new Date(now).toISOString(),
          },
          ENRICH_CACHE_TTL_MS);
    }

    server.log.info(
        {
          kind,
          dataset,
          total: items.length,
          enriched: enriched.filter((entry) => entry.wikidataId).length,
        },
        'usda enrichment',
    );
    return enriched;
  };

  // ESR reference endpoints
  server.get('/usda/esr/regions', auth, async (request) => {
    const withTiming = withApiTiming(request);
    const fast = Boolean((request.query as any)?.fast);
    return withTiming('usda.esr.regions.fetch', {payload: {fast}}, async () => {
      const payload = await fetchAndCache(
          prisma, 'esr', '/api/esr/regions', undefined,
          REFERENCE_CACHE_OPTIONS);
      const enriched = await enrichReference(
          'region', 'esr', payload, {skipEnrichment: fast});
      return enriched;
    });
  });

  server.get('/usda/esr/countries', auth, async (request) => {
    const withTiming = withApiTiming(request);
    const fast = Boolean((request.query as any)?.fast);
    return withTiming(
        'usda.esr.countries.fetch', {payload: {fast}}, async () => {
          const payload = await fetchAndCache(
              prisma, 'esr', '/api/esr/countries', undefined,
              REFERENCE_CACHE_OPTIONS);
          const enriched = await enrichReference(
              'country', 'esr', payload, {skipEnrichment: fast});
          return enriched;
        });
  });

  server.get('/usda/esr/commodities', auth, async (request) => {
    const withTiming = withApiTiming(request);
    const fast = Boolean((request.query as any)?.fast);
    return withTiming(
        'usda.esr.commodities.fetch', {payload: {fast}}, async () => {
          const payload = await fetchAndCache(
              prisma, 'esr', '/api/esr/commodities', undefined,
              REFERENCE_CACHE_OPTIONS);
          const enriched = await enrichReference(
              'commodity', 'esr', payload, {skipEnrichment: fast});
          return enriched;
        });
  });

  server.get('/usda/esr/units', auth, async (request) => {
    const withTiming = withApiTiming(request);
    return withTiming(
        'usda.esr.units.fetch', {payload: undefined}, async () => {
          const payload = await fetchAndCache(
              prisma, 'esr', '/api/esr/unitsOfMeasure', undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        });
  });

  server.get('/usda/esr/data-release', auth, async (request) => {
    const withTiming = withApiTiming(request);
    return withTiming(
        'usda.esr.dataRelease.fetch', {payload: undefined}, async () => {
          const payload = await fetchAndCache(
              prisma, 'esr', '/api/esr/datareleasedates', undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        });
  });

  server.get(
      '/usda/esr/exports/all-countries', auth, async (request, reply) => {
        const withTiming = withApiTiming(request);
        const {commodityCode, marketYear} = request.query as {
          commodityCode?: string;
          marketYear?: string
        };
        const commodity = toInt(commodityCode);
        const year = toInt(marketYear);
        if (commodity === null || year === null)
          return badRequest(
              reply, 'commodityCode and marketYear are required numbers');
        const path = `/api/esr/exports/commodityCode/${
            encodeURIComponent(String(commodity))}/allCountries/marketYear/${
            encodeURIComponent(String(year))}`;
        return withTiming(
            'usda.esr.exports.allCountries.fetch',
            {payload: {commodity, year}},
            async () => {
              const payload = await fetchAndCache(
                  prisma, 'esr', path, undefined,
                  {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
              return payload;
            },
        );
      });

  server.get('/usda/esr/exports/by-country', auth, async (request, reply) => {
    const withTiming = withApiTiming(request);
    const {commodityCode, countryCode, marketYear} = request.query as {
      commodityCode?: string;
      countryCode?: string;
      marketYear?: string
    };
    const commodity = toInt(commodityCode);
    const country = toInt(countryCode);
    const year = toInt(marketYear);
    if (commodity === null || country === null || year === null)
      return badRequest(
          reply,
          'commodityCode, countryCode, and marketYear are required numbers');
    const path = `/api/esr/exports/commodityCode/${
        encodeURIComponent(String(commodity))}/countryCode/${
        encodeURIComponent(
            String(country))}/marketYear/${encodeURIComponent(String(year))}`;
    return withTiming(
        'usda.esr.exports.byCountry.fetch',
        {payload: {commodity, country, year}},
        async () => {
          const payload = await fetchAndCache(
              prisma, 'esr', path, undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        },
    );
  });

  // GATS release endpoints
  server.get(
      '/usda/gats/census/exports/data-release', auth, async (request) => {
        const withTiming = withApiTiming(request);
        return withTiming(
            'usda.gats.census.exports.release.fetch', {payload: undefined},
            async () => {
              const payload = await fetchAndCache(
                  prisma, 'gats',
                  '/api/gats/census/data/exports/dataReleaseDates', undefined,
                  {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
              return payload;
            });
      });

  server.get(
      '/usda/gats/census/imports/data-release', auth, async (request) => {
        const withTiming = withApiTiming(request);
        return withTiming(
            'usda.gats.census.imports.release.fetch', {payload: undefined},
            async () => {
              const payload = await fetchAndCache(
                  prisma, 'gats',
                  '/api/gats/census/data/imports/dataReleaseDates', undefined,
                  {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
              return payload;
            });
      });

  server.get('/usda/gats/un/exports/data-release', auth, async (request) => {
    const withTiming = withApiTiming(request);
    return withTiming(
        'usda.gats.un.exports.release.fetch', {payload: undefined},
        async () => {
          const payload = await fetchAndCache(
              prisma, 'gats', '/api/gats/UNTrade/data/exports/dataReleaseDates',
              undefined, {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        });
  });

  server.get('/usda/gats/un/imports/data-release', auth, async (request) => {
    const withTiming = withApiTiming(request);
    return withTiming(
        'usda.gats.un.imports.release.fetch', {payload: undefined},
        async () => {
          const payload = await fetchAndCache(
              prisma, 'gats', '/api/gats/UNTrade/data/imports/dataReleaseDates',
              undefined, {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        });
  });

  // GATS reference endpoints
  server.get('/usda/gats/regions', auth, async (request) => {
    const withTiming = withApiTiming(request);
    const fast = Boolean((request.query as any)?.fast);
    return withTiming(
        'usda.gats.regions.fetch', {payload: {fast}}, async () => {
          const payload = await fetchAndCache(
              prisma, 'gats', '/api/gats/regions', undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          const enriched = await enrichReference(
              'region', 'gats', payload, {skipEnrichment: fast});
          return enriched;
        });
  });

  server.get('/usda/gats/countries', auth, async (request) => {
    const withTiming = withApiTiming(request);
    const fast = Boolean((request.query as any)?.fast);
    return withTiming(
        'usda.gats.countries.fetch', {payload: {fast}}, async () => {
          const payload = await fetchAndCache(
              prisma, 'gats', '/api/gats/countries', undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          const enriched = await enrichReference(
              'country', 'gats', payload, {skipEnrichment: fast});
          return enriched;
        });
  });

  server.get('/usda/gats/commodities', auth, async (request) => {
    const withTiming = withApiTiming(request);
    const fast = Boolean((request.query as any)?.fast);
    return withTiming(
        'usda.gats.commodities.fetch', {payload: {fast}}, async () => {
          const payload = await fetchAndCache(
              prisma, 'gats', '/api/gats/commodities', undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          const enriched = await enrichReference(
              'commodity', 'gats', payload, {skipEnrichment: fast});
          return enriched;
        });
  });

  server.get('/usda/gats/hs6-commodities', auth, async (request) => {
    const withTiming = withApiTiming(request);
    const fast = Boolean((request.query as any)?.fast);
    return withTiming('usda.gats.hs6.fetch', {payload: {fast}}, async () => {
      const payload = await fetchAndCache(
          prisma, 'gats', '/api/gats/HS6Commodities', undefined,
          {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
      const enriched = await enrichReference(
          'commodity', 'gats', payload, {skipEnrichment: fast});
      return enriched;
    });
  });

  server.get('/usda/gats/units', auth, async (request) => {
    const withTiming = withApiTiming(request);
    return withTiming(
        'usda.gats.units.fetch', {payload: undefined}, async () => {
          const payload = await fetchAndCache(
              prisma, 'gats', '/api/gats/unitsOfMeasure', undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        });
  });

  server.get('/usda/gats/customs-districts', auth, async (request) => {
    const withTiming = withApiTiming(request);
    return withTiming(
        'usda.gats.customsDistricts.fetch', {payload: undefined}, async () => {
          const payload = await fetchAndCache(
              prisma, 'gats', '/api/gats/customsDistricts', undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        });
  });

  // GATS census flows
  server.get('/usda/gats/census/imports', auth, async (request, reply) => {
    const withTiming = withApiTiming(request);
    const {partnerCode, year, month} = request.query as {
      partnerCode?: string;
      year?: string;
      month?: string
    };
    const partner = toStringParam(partnerCode);
    const y = toInt(year);
    const m = toInt(month);
    if (!partner || y === null || m === null)
      return badRequest(reply, 'partnerCode, year, and month are required');
    const path = `/api/gats/censusImports/partnerCode/${
        encodeURIComponent(partner)}/year/${
        encodeURIComponent(String(y))}/month/${encodeURIComponent(String(m))}`;
    return withTiming(
        'usda.gats.census.imports.fetch',
        {payload: {partner, y, m}},
        async () => {
          const payload = await fetchAndCache(
              prisma, 'gats', path, undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        },
    );
  });

  server.get('/usda/gats/census/exports', auth, async (request, reply) => {
    const withTiming = withApiTiming(request);
    const {partnerCode, year, month} = request.query as {
      partnerCode?: string;
      year?: string;
      month?: string
    };
    const partner = toStringParam(partnerCode);
    const y = toInt(year);
    const m = toInt(month);
    if (!partner || y === null || m === null)
      return badRequest(reply, 'partnerCode, year, and month are required');
    const path = `/api/gats/censusExports/partnerCode/${
        encodeURIComponent(partner)}/year/${
        encodeURIComponent(String(y))}/month/${encodeURIComponent(String(m))}`;
    return withTiming(
        'usda.gats.census.exports.fetch',
        {payload: {partner, y, m}},
        async () => {
          const payload = await fetchAndCache(
              prisma, 'gats', path, undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        },
    );
  });

  server.get('/usda/gats/census/reexports', auth, async (request, reply) => {
    const withTiming = withApiTiming(request);
    const {partnerCode, year, month} = request.query as {
      partnerCode?: string;
      year?: string;
      month?: string
    };
    const partner = toStringParam(partnerCode);
    const y = toInt(year);
    const m = toInt(month);
    if (!partner || y === null || m === null)
      return badRequest(reply, 'partnerCode, year, and month are required');
    const path = `/api/gats/censusReExports/partnerCode/${
        encodeURIComponent(partner)}/year/${
        encodeURIComponent(String(y))}/month/${encodeURIComponent(String(m))}`;
    return withTiming(
        'usda.gats.census.reexports.fetch',
        {payload: {partner, y, m}},
        async () => {
          const payload = await fetchAndCache(
              prisma, 'gats', path, undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        },
    );
  });

  // GATS customs district flows
  server.get('/usda/gats/customs/imports', auth, async (request, reply) => {
    const withTiming = withApiTiming(request);
    const {partnerCode, year, month} = request.query as {
      partnerCode?: string;
      year?: string;
      month?: string
    };
    const partner = toStringParam(partnerCode);
    const y = toInt(year);
    const m = toInt(month);
    if (!partner || y === null || m === null)
      return badRequest(reply, 'partnerCode, year, and month are required');
    const path = `/api/gats/customsDistrictImports/partnerCode/${
        encodeURIComponent(partner)}/year/${
        encodeURIComponent(String(y))}/month/${encodeURIComponent(String(m))}`;
    return withTiming(
        'usda.gats.customs.imports.fetch',
        {payload: {partner, y, m}},
        async () => {
          const payload = await fetchAndCache(
              prisma, 'gats', path, undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        },
    );
  });

  server.get('/usda/gats/customs/exports', auth, async (request, reply) => {
    const withTiming = withApiTiming(request);
    const {partnerCode, year, month} = request.query as {
      partnerCode?: string;
      year?: string;
      month?: string
    };
    const partner = toStringParam(partnerCode);
    const y = toInt(year);
    const m = toInt(month);
    if (!partner || y === null || m === null)
      return badRequest(reply, 'partnerCode, year, and month are required');
    const path = `/api/gats/customsDistrictExports/partnerCode/${
        encodeURIComponent(partner)}/year/${
        encodeURIComponent(String(y))}/month/${encodeURIComponent(String(m))}`;
    return withTiming(
        'usda.gats.customs.exports.fetch',
        {payload: {partner, y, m}},
        async () => {
          const payload = await fetchAndCache(
              prisma, 'gats', path, undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        },
    );
  });

  server.get('/usda/gats/customs/reexports', auth, async (request, reply) => {
    const withTiming = withApiTiming(request);
    const {partnerCode, year, month} = request.query as {
      partnerCode?: string;
      year?: string;
      month?: string
    };
    const partner = toStringParam(partnerCode);
    const y = toInt(year);
    const m = toInt(month);
    if (!partner || y === null || m === null)
      return badRequest(reply, 'partnerCode, year, and month are required');
    const path = `/api/gats/customsDistrictReExports/partnerCode/${
        encodeURIComponent(partner)}/year/${
        encodeURIComponent(String(y))}/month/${encodeURIComponent(String(m))}`;
    return withTiming(
        'usda.gats.customs.reexports.fetch',
        {payload: {partner, y, m}},
        async () => {
          const payload = await fetchAndCache(
              prisma, 'gats', path, undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        },
    );
  });

  // GATS UN trade flows
  server.get('/usda/gats/un/imports', auth, async (request, reply) => {
    const withTiming = withApiTiming(request);
    const {reporterCode, year} = request.query as {
      reporterCode?: string;
      year?: string
    };
    const reporter = toStringParam(reporterCode);
    const y = toStringParam(year);
    if (!reporter || !y)
      return badRequest(reply, 'reporterCode and year are required');
    const path = `/api/gats/UNTradeImports/reporterCode/${
        encodeURIComponent(reporter)}/year/${encodeURIComponent(y)}`;
    return withTiming(
        'usda.gats.un.imports.fetch',
        {payload: {reporter, y}},
        async () => {
          const payload = await fetchAndCache(
              prisma, 'gats', path, undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        },
    );
  });

  server.get('/usda/gats/un/exports', auth, async (request, reply) => {
    const withTiming = withApiTiming(request);
    const {reporterCode, year} = request.query as {
      reporterCode?: string;
      year?: string
    };
    const reporter = toStringParam(reporterCode);
    const y = toStringParam(year);
    if (!reporter || !y)
      return badRequest(reply, 'reporterCode and year are required');
    const path = `/api/gats/UNTradeExports/reporterCode/${
        encodeURIComponent(reporter)}/year/${encodeURIComponent(y)}`;
    return withTiming(
        'usda.gats.un.exports.fetch',
        {payload: {reporter, y}},
        async () => {
          const payload = await fetchAndCache(
              prisma, 'gats', path, undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        },
    );
  });

  server.get('/usda/gats/un/reexports', auth, async (request, reply) => {
    const withTiming = withApiTiming(request);
    const {reporterCode, year} = request.query as {
      reporterCode?: string;
      year?: string
    };
    const reporter = toStringParam(reporterCode);
    const y = toStringParam(year);
    if (!reporter || !y)
      return badRequest(reply, 'reporterCode and year are required');
    const path = `/api/gats/UNTradeReExports/reporterCode/${
        encodeURIComponent(reporter)}/year/${encodeURIComponent(y)}`;
    return withTiming(
        'usda.gats.un.reexports.fetch',
        {payload: {reporter, y}},
        async () => {
          const payload = await fetchAndCache(
              prisma, 'gats', path, undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        },
    );
  });

  // PSD endpoints
  server.get(
      '/usda/psd/commodity/data-release', auth, async (request, reply) => {
        const withTiming = withApiTiming(request);
        const {commodityCode} = request.query as {commodityCode?: string};
        const commodity = toStringParam(commodityCode);
        if (!commodity) return badRequest(reply, 'commodityCode is required');
        const path = `/api/psd/commodity/${
            encodeURIComponent(commodity)}/dataReleaseDates`;
        return withTiming(
            'usda.psd.release.fetch',
            {payload: {commodity}},
            async () => {
              const payload = await fetchAndCache(
                  prisma, 'psd', path, undefined,
                  {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
              return payload;
            },
        );
      });

  server.get('/usda/psd/regions', auth, async (request) => {
    const withTiming = withApiTiming(request);
    return withTiming(
        'usda.psd.regions.fetch', {payload: undefined}, async () => {
          const payload = await fetchAndCache(
              prisma, 'psd', '/api/psd/regions', undefined, {
                maxAgeMinutes: PSD_REFERENCE_MAX_AGE_MINUTES,
                staleWhileRevalidate: true,
                logger: server.log,
              });
          const enriched = await enrichReference('region', 'psd', payload);
          return enriched;
        });
  });

  server.get('/usda/psd/countries', auth, async (request) => {
    const withTiming = withApiTiming(request);
    const fast = Boolean((request.query as any)?.fast);
    return withTiming(
        'usda.psd.countries.fetch', {payload: {fast}}, async () => {
          const payload = await fetchAndCache(
              prisma, 'psd', '/api/psd/countries', undefined, {
                maxAgeMinutes: PSD_REFERENCE_MAX_AGE_MINUTES,
                staleWhileRevalidate: true,
                logger: server.log,
              });
          const enriched = await enrichReference(
              'country', 'psd', payload, {skipEnrichment: fast});
          return enriched;
        });
  });

  server.get('/usda/psd/commodities', auth, async (request) => {
    const withTiming = withApiTiming(request);
    return withTiming(
        'usda.psd.commodities.fetch', {payload: undefined}, async () => {
          const payload = await fetchAndCache(
              prisma, 'psd', '/api/psd/commodities', undefined, {
                maxAgeMinutes: PSD_REFERENCE_MAX_AGE_MINUTES,
                staleWhileRevalidate: true,
                logger: server.log,
              });
          const enriched = await enrichReference('commodity', 'psd', payload);
          return enriched;
        });
  });

  server.get('/usda/psd/units', auth, async (request) => {
    const withTiming = withApiTiming(request);
    return withTiming(
        'usda.psd.units.fetch', {payload: undefined}, async () => {
          const payload = await fetchAndCache(
              prisma, 'psd', '/api/psd/unitsOfMeasure', undefined, {
                maxAgeMinutes: PSD_REFERENCE_MAX_AGE_MINUTES,
                staleWhileRevalidate: true,
                logger: server.log,
              });
          const enriched = await enrichReference('unit', 'psd', payload);
          return enriched;
        });
  });

  server.get('/usda/psd/commodity-attributes', auth, async (request) => {
    const withTiming = withApiTiming(request);
    return withTiming(
        'usda.psd.attributes.fetch', {payload: undefined}, async () => {
          const payload = await fetchAndCache(
              prisma, 'psd', '/api/psd/commodityAttributes', undefined, {
                maxAgeMinutes: PSD_REFERENCE_MAX_AGE_MINUTES,
                staleWhileRevalidate: true,
                logger: server.log,
              });
          const enriched = await enrichReference('attribute', 'psd', payload);
          return enriched;
        });
  });

  server.get(
      '/usda/psd/commodity/all-countries', auth, async (request, reply) => {
        const withTiming = withApiTiming(request);
        const {commodityCode, marketYear} = request.query as {
          commodityCode?: string;
          marketYear?: string
        };
        const commodity = toStringParam(commodityCode);
        const year = toInt(marketYear);
        if (!commodity || year === null)
          return badRequest(reply, 'commodityCode and marketYear are required');
        const path = `/api/psd/commodity/${
            encodeURIComponent(commodity)}/country/all/year/${
            encodeURIComponent(String(year))}`;
        return withTiming(
            'usda.psd.commodity.allCountries.fetch',
            {payload: {commodity, year}},
            async () => {
              const payload = await fetchAndCache(
                  prisma, 'psd', path, undefined,
                  {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
              return payload;
            },
        );
      });

  server.get('/usda/psd/commodity/by-country', auth, async (request, reply) => {
    const withTiming = withApiTiming(request);
    const {commodityCode, countryCode, marketYear} = request.query as {
      commodityCode?: string;
      countryCode?: string;
      marketYear?: string
    };
    const commodity = toStringParam(commodityCode);
    const country = toStringParam(countryCode);
    const year = toInt(marketYear);
    if (!commodity || !country || year === null)
      return badRequest(
          reply, 'commodityCode, countryCode, and marketYear are required');
    const path = `/api/psd/commodity/${encodeURIComponent(commodity)}/country/${
        encodeURIComponent(country)}/year/${encodeURIComponent(String(year))}`;
    return withTiming(
        'usda.psd.commodity.country.fetch',
        {payload: {commodity, country, year}},
        async () => {
          const payload = await fetchAndCache(
              prisma, 'psd', path, undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        },
    );
  });

  server.get('/usda/psd/commodity/world', auth, async (request, reply) => {
    const withTiming = withApiTiming(request);
    const {commodityCode, marketYear} = request.query as {
      commodityCode?: string;
      marketYear?: string
    };
    const commodity = toStringParam(commodityCode);
    const year = toInt(marketYear);
    if (!commodity || year === null)
      return badRequest(reply, 'commodityCode and marketYear are required');
    const path =
        `/api/psd/commodity/${encodeURIComponent(commodity)}/world/year/${
            encodeURIComponent(String(year))}`;
    return withTiming(
        'usda.psd.commodity.world.fetch',
        {payload: {commodity, year}},
        async () => {
          const payload = await fetchAndCache(
              prisma, 'psd', path, undefined,
              {maxAgeMinutes: DEFAULT_MAX_AGE_MINUTES});
          return payload;
        },
    );
  });
}
