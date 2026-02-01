import {PrismaClient} from '@prisma/client';
import {type FastifyInstance, type FastifyReply, type FastifyRequest, type RouteShorthandOptions} from 'fastify';

import {ensureGeoActor} from '../actors/Geo/Geo';
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

export function registerMaptilerRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  // Map views should work even for anonymous users; we only verify JWT if
  // present.
  type RateLimitedRouteShorthandOptions = RouteShorthandOptions&{
    rateLimit?: {max: number; timeWindow: string};
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
      tags: ['maptiler'],
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
