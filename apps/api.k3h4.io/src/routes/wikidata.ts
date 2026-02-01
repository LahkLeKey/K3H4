import {type PrismaClient} from '@prisma/client';
import {type FastifyInstance, type FastifyReply} from 'fastify';
import * as z from 'zod';

import {AuthHeaderSchema, IntegerLikeSchema, StandardErrorResponses, toJsonSchema, withExamples} from '../lib/schemas/openapi';
import {fetchWikidataWithCache} from '../services/wikidata-cache';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const DEFAULT_ENTITY_MAX_AGE_MINUTES =
    360;  // Wikidata entities change, but we can reuse results for a few hours
const DEFAULT_SEARCH_MAX_AGE_MINUTES = 120;

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

const cleanParams = (query: Record<string, unknown>) => {
  const params: Record<string, string|number|boolean> = {};
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) continue;
    if (typeof value === 'boolean') {
      params[key] = value;
      continue;
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
      params[key] = value;
      continue;
    }
    if (typeof value === 'string' && value.trim().length > 0) {
      params[key] = value.trim();
    }
  }
  return params;
};

export function registerWikidataRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  const auth = {preHandler: [server.authenticate]};
  const authHeader = toJsonSchema(AuthHeaderSchema, 'AuthHeader');
  const baseEntityQuery = toJsonSchema(
      z.object({
         maxAgeMinutes: IntegerLikeSchema.optional(),
       }).passthrough(),
      'WikidataEntityQuery');

  const resolveEntityType = (value: string) => {
    if (value === 'items' || value === 'item') return 'items';
    if (value === 'properties' || value === 'property') return 'properties';
    return null;
  };

  const resolveSubresource = (value: string) => {
    if (value === 'statements') return 'statements';
    if (value === 'labels') return 'labels';
    if (value === 'sitelinks') return 'sitelinks';
    return null;
  };

  const fetchEntity = async (
      request: any,
      reply: FastifyReply,
      entityType: 'items'|'properties',
      id: string,
      subresource?: 'statements'|'labels'|'sitelinks',
      subId?: string,
      ) => {
    const {maxAgeMinutes, ...rawQuery} =
        request.query as Record<string, unknown>;
    const maxAge = toInt(maxAgeMinutes) ?? DEFAULT_ENTITY_MAX_AGE_MINUTES;
    const params = cleanParams(rawQuery);

    if (subresource && entityType !== 'items')
      return badRequest(reply, 'subresource only supported for items');

    if (subresource === 'statements' && subId)
      return badRequest(reply, 'statements does not support sub ids');

    if ((subresource === 'labels' || subresource === 'sitelinks') && subId &&
        subId.trim().length === 0)
      return badRequest(reply, 'subresource id is required');

    const encodedId = encodeURIComponent(id);
    const endpoint = subresource ?
        `/wikibase/v1/entities/items/${encodedId}/${subresource}${
            subId ? `/${encodeURIComponent(subId)}` : ''}` :
                    `/wikibase/v1/entities/${entityType}/${encodedId}`;

    const resourceKey = subresource ?
        `item-${subresource}${subId ? '-entry' : ''}` :
        entityType === 'items' ? 'item' :
                                 'property';

    const result = await fetchWikidataWithCache(prisma, endpoint, params, {
      resource: resourceKey,
      maxAgeMinutes: maxAge,
    });

    const eventType = subresource ?
        `wikidata.item.${subresource}${subId ? '.entry' : ''}.fetch` :
        entityType === 'items' ? 'wikidata.item.fetch' :
                                 'wikidata.property.fetch';

    await recordTelemetry(request, {
      ...buildTelemetryBase(request),
      eventType,
      source: 'api',
      payload: {
        id,
        subresource: subresource ?? null,
        subId: subId ?? null,
        cached: result.cached,
        status: result.status,
      },
    });

    return reply.status(result.status).send(result.payload);
  };

  server.get(
      '/wikidata/:entityType/:id', {
        ...auth,
        schema: {
          summary: 'Fetch Wikidata entity',
          description: 'Fetches Wikidata entities with cache control.',
          operationId: 'wikidata_entity_get',
          tags: ['wikidata'],
          headers: authHeader,
          security: [{bearerAuth: []}],
          params: toJsonSchema(
              z.object({
                 entityType: z.enum(['items', 'properties']),
                 id: z.string().min(1),
               }).strict(),
              'WikidataEntityParams'),
          querystring: baseEntityQuery,
          response: {
            200: withExamples(
                {
                  type: [
                    'object', 'array', 'string', 'number', 'boolean', 'null'
                  ],
                },
                [{id: 'Q42'}]),
            ...StandardErrorResponses,
          },
        },
      },
      async (request, reply) => {
        const {entityType, id} = request.params as {
          entityType?: string;
          id?: string
        };
        const resolved = entityType ? resolveEntityType(entityType) : null;
        if (!resolved)
          return badRequest(reply, 'entityType must be items or properties');
        if (!id) return badRequest(reply, 'id is required');
        return fetchEntity(request, reply, resolved, id);
      });

  server.get(
      '/wikidata/:entityType/:id/:subresource', {
        ...auth,
        schema:
            {
              summary: 'Fetch Wikidata subresource',
              description: 'Fetches Wikidata statements, labels, or sitelinks.',
              operationId: 'wikidata_entity_subresource_get',
              tags: ['wikidata'],
              headers: authHeader,
              security: [{bearerAuth: []}],
              params: toJsonSchema(
                  z.object({
                     entityType: z.enum(['items', 'properties']),
                     id: z.string().min(1),
                     subresource: z.enum(['statements', 'labels', 'sitelinks']),
                   }).strict(),
                  'WikidataSubresourceParams'),
              querystring: baseEntityQuery,
              response:
                  {
                    200:
                        withExamples(
                            {
                              type: [
                                'object', 'array', 'string',
                                'number', 'boolean', 'null'
                              ],
                            },
                            [{subresource: 'labels'}]),
                    ...StandardErrorResponses,
                  },
            },
      },
      async (request, reply) => {
        const {entityType, id, subresource} = request.params as {
          entityType?: string;
          id?: string;
          subresource?: string;
        };
        const resolved = entityType ? resolveEntityType(entityType) : null;
        if (!resolved)
          return badRequest(reply, 'entityType must be items or properties');
        if (!id) return badRequest(reply, 'id is required');
        const resolvedSub =
            subresource ? resolveSubresource(subresource) : null;
        if (!resolvedSub) return badRequest(reply, 'subresource is invalid');
        return fetchEntity(request, reply, resolved, id, resolvedSub);
      });

  server.get(
      '/wikidata/:entityType/:id/:subresource/:subId', {
        ...auth,
        schema:
            {
              summary: 'Fetch Wikidata subresource entry',
              description: 'Fetches a specific subresource entry.',
              operationId: 'wikidata_entity_subresource_entry_get',
              tags: ['wikidata'],
              headers: authHeader,
              security: [{bearerAuth: []}],
              params: toJsonSchema(
                  z.object({
                     entityType: z.enum(['items', 'properties']),
                     id: z.string().min(1),
                     subresource: z.enum(['statements', 'labels', 'sitelinks']),
                     subId: z.string().min(1),
                   }).strict(),
                  'WikidataSubresourceEntryParams'),
              querystring: baseEntityQuery,
              response:
                  {
                    200:
                        withExamples(
                            {
                              type: [
                                'object', 'array', 'string',
                                'number', 'boolean', 'null'
                              ],
                            },
                            [{subId: 'en'}]),
                    ...StandardErrorResponses,
                  },
            },
      },
      async (request, reply) => {
        const {entityType, id, subresource, subId} = request.params as {
          entityType?: string;
          id?: string;
          subresource?: string;
          subId?: string;
        };
        const resolved = entityType ? resolveEntityType(entityType) : null;
        if (!resolved)
          return badRequest(reply, 'entityType must be items or properties');
        if (!id) return badRequest(reply, 'id is required');
        const resolvedSub =
            subresource ? resolveSubresource(subresource) : null;
        if (!resolvedSub) return badRequest(reply, 'subresource is invalid');
        if (!subId) return badRequest(reply, 'subresource id is required');
        return fetchEntity(request, reply, resolved, id, resolvedSub, subId);
      });

  server.get(
      '/wikidata/search/:kind', {
        ...auth,
        schema: {
          summary: 'Search Wikidata',
          description: 'Searches Wikidata items or properties with caching.',
          operationId: 'wikidata_search',
          tags: ['wikidata'],
          headers: authHeader,
          security: [{bearerAuth: []}],
          params: toJsonSchema(
              z.object({
                 kind: z.enum(['items', 'properties']),
               }).strict(),
              'WikidataSearchParams'),
          querystring: toJsonSchema(
              z.object({
                 q: z.string().min(1),
                 language: z.string().min(1).optional(),
                 limit: IntegerLikeSchema.optional(),
                 continue: z.string().min(1).optional(),
                 maxAgeMinutes: IntegerLikeSchema.optional(),
               }).strict(),
              'WikidataSearchQuery'),
          response:
              {
                200:
                    withExamples(
                        {
                          type: [
                            'object', 'array', 'string', 'number', 'boolean',
                            'null'
                          ],
                        },
                        [{search: [{id: 'Q42', label: 'Douglas Adams'}]}]),
                ...StandardErrorResponses,
              },
        },
      },
      async (request, reply) => {
        const {kind} = request.params as {kind?: string};
        const {q, language, limit, continue: continuation, maxAgeMinutes} =
            request.query as {
          q?: string;
          language?: string;
          limit?: string;
          continue?: string;
          maxAgeMinutes?: string;
        };

        const query = toStringParam(q);
        if (!query) return badRequest(reply, 'q is required');
        if (kind !== 'items' && kind !== 'properties')
          return badRequest(reply, 'kind must be items or properties');

        const params = cleanParams({
          q: query,
          language,
          limit: toInt(limit) ?? undefined,
          continue: continuation
        });
        const maxAge = toInt(maxAgeMinutes) ?? DEFAULT_SEARCH_MAX_AGE_MINUTES;
        const endpoint = kind === 'items' ? '/wikibase/v0/search/items' :
                                            '/wikibase/v0/search/properties';
        const resource =
            kind === 'items' ? 'search-items' : 'search-properties';

        const result = await fetchWikidataWithCache(prisma, endpoint, params, {
          resource,
          maxAgeMinutes: maxAge,
        });

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: `wikidata.search.${kind}`,
          source: 'api',
          payload: {q: query, cached: result.cached, status: result.status},
        });

        return reply.status(result.status).send(result.payload);
      });
}
