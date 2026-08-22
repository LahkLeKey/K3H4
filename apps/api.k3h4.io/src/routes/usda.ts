import {Prisma, type PrismaClient} from '@prisma/client';
import {type FastifyInstance, type FastifyReply} from 'fastify';
import * as z from 'zod';

import {createUsdaReferenceKit, type JsonValue,
  type ReferenceRecord, type UsdaDataset, type UsdaReferenceKind,
  type UsdaReferenceStoreAdapter, UsdaReferenceValidationError,} from '../kits/usda-reference';
import type {EntityKind} from '../lib/actor-entity-constants';
import {ACTOR_TYPES, ENTITY_KINDS} from '../lib/actor-entity-constants';
import {UsdaDataset as UsdaDatasetSchema, UsdaDetail, UsdaResource,
  UsdaSubresource} from '../lib/openapi/route-kinds';
import {AuthHeaderSchema, IntegerLikeSchema, makeParamsSchema, makeQuerySchema,
  makeResponses, withExamples} from '../lib/schemas/openapi';
import {createTelemetryTimer} from '../lib/telemetry-timer';
import {readEnrichmentCache, writeEnrichmentCache} from '../services/enrichment-cache';
import {fetchAndCache} from '../services/usda-cache';
import {fetchWikidataWithCache} from '../services/wikidata-cache';

import {type RecordTelemetryFn} from './types';

const entityKindByLabel: Record<UsdaReferenceKind, EntityKind> = {
  region: ENTITY_KINDS.USDA_REGION,
  country: ENTITY_KINDS.USDA_COUNTRY,
  commodity: ENTITY_KINDS.USDA_COMMODITY,
  unit: ENTITY_KINDS.USDA_UNIT,
  attribute: ENTITY_KINDS.USDA_ATTRIBUTE,
};

const metadataRecord =
    (value: Prisma.JsonValue|null|undefined): Record<string, unknown> => {
      if (value && typeof value === 'object' && !Array.isArray(value))
        return value as Record<string, unknown>;
      return {};
    };

const toJsonValue = (record: Record<string, unknown>) =>
    Object.keys(record).length ? record as Prisma.InputJsonValue : Prisma.JsonNull;

const badRequest = (reply: FastifyReply, message: string) =>
    reply.status(400).send({error: message});

const createReferenceStore = (
    prisma: PrismaClient,
    ensureDatasetActor: (dataset: UsdaDataset) => Promise<string>,
    ): UsdaReferenceStoreAdapter => ({
  async load(dataset, kind, codes) {
    const actorId = await ensureDatasetActor(dataset);
    const entities = codes.length ? await prisma.entity.findMany({
      where: {
        actorId,
        kind: entityKindByLabel[kind],
        targetType: `usda:${kind}`,
        targetId: {in: codes.map((code) => `${dataset}:${code}`)},
      },
    }) : [];
    return new Map(entities.map((entity) => {
      const metadata = metadataRecord(entity.metadata);
      const code = String(metadata.code ?? entity.targetId?.split(':').at(-1) ?? '');
      return [code, {
        code,
        wikidataId: typeof metadata.wikidataId === 'string' ?
            metadata.wikidataId : null,
        enrichment: (metadata.enrichment ?? null) as JsonValue,
      } satisfies ReferenceRecord];
    }));
  },
  async save(record) {
    const actorId = await ensureDatasetActor(record.dataset);
    const targetType = `usda:${record.kind}`;
    const targetId = `${record.dataset}:${record.code}`;
    const data = {
      actorId,
      kind: entityKindByLabel[record.kind],
      name: record.name,
      targetType,
      targetId,
      source: record.dataset,
      metadata: toJsonValue({
        dataset: record.dataset,
        code: record.code,
        enrichment: record.enrichment,
        wikidataId: record.wikidataId,
        row: record.row,
      }),
    };
    const existing = await prisma.entity.findFirst({
      where: {actorId, kind: entityKindByLabel[record.kind], targetType, targetId},
    });
    if (existing)
      await prisma.entity.update({where: {id: existing.id}, data});
    else
      await prisma.entity.create({data});
    return {
      code: record.code,
      wikidataId: record.wikidataId,
      enrichment: record.enrichment,
    };
  },
  async readCache(key) {
    const hit = await readEnrichmentCache(prisma, {
      provider: 'wikidata', namespace: key.dataset,
      kind: key.kind, sourceKey: key.sourceKey,
    });
    return hit ? {
      payload: (hit.payload ?? null) as JsonValue,
      wikidataId: hit.wikidataId,
    } : null;
  },
  async writeCache(key, value, ttlMs) {
    await writeEnrichmentCache(prisma, {
      provider: 'wikidata', namespace: key.dataset,
      kind: key.kind, sourceKey: key.sourceKey,
    }, {
      payload: value.payload === null ? Prisma.JsonNull :
          value.payload as Prisma.JsonValue,
      wikidataId: value.wikidataId,
      status: value.status,
      fetchedAt: value.fetchedAt,
    }, ttlMs);
  },
});

export function registerUsdaRoutes(
    server: FastifyInstance,
    prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn,
    ) {
  const auth = {preHandler: [server.authenticate]};
  const datasetActorIds: Partial<Record<UsdaDataset, string>> = {};
  const ensureDatasetActor = async (dataset: UsdaDataset) => {
    const cached = datasetActorIds[dataset];
    if (cached) return cached;
    const label = `usda-${dataset}`;
    const existing = await prisma.actor.findFirst({
      where: {type: ACTOR_TYPES.USDA_FEED, source: 'usda', label},
    });
    const actor = existing ?? await prisma.actor.create({
      data: {
        type: ACTOR_TYPES.USDA_FEED,
        label,
        source: 'usda',
        metadata: {dataset},
      },
    });
    datasetActorIds[dataset] = actor.id;
    return actor.id;
  };
  const references = createReferenceStore(prisma, ensureDatasetActor);

  const usdaAuthHeader = makeParamsSchema(AuthHeaderSchema, 'AuthHeader');
  const usdaParamsSchema = makeParamsSchema(z.object({
    dataset: UsdaDatasetSchema.describe('USDA dataset'),
    resource: UsdaResource.describe('Dataset resource'),
  }).strict(), 'UsdaParams');
  const usdaSubresourceParamsSchema = makeParamsSchema(z.object({
    dataset: UsdaDatasetSchema.describe('USDA dataset'),
    resource: UsdaResource.describe('Dataset resource'),
    subresource: UsdaSubresource.describe('Subresource selector'),
  }).strict(), 'UsdaSubresourceParams');
  const usdaDetailParamsSchema = makeParamsSchema(z.object({
    dataset: UsdaDatasetSchema.describe('USDA dataset'),
    resource: UsdaResource.describe('Dataset resource'),
    subresource: UsdaSubresource.describe('Subresource selector'),
    detail: UsdaDetail.describe('Detail selector'),
  }).strict(), 'UsdaDetailParams');
  const usdaQuerySchema = makeQuerySchema(z.object({
    fast: z.boolean().optional().describe('Skip enrichment when supported'),
    commodityCode: z.union([IntegerLikeSchema, z.string().min(1)]).optional()
                       .describe('Commodity code (ESR/PSD)'),
    countryCode: z.union([IntegerLikeSchema, z.string().min(1)]).optional()
                     .describe('Country code (ESR)'),
    marketYear: IntegerLikeSchema.optional().describe('Market year'),
    partnerCode: z.string().min(1).optional().describe('Partner code'),
    reporterCode: z.string().min(1).optional().describe('Reporter code'),
    year: IntegerLikeSchema.optional().describe('Year'),
    month: IntegerLikeSchema.optional().describe('Month'),
  }).passthrough(), 'UsdaQuery');

  const handleUsdaRequest = async (request: any, reply: FastifyReply) => {
    const {dataset, resource, subresource, detail} = request.params as {
      dataset?: UsdaDataset;
      resource?: string;
      subresource?: string;
      detail?: string;
    };
    if (!dataset || !resource)
      return badRequest(reply, 'dataset and resource are required');

    const withTiming = createTelemetryTimer(
        request, recordTelemetry, {source: 'api'});
    const kit = createUsdaReferenceKit({
      usda: {
        fetch: ({dataset: source, path, cache}) => fetchAndCache(
            prisma, source, path, undefined, {...cache, logger: server.log}),
      },
      wikidata: {
        async search(query) {
          const response = await fetchWikidataWithCache(
              prisma, '/wikidata/search/items', {q: query, limit: 1},
              {resource: 'usda-wikidata', maxAgeMinutes: 24 * 60});
          const payload = response.payload as any;
          return payload?.search?.[0] ?? payload?.items?.[0] ?? null;
        },
        async statements(itemId, properties) {
          try {
            const response = await fetchWikidataWithCache(
                prisma, `/wikidata/items/${itemId}/statements`, undefined,
                {resource: 'usda-wikidata-statements', maxAgeMinutes: 24 * 60});
            const payload = response.payload as any;
            return Object.fromEntries(properties.flatMap((property) => {
              const value = payload?.statements?.[property] ?? payload?.[property];
              return value ? [[property, value as JsonValue]] : [];
            }));
          } catch (error) {
            server.log.warn(
                {error, itemId}, 'wikidata statements fetch failed');
            return null;
          }
        },
      },
      references,
      telemetry: {
        measure: (event, payload, operation) =>
            withTiming(event, {payload}, operation),
      },
      logger: {
        info: (data, message) => server.log.info(data, message),
        warn: (data, message) => server.log.warn(data, message),
      },
    });

    try {
      return await kit.lookup({
        dataset,
        resource,
        subresource,
        detail,
        query: request.query,
      });
    } catch (error) {
      if (error instanceof UsdaReferenceValidationError)
        return badRequest(reply, error.message);
      throw error;
    }
  };

  const response = makeResponses({
    200: withExamples({
      type: ['object', 'array', 'string', 'number', 'boolean', 'null'],
    }, [{data: 'USDA response'}]),
  }, {includeStandardErrors: true});

  server.get('/usda/:dataset/:resource', {
    ...auth,
    schema: {
      summary: 'Fetch USDA dataset resource',
      description: 'Fetches USDA dataset resources with caching and enrichment.',
      operationId: 'usda_resource_get', tags: ['usda'],
      headers: usdaAuthHeader, security: [{bearerAuth: []}],
      params: usdaParamsSchema, querystring: usdaQuerySchema, response,
    },
  }, handleUsdaRequest);
  server.get('/usda/:dataset/:resource/:subresource', {
    ...auth,
    schema: {
      summary: 'Fetch USDA dataset subresource',
      description: 'Fetches USDA dataset subresources with cache control.',
      operationId: 'usda_subresource_get', tags: ['usda'],
      headers: usdaAuthHeader, security: [{bearerAuth: []}],
      params: usdaSubresourceParamsSchema, querystring: usdaQuerySchema, response,
    },
  }, handleUsdaRequest);
  server.get('/usda/:dataset/:resource/:subresource/:detail', {
    ...auth,
    schema: {
      summary: 'Fetch USDA dataset detail',
      description: 'Fetches USDA dataset detail endpoints (e.g. data-release).',
      operationId: 'usda_detail_get', tags: ['usda'],
      headers: usdaAuthHeader, security: [{bearerAuth: []}],
      params: usdaDetailParamsSchema, querystring: usdaQuerySchema, response,
    },
  }, handleUsdaRequest);
}
