import {EntityKind, PrismaClient} from '@prisma/client';
import {type FastifyBaseLogger, type FastifyInstance, type FastifyReply, type FastifyRequest} from 'fastify';

import {createTelemetryBuffer} from '../lib/telemetry-buffer';
import {normalizeDurationMs, warnOnSuspiciousDuration} from '../routes/telemetry';
import {type RecordTelemetryFn, type TelemetryParams} from '../routes/types';
import {getTelemetryActorSource, TELEMETRY_SESSION_TARGET} from '../services/telemetry-actor';

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const TELEMETRY_RETENTION_MINUTES = 5;
const TELEMETRY_RETENTION_MS =
    MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE * TELEMETRY_RETENTION_MINUTES;
let lastPruneAt = 0;

const pruneTelemetry = async (prisma: PrismaClient) => {
  const cutoff = new Date(Date.now() - TELEMETRY_RETENTION_MS);
  await prisma.entity.deleteMany({
    where: {kind: EntityKind.TELEMETRY_EVENT, createdAt: {lt: cutoff}},
  });
};

const runPruneTelemetry =
    (prisma: PrismaClient, log: FastifyBaseLogger, reply: FastifyReply) => {
      void pruneTelemetry(prisma).catch(
          (err) => log.warn({err}, 'telemetry prune failed'));
    };

const maybeSchedulePrune = (prisma: PrismaClient, log: FastifyBaseLogger) => {
  const now = Date.now();
  // Prune during first telemetry call after fresh server start
  if (lastPruneAt === 0) {
    lastPruneAt = now;
    runPruneTelemetry(prisma, log, null as any);
    return;
  };

  // Prune per retention period
  if (now - lastPruneAt < TELEMETRY_RETENTION_MS) return;
  lastPruneAt = now;
  runPruneTelemetry(prisma, log, null as any);
};
export const createTelemetryRecorder =
    (prisma: PrismaClient): RecordTelemetryFn => {
      const bufferedTelemetry = createTelemetryBuffer(prisma);
      return async (request: FastifyRequest, params: TelemetryParams) => {
        const durationMs = normalizeDurationMs(params.durationMs);
        warnOnSuspiciousDuration(
            request, {eventType: params.eventType, durationMs});

        if (!params.sessionId || !params.path || !params.userId) {
          request.log.warn(
              {params}, 'telemetry payload missing required identifiers');
          return;
        }

        try {
          bufferedTelemetry.enqueue({
            sessionId: params.sessionId,
            userId: params.userId,
            eventType: params.eventType,
            source: params.source,
            path: params.path,
            payload: params.payload as any,
            durationMs,
            error: params.error,
          });
        } catch (err) {
          request.log.warn({err}, 'telemetry insert failed');
          return;
        }

        maybeSchedulePrune(prisma, request.log);
      };
    };

export function registerTelemetryRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.post('/telemetry', async (request, reply) => {
    const body = request.body as | {
      events?: Array<{
        eventType?: string;
        source?: string;
        sessionId?: string;
        path?: string;
        payload?: unknown;
        userId?: string;
        durationMs?: number | string;
        error?: boolean;
      }>;
      eventType?: string;
      source?: string;
      sessionId?: string;
      path?: string;
      payload?: unknown;
      userId?: string;
      durationMs?: number|string;
      error?: boolean;
    }
    |undefined;

    const incomingEvents = Array.isArray(body?.events) ?
        body?.events ?? [] :
        [body].filter((val): val is NonNullable<typeof body> => Boolean(val));

    const normalizedEvents: TelemetryParams[] = [];

    incomingEvents.forEach((evt) => {
      if (!evt) return;

      const eventType =
          typeof evt.eventType === 'string' ? evt.eventType.trim() : '';
      const source = typeof evt.source === 'string' ? evt.source.trim() : '';
      const sessionId =
          typeof evt.sessionId === 'string' ? evt.sessionId.trim() : '';
      const path = typeof evt.path === 'string' ? evt.path.trim() : '';
      const userId = typeof evt.userId === 'string' ? evt.userId.trim() : '';
      const hasPayload = Object.prototype.hasOwnProperty.call(evt, 'payload');
      const rawDuration = typeof evt.durationMs === 'number' ?
          evt.durationMs :
          typeof evt.durationMs === 'string' &&
              evt.durationMs.trim().length > 0 ?
          Number(evt.durationMs) :
          NaN;

      if (!eventType || !source || !sessionId || !path || !userId ||
          !hasPayload || !Number.isFinite(rawDuration)) {
        return;
      }

      const durationMs = normalizeDurationMs(rawDuration);

      normalizedEvents.push({
        eventType,
        source,
        sessionId,
        path,
        payload: evt.payload,
        userId,
        durationMs,
        error: evt.error === true,
      });
    });

    if (normalizedEvents.length === 0) {
      return reply.status(400).send({
        error:
            'eventType, source, sessionId, path, userId, payload, durationMs are required'
      });
    }

    const hasAuth = typeof request.headers.authorization === 'string' &&
        request.headers.authorization.length > 0;
    if (hasAuth) {
      try {
        await request.jwtVerify();
      } catch (err) {
        request.log.debug(
            {err},
            'telemetry token verification failed; continuing unauthenticated');
      }
    }

    await Promise.all(
        normalizedEvents.map((evt) => recordTelemetry(request, evt)));

    return {ok: true, recorded: normalizedEvents.length};
  });

  server.get('/telemetry', async (request) => {
    const query = request.query as {
      eventType?: string|string[];
      source?: string|string[];
      sessionId?: string;
      userId?: string;
      since?: string;
      limit?: string;
      cursorTs?: string;
      cursorId?: string;
    };

    const limit = Math.min(500, Math.max(1, Number(query.limit ?? 200)));
    const since = query.since ? new Date(query.since) : null;
    const cursorTs = query.cursorTs ? new Date(query.cursorTs) : null;
    const cursorId =
        typeof query.cursorId === 'string' && query.cursorId.length > 0 ?
        query.cursorId :
        null;
    const hasCursor = cursorTs && !Number.isNaN(cursorTs.getTime()) && cursorId;

    const eventTypes = Array.isArray(query.eventType) ?
        query.eventType.filter(Boolean) :
        query.eventType?.split(',').map((s) => s.trim()).filter(Boolean);
    const sources = Array.isArray(query.source) ?
        query.source.filter(Boolean) :
        query.source?.split(',').map((s) => s.trim()).filter(Boolean);

    const where: any = {kind: EntityKind.TELEMETRY_EVENT};
    if (eventTypes?.length) where.name = {in : eventTypes};
    if (sources?.length) where.source = {in : sources};
    if (query.sessionId) {
      where.targetType = TELEMETRY_SESSION_TARGET;
      where.targetId = query.sessionId;
    }
    if (query.userId) {
      where.actor = {source: getTelemetryActorSource(query.userId)};
    }
    if (since && !Number.isNaN(since.getTime())) where.createdAt = {gte: since};

    const cursorClause = hasCursor ? {
      OR: [
        {createdAt: {lt: cursorTs}},
        {createdAt: cursorTs, id: {lt: cursorId}},
      ],
    } :
                                     null;

    const finalWhere = cursorClause ? {AND: [where, cursorClause]} : where;

    const entities = await prisma.entity.findMany({
      where: finalWhere,
      orderBy: [
        {createdAt: 'desc'},
        {id: 'desc'},
      ],
      take: limit,
      select: {
        id: true,
        name: true,
        source: true,
        targetId: true,
        metadata: true,
        createdAt: true,
      },
    });

    type EntityMetadata = {
      path?: string;
      payload?: unknown;
      durationMs?: number;
      error?: boolean;
      userId?: string;
    };

    const events = entities.map((entity) => {
      const metadata = (entity.metadata ?? {}) as EntityMetadata;
      return {
        id: entity.id,
        createdAt: entity.createdAt,
        eventType: entity.name ?? '',
        source: entity.source ?? '',
        sessionId: entity.targetId ?? '',
        path: typeof metadata.path === 'string' ? metadata.path : '',
        payload: metadata.payload,
        userId: typeof metadata.userId === 'string' ? metadata.userId : '',
        durationMs:
            typeof metadata.durationMs === 'number' ? metadata.durationMs : 0,
        error: metadata.error === true,
      };
    });

    const summary = {
      total: events.length,
      byEventType: events.reduce<Record<string, number>>(
          (acc, evt) => {
            acc[evt.eventType] = (acc[evt.eventType] ?? 0) + 1;
            return acc;
          },
          {}),
      bySource: events.reduce<Record<string, number>>(
          (acc, evt) => {
            acc[evt.source] = (acc[evt.source] ?? 0) + 1;
            return acc;
          },
          {}),
      newestTs: events[0]?.createdAt ?? null,
      oldestTs: events[events.length - 1]?.createdAt ?? null,
    };

    const nextCursor = entities.length === limit ? {
      cursorTs: entities[entities.length - 1].createdAt,
      cursorId: entities[entities.length - 1].id
    } :
                                                   null;

    return {events, summary, nextCursor};
  });
}
