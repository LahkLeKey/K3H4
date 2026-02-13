import {PrismaClient} from '@prisma/client';
import {type FastifyInstance, type FastifyReply, type FastifyRequest, type RouteShorthandOptions} from 'fastify';
import * as z from 'zod';

import {ensureGeoActor, ensureGeoGlobalActor} from '../actors/Geo/Geo';
import {ENTITY_KINDS} from '../lib/actor-entity-constants';
import {MaptilerKind} from '../lib/openapi/route-kinds';
import {makeParamsSchema, makeQuerySchema, makeResponses, OptionalAuthHeaderSchema, withExamples} from '../lib/schemas/openapi';
import {fetchMaptilerWithCache} from '../services/maptiler-cache';
import {readUserPreferencesByActor, updateUserPreferencesByActor, type UserPreferencePatch} from '../services/user-preferences';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const DEFAULT_MAX_AGE_MINUTES = 60 * 6;  // 6 hours
const MAPTILER_RATE_LIMIT_MAX =
    Number(process.env.MAPTILER_RATE_LIMIT_MAX ?? 60);
const MAPTILER_RATE_LIMIT_WINDOW =
    process.env.MAPTILER_RATE_LIMIT_WINDOW || '1 minute';
const allowedRoots = new Set([
  'geocoding',
  'search',
  'maps',
  'tiles',
  'vector-tiles',
  'data',
  'styles',
  'fonts',
  'elevation',
  'weather',
  'matrix',
  'geolocation',
  'place',
  'static',
]);

const badRequest = (reply: FastifyReply, message: string) =>
    reply.status(400).send({error: message});

const coerceNumber = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim().length > 0 &&
      Number.isFinite(Number(value)))
    return Number(value);
  return null;
};

const normalizePath = (rawPath: string) => {
  const trimmed = rawPath.trim();
  if (trimmed.length === 0) throw new Error('path is required');
  if (trimmed.includes('://'))
    throw new Error('path must be relative (no protocol)');
  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  const first = path.split('/').filter(Boolean)[0];
  if (!first || !allowedRoots.has(first))
    throw new Error('path root is not allowed');
  return path;
};

const pickParams = (query: Record<string, any>) => {
  const {path, maxAgeMinutes, responseType, ...rest} = query;
  return rest;
};

const parseMaxAge = (query: Record<string, any>) =>
    coerceNumber(query.maxAgeMinutes ?? DEFAULT_MAX_AGE_MINUTES) ??
    DEFAULT_MAX_AGE_MINUTES;

const TILE_ENTITY_KIND = ENTITY_KINDS.MAPTILER_TILE;
const TILE_ENTITY_TARGET_TYPE = 'maptiler:tile';

const normalizeTilePath = (value: string) => value.trim().toLowerCase();

const shouldTrackTileEntity = (path: string, contentType?: string) => {
  const normalized = normalizeTilePath(path);
  if (normalized.endsWith('.png')) return true;
  return Boolean(
      contentType && contentType.toLowerCase().includes('image/png'));
};

export function registerMaptilerRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  // Map views should work even for anonymous users; we only verify JWT if
  // present.
  type RateLimitedRouteShorthandOptions = RouteShorthandOptions&{
    rateLimit?: {max: number; timeWindow: string};
  };

  const cloneParamsForMetadata = (params: Record<string, unknown>) => {
    const copied: Record<string, unknown> = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) copied[key] = value;
    });
    return copied;
  };

  let globalGeoActorId: string|null = null;
  const resolveGlobalActorId = async () => {
    if (globalGeoActorId) return globalGeoActorId;
    const actor = await ensureGeoGlobalActor(prisma);
    globalGeoActorId = actor.id;
    return globalGeoActorId;
  };

  const persistTileEntity = async (options: {
    path: string; params: Record<string, unknown>;
    response: {data?: Buffer; contentType?: string; cacheControl?: string};
    signature: string;
    cached: boolean;
  }) => {
    const {path, params, response, signature, cached} = options;
    if (!response.data) return;
    if (!shouldTrackTileEntity(path, response.contentType)) return;
    const actorId = await resolveGlobalActorId();
    const buffer = Buffer.from(response.data);
    if (!buffer || buffer.byteLength === 0) return;

    const metadata = {
      path,
      params: cloneParamsForMetadata(params),
      contentType: response.contentType ?? null,
      cacheControl: response.cacheControl ?? null,
      fetchedAt: new Date().toISOString(),
      cached,
      sizeBytes: buffer.byteLength,
      tileBase64: buffer.toString('base64'),
    };

    const existing = await prisma.entity.findFirst({
      where: {
        actorId,
        targetType: TILE_ENTITY_TARGET_TYPE,
        targetId: signature,
      },
    });

    const entityData = {
      actorId,
      kind: TILE_ENTITY_KIND,
      name: path,
      source: 'maptiler',
      targetType: TILE_ENTITY_TARGET_TYPE,
      targetId: signature,
      metadata,
      isGlobal: true,
    };

    if (existing) {
      await prisma.entity.update({where: {id: existing.id}, data: entityData});
      return;
    }
    await prisma.entity.create({data: entityData});
  };

  const optionalAuth = {
    preHandler: [async (request: FastifyRequest) => {
      try {
        await request.jwtVerify();
      } catch {
        // ignore missing/invalid tokens
      }
    }],
  };

  const handler = async (
      responseType: 'json'|'arrayBuffer', request: FastifyRequest,
      reply: FastifyReply) => {
    const query = request.query as Record<string, any>;
    const rawPath = typeof query.path === 'string' ? query.path : '';

    let path: string;
    try {
      path = normalizePath(rawPath);
    } catch (err) {
      return badRequest(reply, (err as Error).message);
    }

    const userId = (request.user as {sub?: string} | undefined)?.sub ?? null;
    let actorId: string|null = null;
    let maptilerPrefs = null;
    if (userId) {
      const actor = await ensureGeoActor(prisma, userId);
      actorId = actor.id;
      maptilerPrefs = await readUserPreferencesByActor(prisma, actorId);
    }
    const maxAgeMinutes = parseMaxAge(query);

    let params = pickParams(query);
    if (maptilerPrefs) {
      if (params.language === undefined && maptilerPrefs.maptiler.language)
        params = {...params, language: maptilerPrefs.maptiler.language};
      if (params.style === undefined && maptilerPrefs.maptiler.style)
        params = {...params, style: maptilerPrefs.maptiler.style};
    }

    const {cached, response, signature, kind} = await fetchMaptilerWithCache(
        prisma as any,
        {path, params, responseType},
        {maxAgeMinutes, actorId},
    );

    await recordTelemetry(request, {
      ...buildTelemetryBase(request),
      eventType: `maptiler.${kind}.${cached ? 'cached' : 'fetched'}`,
      source: 'api',
      payload: {path, cached},
    });

    if (actorId) {
      const now = new Date();
      const patch: UserPreferencePatch = {
        maptiler: {
          last: {
            path,
            params,
            kind,
            signature,
            fetchedAt: now.toISOString(),
          },
        },
      };
      if (typeof params.style === 'string')
        patch.maptiler!.style = params.style;
      if (typeof params.language === 'string')
        patch.maptiler!.language = params.language;
      await updateUserPreferencesByActor(prisma, actorId, patch);
    }

    if (!response.ok)
      return reply.status(response.status).send(response.body ?? {
        error: 'MapTiler error'
      });

    if (response.contentType)
      reply.header('Content-Type', response.contentType);
    if (response.cacheControl)
      reply.header('Cache-Control', response.cacheControl);
    reply.header('X-Cache', cached ? 'HIT' : 'MISS');

    if (responseType === 'arrayBuffer' && response.data) {
      void persistTileEntity({
        path,
        params,
        response,
        signature,
        cached,
      }).catch((err) => {
        server.log.warn(
            {err, path, signature}, 'maptiler tile entity store failed');
      });
      return reply.send(response.data);
    }

    return response.body;
  };

  const maptilerRouteOptions: RateLimitedRouteShorthandOptions = {
    ...optionalAuth,
    rateLimit: {
      max: MAPTILER_RATE_LIMIT_MAX,
      timeWindow: MAPTILER_RATE_LIMIT_WINDOW,
    },
    schema: {
      summary: 'Proxy MapTiler Cloud endpoints with caching',
      description:
          'Proxies MapTiler Cloud requests with caching and optional auth for preferences.',
      operationId: 'maptiler_proxy',
      tags: ['maptiler'],
      headers: makeParamsSchema(OptionalAuthHeaderSchema, 'OptionalAuthHeader'),
      params: makeParamsSchema(
          z.object({
             kind: MaptilerKind.describe('Response shape to proxy'),
           }).strict(),
          'MaptilerParams'),
      querystring: makeQuerySchema(
          z.object({
             path:
                 z.string()
                     .min(1)
                     .regex(
                         /^\/?(geocoding|search|maps|tiles|vector-tiles|data|styles|fonts|elevation|weather|matrix|geolocation|place|static)(\/.*)?$/,
                         'Path must start with an allowed MapTiler root')
                     .describe(
                         'Relative MapTiler API path (no protocol). Allowed roots: geocoding, search, maps, tiles, vector-tiles, data, styles, fonts, elevation, weather, matrix, geolocation, place, static.'),
             maxAgeMinutes: z.union([z.number(), z.string()])
                                .optional()
                                .describe('Cache TTL in minutes'),
             responseType: z.enum(['json', 'arrayBuffer'])
                               .optional()
                               .describe('Override response parsing'),
           }).passthrough(),
          'MaptilerQuery'),
      response: makeResponses(
          {
            200: withExamples(
                {
                  type: [
                    'object', 'array', 'string', 'number', 'boolean', 'null'
                  ],
                },
                [{data: 'MapTiler response'}]),
          },
          {includeStandardErrors: true}),
    },
  };

  server.get(
      '/maptiler/:kind', maptilerRouteOptions, async (request, reply) => {
        const {kind} = request.params as {kind?: string};
        if (kind !== 'json' && kind !== 'tiles') {
          return badRequest(reply, 'kind must be json or tiles');
        }
        const responseType = kind === 'tiles' ? 'arrayBuffer' : 'json';
        return handler(responseType, request, reply);
      });
}
