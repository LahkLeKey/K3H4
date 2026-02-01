import {type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {ensureGeoActor, ensureGeoGlobalActor} from '../services/geo-actor';
import {GEO_DEM_TTL_MS, readGeoDemTileCache, writeGeoDemTileCache} from '../services/geo-cache';
import {demSignature, TERRAIN_PROVIDER} from '../services/geo-dem-cache';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const DEM_TILE_MAX_BYTES =
    Number(process.env.DEM_TILE_MAX_BYTES ?? 5_000_000);  // 5 MB safety guard
const MAX_ZOOM = 16;
const EMPTY_TILE_PNG = Buffer.from(
    // 1x1 transparent PNG; keeps MapLibre/Deck from thrashing on 502s
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wwAAn8B9oZ1sOgAAAAASUVORK5CYII=',
    'base64',
);

const decodeUserId = async (server: FastifyInstance, request: any) => {
  let userId: string|null = null;
  const hasAuth = typeof request.headers.authorization === 'string' &&
      request.headers.authorization.trim().length > 0;
  if (!hasAuth) return null;
  try {
    await request.jwtVerify();
    userId = (request.user as {sub?: string})?.sub ?? null;
  } catch (err) {
    server.log.debug({err}, 'dem optional auth failed');
  }
  return userId;
};

export function registerDemRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get<{
    Params: {z: string; x: string; y: string; format?: string};
    Querystring: {provider?: string};
  }>(
      '/geo/dem/:z/:x/:y.:format',
      {
        schema: {
          summary: 'Serve DEM tiles via MapTiler Terrain-RGB with cache',
          tags: ['geo'],
        },
      },
      async (request, reply) => {
        const params = request.params;
        const fmt = (params.format || 'png').toLowerCase();
        if (!['png', 'webp'].includes(fmt)) {
          return reply.status(400).send({error: 'format must be png or webp'});
        }

        const z = Number(params.z);
        const x = Number(params.x);
        const y = Number(params.y);
        if (![z, x, y].every((n) => Number.isInteger(n))) {
          return reply.status(400).send({error: 'z, x, y must be integers'});
        }
        if (z < 0 || z > MAX_ZOOM) {
          return reply.status(400).send(
              {error: `z must be between 0 and ${MAX_ZOOM}`});
        }

        const provider =
            (request.query?.provider || TERRAIN_PROVIDER).toLowerCase();
        if (provider !== TERRAIN_PROVIDER) {
          return reply.status(400).send({error: 'unsupported provider'});
        }

        const userId = await decodeUserId(server, request);
        const actorId =
            userId ? (await ensureGeoActor(prisma, userId)).id : null;
        const signature = demSignature(provider, z, x, y, fmt);
        const now = new Date();

        let cacheActorId: string|null = actorId;
        let globalActorId: string|null = null;
        const resolveCacheActorId = async () => {
          if (cacheActorId) return cacheActorId;
          if (!globalActorId) {
            const globalActor = await ensureGeoGlobalActor(prisma);
            globalActorId = globalActor.id;
          }
          return globalActorId;
        };
        const storageActorId = await resolveCacheActorId();
        const cached =
            await readGeoDemTileCache(prisma, storageActorId, signature);
        if (cached && cached.dataBase64) {
          const tile = Buffer.from(cached.dataBase64, 'base64');
          const cacheControlHeader = cached.cacheControl ??
              `public, max-age=${Math.floor(GEO_DEM_TTL_MS / 1000)}`;
          reply.header('Content-Type', `image/${fmt}`);
          reply.header('Cache-Control', cacheControlHeader);
          if (cached.etag) reply.header('ETag', cached.etag);
          reply.header('X-Cache', 'HIT');
          await recordTelemetry(request, {
            ...buildTelemetryBase(request),
            eventType: 'geo.dem.cached',
            source: 'api',
            payload: {signature, provider},
          });
          return reply.send(tile);
        }

        const apiKey = process.env.MAPTILER_API_KEY;
        if (!apiKey) {
          server.log.warn(
              'dem request but MAPTILER_API_KEY missing; serving empty tile');
          reply.header('Content-Type', `image/${fmt}`);
          reply.header('Cache-Control', 'public, max-age=600');
          reply.header('X-Cache', 'MISS-EMPTY');
          return reply.send(EMPTY_TILE_PNG);
        }

        const upstream = `https://api.maptiler.com/tiles/terrain-rgb/${z}/${
            x}/${y}.${fmt}?key=${apiKey}`;

        const upstreamRes = await fetch(upstream);
        if (!upstreamRes.ok) {
          server.log.warn(
              {upstream: upstreamRes.status, z, x, y},
              'terrain upstream failure; serving empty tile');
          reply.header('Content-Type', `image/${fmt}`);
          reply.header('Cache-Control', 'public, max-age=300');
          reply.header('X-Cache', 'UPSTREAM-EMPTY');
          return reply.send(EMPTY_TILE_PNG);
        }

        const arrayBuf = await upstreamRes.arrayBuffer();
        if (arrayBuf.byteLength > DEM_TILE_MAX_BYTES) {
          return reply.status(502).send({error: 'terrain tile too large'});
        }

        const data = Buffer.from(arrayBuf);
        const cacheControl = upstreamRes.headers.get('cache-control') ??
            `public, max-age=${Math.floor(GEO_DEM_TTL_MS / 1000)}`;
        const etag = upstreamRes.headers.get('etag') ?? undefined;
        const expiresAt = new Date(Date.now() + GEO_DEM_TTL_MS);
        await writeGeoDemTileCache(prisma, storageActorId, {
          signature,
          provider,
          format: fmt,
          dataBase64: data.toString('base64'),
          cacheControl,
          etag: etag ?? undefined,
          url: upstream,
          fetchedAt: now.toISOString(),
          expiresAt: expiresAt.toISOString(),
        });
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'geo.dem.fetched',
          source: 'api',
          payload: {signature, provider},
        });

        reply.header('Content-Type', `image/${fmt}`);
        reply.header('Cache-Control', cacheControl);
        if (etag) reply.header('ETag', etag);
        reply.header('X-Cache', 'MISS');
        return reply.send(data);
      },
  );
}
