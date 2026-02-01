import {PrismaClient} from '@prisma/client';
import {type FastifyInstance, type FastifyReply, type FastifyRequest} from 'fastify';
import {Buffer} from 'node:buffer';

import {ensureGeoActor} from '../services/geo-actor';
import {fetchMaptilerCacheOnly, fetchMaptilerWithCache} from '../services/maptiler-cache';
import {readUserPreferencesByActor} from '../services/user-preferences';

import {withTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const DEFAULT_MAX_AGE_MINUTES = 60 * 6;  // 6 hours
const MAX_OPS = 32;
const MAPTILER_CONCURRENCY = 4;
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

const optionalAuth = {
  preHandler: [async (request: FastifyRequest) => {
    try {
      await request.jwtVerify();
    } catch {
      // allow anonymous
    }
  }],
};

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

const pickParams = (params: Record<string, any>|undefined|null) => {
  if (!params || typeof params !== 'object') return {} as Record<string, any>;
  const {path, maxAgeMinutes, responseType, cacheOnly, ...rest} =
      params as Record<string, any>;
  return rest;
};

type MaptilerOp = {
  id?: string; op: 'maptiler.tile' | 'maptiler.json'; path: string;
  params?: Record<string, any>;
  responseType?: 'json' | 'arrayBuffer';
  maxAgeMinutes?: number;
  cacheOnly?: boolean;
  kind?: string;
};

type BatchOp = MaptilerOp|{
  id?: string;
  op: string
};

const isMaptilerOp = (op: BatchOp): op is MaptilerOp =>
    op?.op === 'maptiler.tile' || op?.op === 'maptiler.json';

type MaptilerResult = {
  ok: boolean; status: number; cached: boolean;
  source: 'cache' | 'network' | 'none';
  cacheMiss?: boolean;
  kind?: string;
  contentType?: string;
  cacheControl?: string;
  body?: unknown;
  dataBase64?: string | null;
  size?: number;
  error?: string;
};

const badRequest = (reply: FastifyReply, message: string) =>
    reply.status(400).send({error: message});

type BatchRequestBody = {
  ops?: BatchOp[];
  warmOnly?: boolean;
};

export function registerBatchRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.post(
      '/api/batch',
      {...optionalAuth, rateLimit: {max: 120, timeWindow: '1 minute'}} as any,
      async (request: FastifyRequest, reply: FastifyReply) => {
        const rt = withTelemetryBase(recordTelemetry, request);
        const body = request.body as BatchRequestBody | undefined;
        if (!body || !Array.isArray(body.ops) || body.ops.length === 0)
          return badRequest(reply, 'ops array is required');
        if (body.ops.length > MAX_OPS)
          return badRequest(reply, `max ${MAX_OPS} ops`);

        const userId =
            (request.user as {sub?: string} | undefined)?.sub ?? null;
        let actorId: string|null = null;
        let maptilerPrefs = null;
        if (userId) {
          const actor = await ensureGeoActor(prisma, userId);
          actorId = actor.id;
          maptilerPrefs = await readUserPreferencesByActor(prisma, actorId);
        }

        const results: Record<string, MaptilerResult> = {};
        const maptilerTasks: Array<{id: string; raw: MaptilerOp}> = [];
        let maptilerCount = 0;
        let invalidOps = 0;
        let unsupportedOps = 0;
        const warmOnly = body.warmOnly === true;

        const recordInvalidOp =
            async (id: string, raw: BatchOp|undefined, reason: string) => {
          const opName = typeof raw?.op === 'string' ? raw.op : null;
          const path = raw && isMaptilerOp(raw) ? raw.path : null;
          await rt({
            eventType: 'batch.invalid',
            source: 'api',
            payload: {id, op: opName, path, reason},
          });
        };

        const recordMaptilerEvent = async (
            id: string,
            telemetryPath: string,
            raw: MaptilerOp,
            result: MaptilerResult,
            responseType: 'json'|'arrayBuffer',
            durationMs: number,
            ) => {
          const eventType = raw.op === 'maptiler.json' ? 'batch.maptiler.json' :
                                                         'batch.maptiler.tile';
          const isError = !result.ok;
          await rt({
            eventType,
            source: 'api',
            error: isError,
            payload: {
              id,
              path: telemetryPath,
              kind: result.kind ?? raw.kind,
              responseType,
              cacheOnly: raw.cacheOnly === true,
              cached: result.cached,
              source: result.source,
              cacheMiss: result.cacheMiss ?? false,
              status: result.status,
              ok: result.ok,
              error: result.error ?? null,
              size: result.size ?? null,
            },
            durationMs,
          });
        };

        for (let idx = 0; idx < body.ops.length; idx += 1) {
          const raw: BatchOp = body.ops[idx] as BatchOp;
          const id = typeof raw?.id === 'string' && raw.id.trim().length > 0 ?
              raw.id.trim() :
              `op${idx}`;

          if (!raw || typeof raw !== 'object' || typeof raw.op !== 'string') {
            results[id] = {
              ok: false,
              status: 400,
              cached: false,
              source: 'none',
              error: 'invalid op'
            };
            invalidOps += 1;
            await recordInvalidOp(id, raw, 'invalid op');
            continue;
          }

          if (isMaptilerOp(raw)) {
            maptilerCount += 1;
            maptilerTasks.push({id, raw});
            continue;
          }

          invalidOps += 1;
          unsupportedOps += 1;
          results[id] = {
            ok: false,
            status: 400,
            cached: false,
            source: 'none',
            error: `unsupported op ${raw.op}`
          };
          await recordInvalidOp(id, raw, `unsupported op ${raw.op}`);
        }

        const executeMaptilerTask =
            async ({id, raw}: {id: string; raw: MaptilerOp}) => {
          const responseType: 'json'|'arrayBuffer' =
              raw.op === 'maptiler.json'  ? 'json' :
              raw.responseType === 'json' ? 'json' :
                                            'arrayBuffer';

          const taskStart = process.hrtime.bigint();

          const finalizeMaptilerResult =
              async (result: MaptilerResult, telemetryPath: string) => {
            const durationNs = process.hrtime.bigint() - taskStart;
            const durationMs =
                Number((durationNs >= 0n ? durationNs : 0n) / 1_000_000n);
            results[id] = result;
            await recordMaptilerEvent(
                id, telemetryPath, raw, result, responseType, durationMs);
          };

          let telemetryPath =
              typeof raw.path === 'string' ? raw.path.trim() : '';

          try {
            const path = normalizePath(telemetryPath);
            telemetryPath = path;
            const maxAgeMinutes =
                coerceNumber(raw.maxAgeMinutes) ?? DEFAULT_MAX_AGE_MINUTES;
            let params = pickParams(raw.params);

            if (maptilerPrefs) {
              if (params.language === undefined &&
                  maptilerPrefs.maptiler.language)
                params = {...params, language: maptilerPrefs.maptiler.language};
              if (params.style === undefined && maptilerPrefs.maptiler.style)
                params = {...params, style: maptilerPrefs.maptiler.style};
            }

            const cacheOnly = raw.cacheOnly === true;
            const fromCache = cacheOnly ?
                await fetchMaptilerCacheOnly(
                    prisma as any,
                    {path, params, responseType, kind: raw.kind},
                    {maxAgeMinutes, actorId},
                    ) :
                null;

            const {cached, response, kind} = fromCache ?
                fromCache :
                await fetchMaptilerWithCache(
                    prisma as any,
                    {path, params, responseType, kind: raw.kind},
                    {maxAgeMinutes, actorId},
                );

            const source: 'cache'|'network'|'none' = fromCache ? 'cache' :
                cached                                         ? 'cache' :
                                                                 'network';

            if (!response.ok) {
              await finalizeMaptilerResult(
                  {
                    ok: false,
                    status: response.status,
                    cached,
                    source,
                    cacheMiss: cacheOnly && !fromCache,
                    kind,
                    contentType: response.contentType,
                    cacheControl: response.cacheControl,
                    error: 'maptiler error',
                  },
                  telemetryPath);
              return;
            }

            if (responseType === 'arrayBuffer') {
              const buf = response.data ? Buffer.from(response.data) : null;
              await finalizeMaptilerResult(
                  {
                    ok: true,
                    status: response.status,
                    cached,
                    source,
                    kind,
                    contentType: response.contentType,
                    cacheControl: response.cacheControl,
                    dataBase64: buf ? buf.toString('base64') : null,
                    size: buf?.byteLength ?? 0,
                  },
                  telemetryPath);
              return;
            }

            await finalizeMaptilerResult(
                {
                  ok: true,
                  status: response.status,
                  cached,
                  source,
                  kind,
                  contentType: response.contentType,
                  cacheControl: response.cacheControl,
                  body: response.body ?? null,
                },
                telemetryPath);
          } catch (err) {
            await finalizeMaptilerResult(
                {
                  ok: false,
                  status: 400,
                  cached: false,
                  source: 'none',
                  cacheMiss: false,
                  error: err instanceof Error ? err.message : 'maptiler failed',
                },
                telemetryPath);
          }
        };

        const summaryPayload = {
          total: body.ops.length,
          maptiler: maptilerCount,
          invalid: invalidOps,
          unsupported: unsupportedOps,
        };

        const runBatch = async () => {
          for (let i = 0; i < maptilerTasks.length; i += MAPTILER_CONCURRENCY) {
            const chunk = maptilerTasks.slice(i, i + MAPTILER_CONCURRENCY);
            await Promise.all(chunk.map(executeMaptilerTask));
          }
          return results;
        };

        if (warmOnly) {
          void (async () => {
            try {
              await runBatch();
            } catch (err) {
              request.log.error({err}, 'batch prewarm background failed');
            }
          })();

          await rt({
            eventType: 'batch.summary',
            source: 'api',
            payload: summaryPayload,
          });

          return reply.status(200).send(
              {ok: true, warming: true, summary: summaryPayload});
        }

        const finalResults = await runBatch();
        await rt({
          eventType: 'batch.summary',
          source: 'api',
          payload: summaryPayload,
        });

        return {ok: true, results: finalResults};
      },
  );
}
