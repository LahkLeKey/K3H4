import {PrismaClient} from '@prisma/client';
import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import * as z from 'zod';

import {ensureGeoActor} from '../actors/Geo/Geo';
import {OsrmService} from '../lib/openapi/route-kinds';
import {AuthHeaderSchema, makeParamsSchema, makeQuerySchema, makeResponses, withExamples} from '../lib/schemas/openapi';
import {fetchOsrmWithCache} from '../services/osrm-cache';

import {withTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const DEFAULT_MAX_AGE_MINUTES = 60 * 6;  // 6 hours

type OsrmQuery = {
  profile?: string;
  coordinates?: string;
  format?: string;
  maxAgeMinutes?: string | number;
  [key: string]: string | number | boolean | undefined;
};

const required = (reply: FastifyReply, message: string) =>
    reply.status(400).send({error: message});

const coerceNumber = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim().length > 0 &&
      Number.isFinite(Number(value)))
    return Number(value);
  return null;
};

const pickParams = (query: OsrmQuery) => {
  const {profile, coordinates, format, maxAgeMinutes, ...rest} = query;
  return rest;
};

const parseMaxAge = (query: OsrmQuery) =>
    coerceNumber(query.maxAgeMinutes ?? DEFAULT_MAX_AGE_MINUTES) ??
    DEFAULT_MAX_AGE_MINUTES;

const allowedServices =
    new Set(['route', 'table', 'match', 'trip', 'nearest', 'tile']);

export function registerOsrmRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  const auth = {preHandler: [server.authenticate]};

  const handler =
      async (service: string, request: FastifyRequest, reply: FastifyReply) => {
    if (!allowedServices.has(service))
      return required(reply, 'service is invalid');
    const query = request.query as OsrmQuery;
    const profile = query.profile?.trim();
    const coordinates = query.coordinates?.trim();
    if (!profile) return required(reply, 'profile is required');
    if (!coordinates) return required(reply, 'coordinates are required');

    const userId = (request.user as {sub?: string} | undefined)?.sub ?? null;
    let actorId: string|null = null;
    if (userId) {
      const actor = await ensureGeoActor(prisma, userId);
      actorId = actor.id;
    }
    const maxAgeMinutes = parseMaxAge(query);
    const params = pickParams(query);

    const {cached, response} = await fetchOsrmWithCache(
        prisma as any,
        {
          service: service as any,
          profile,
          coordinates,
          format: query.format === 'flatbuffers' ? 'flatbuffers' : 'json',
          params,
        },
        {maxAgeMinutes, actorId},
    );

    const rt = withTelemetryBase(recordTelemetry, request);
    await rt({
      eventType: `osrm.${service}.${cached ? 'cached' : 'fetched'}`,
      source: 'api',
      payload: {profile, coordinates, cached}
    });

    if (!response.ok)
      return reply.status(response.status).send(response.body ?? {
        error: 'OSRM error'
      });
    return response.body;
  };

  server.get(
      '/osrm/:service', {
        ...auth,
        schema:
            {
              summary: 'Proxy OSRM routing service',
              description: 'Proxies OSRM service requests with caching.',
              operationId: 'osrm_proxy',
              tags: ['osrm'],
              headers: makeParamsSchema(AuthHeaderSchema, 'AuthHeader'),
              security: [{bearerAuth: []}],
              params: makeParamsSchema(
                  z.object({
                     service: OsrmService.describe('OSRM service name'),
                   }).strict(),
                  'OsrmParams'),
              querystring: makeQuerySchema(
                  z.object({
                     profile: z.string().min(1).describe(
                         'Routing profile (e.g. driving)'),
                     coordinates: z.string().min(1).describe(
                         'Semicolon-separated lon,lat pairs'),
                     format: z.enum(['json', 'flatbuffers'])
                                 .optional()
                                 .describe('Response format'),
                     maxAgeMinutes: z.union([z.number(), z.string()])
                                        .optional()
                                        .describe('Cache TTL in minutes'),
                   }).passthrough(),
                  'OsrmQuery', [{
                    profile: 'driving',
                    coordinates: '-122.42,37.78;-122.45,37.91',
                    format: 'json',
                  }]),
              response:
                  makeResponses(
                      {
                        200:
                            withExamples(
                                {
                                  type: [
                                    'object', 'array', 'string',
                                    'number', 'boolean', 'null'
                                  ],
                                },
                                [{code: 'Ok'}]),
                      },
                      {includeStandardErrors: true}),
            },
      },
      async (request, reply) => {
        const {service} = request.params as {service?: string};
        return handler(service ?? '', request, reply);
      });
}