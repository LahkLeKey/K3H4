import { PrismaClient } from "@prisma/client";
import { type FastifyBaseLogger, type FastifyInstance, type FastifyReply, type FastifyRequest } from "fastify";
import { type RecordTelemetryFn, type TelemetryParams } from "../routes/types";
import { normalizeDurationMs, warnOnSuspiciousDuration } from "../routes/telemetry";

const TELEMETRY_MAX_EVENTS = 2000;
const TELEMETRY_PRUNE_BATCH = 32;

const pruneTelemetry = async (prisma: PrismaClient) => {
  const staleEvents = await prisma.telemetryEvent.findMany({
    select: { id: true },
    orderBy: [
      { createdAt: "desc" },
      { id: "desc" },
    ],
    skip: TELEMETRY_MAX_EVENTS,
    take: TELEMETRY_PRUNE_BATCH,
  });

  if (!staleEvents.length) return;

  await prisma.telemetryEvent.deleteMany({ where: { id: { in: staleEvents.map((event) => event.id) } } });
};

const TELEMETRY_PRUNE_FREQUENCY = TELEMETRY_PRUNE_BATCH * 2;

let telemetryWritesSincePrune = 0;

const maybeSchedulePrune = (prisma: PrismaClient, log: FastifyBaseLogger) => {
  telemetryWritesSincePrune += 1;
  if (telemetryWritesSincePrune < TELEMETRY_PRUNE_FREQUENCY) return;
  telemetryWritesSincePrune = 0;
  void pruneTelemetry(prisma).catch((err) => log.warn({ err }, "telemetry prune failed"));
};
export const createTelemetryRecorder = (prisma: PrismaClient): RecordTelemetryFn => {
  return async (request: FastifyRequest, params: TelemetryParams) => {
    const durationMs = normalizeDurationMs(params.durationMs);
    warnOnSuspiciousDuration(request, { eventType: params.eventType, durationMs });

    if (!params.sessionId || !params.path || !params.userId) {
      request.log.warn({ params }, "telemetry payload missing required identifiers");
      return;
    }

    try {
      await prisma.telemetryEvent.create({
        data: {
          sessionId: params.sessionId,
          userId: params.userId,
          eventType: params.eventType,
          source: params.source,
          path: params.path,
          payload: params.payload as any,
          durationMs,
          error: params.error,
        },
      });
    } catch (err) {
      request.log.warn({ err }, "telemetry insert failed");
      return;
    }

    maybeSchedulePrune(prisma, request.log);
  };
};

export function registerTelemetryRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  server.post("/telemetry", async (request, reply) => {
    const body = request.body as
      | {
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
          durationMs?: number | string;
          error?: boolean;
        }
      | undefined;

    const incomingEvents = Array.isArray(body?.events)
      ? body?.events ?? []
      : [body].filter((val): val is NonNullable<typeof body> => Boolean(val));

    const normalizedEvents: TelemetryParams[] = [];

    incomingEvents.forEach((evt) => {
      if (!evt) return;

      const eventType = typeof evt.eventType === "string" ? evt.eventType.trim() : "";
      const source = typeof evt.source === "string" ? evt.source.trim() : "";
      const sessionId = typeof evt.sessionId === "string" ? evt.sessionId.trim() : "";
      const path = typeof evt.path === "string" ? evt.path.trim() : "";
      const userId = typeof evt.userId === "string" ? evt.userId.trim() : "";
      const hasPayload = Object.prototype.hasOwnProperty.call(evt, "payload");
      const rawDuration =
        typeof evt.durationMs === "number"
          ? evt.durationMs
          : typeof evt.durationMs === "string" && evt.durationMs.trim().length > 0
            ? Number(evt.durationMs)
            : NaN;

      if (!eventType || !source || !sessionId || !path || !userId || !hasPayload || !Number.isFinite(rawDuration)) {
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
      return reply.status(400).send({ error: "eventType, source, sessionId, path, userId, payload, durationMs are required" });
    }

    const hasAuth = typeof request.headers.authorization === "string" && request.headers.authorization.length > 0;
    if (hasAuth) {
      try {
        await request.jwtVerify();
      } catch (err) {
        request.log.debug({ err }, "telemetry token verification failed; continuing unauthenticated");
      }
    }

    await Promise.all(normalizedEvents.map((evt) => recordTelemetry(request, evt)));

    return { ok: true, recorded: normalizedEvents.length };
  });

  server.get("/telemetry", async (request) => {
    const query = request.query as {
      eventType?: string | string[];
      source?: string | string[];
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
    const cursorId = typeof query.cursorId === "string" && query.cursorId.length > 0 ? query.cursorId : null;
    const hasCursor = cursorTs && !Number.isNaN(cursorTs.getTime()) && cursorId;

    const eventTypes = Array.isArray(query.eventType)
      ? query.eventType.filter(Boolean)
      : query.eventType?.split(",").map((s) => s.trim()).filter(Boolean);
    const sources = Array.isArray(query.source)
      ? query.source.filter(Boolean)
      : query.source?.split(",").map((s) => s.trim()).filter(Boolean);

    const where: any = {};
    if (eventTypes?.length) where.eventType = { in: eventTypes };
    if (sources?.length) where.source = { in: sources };
    if (query.sessionId) where.sessionId = query.sessionId;
    if (query.userId) where.userId = query.userId;
    if (since && !Number.isNaN(since.getTime())) where.createdAt = { gte: since };

    const cursorClause = hasCursor
      ? {
          OR: [
            { createdAt: { lt: cursorTs } },
            { createdAt: cursorTs, id: { lt: cursorId } },
          ],
        }
      : null;

    const finalWhere = cursorClause ? { AND: [where, cursorClause] } : where;

    const events = await prisma.telemetryEvent.findMany({
      where: finalWhere,
      orderBy: [
        { createdAt: "desc" },
        { id: "desc" },
      ],
      take: limit,
    });

    const summary = {
      total: events.length,
      byEventType: events.reduce<Record<string, number>>((acc, evt) => {
        acc[evt.eventType] = (acc[evt.eventType] ?? 0) + 1;
        return acc;
      }, {}),
      bySource: events.reduce<Record<string, number>>((acc, evt) => {
        acc[evt.source] = (acc[evt.source] ?? 0) + 1;
        return acc;
      }, {}),
      newestTs: events[0]?.createdAt ?? null,
      oldestTs: events[events.length - 1]?.createdAt ?? null,
    };

    const nextCursor = events.length === limit
      ? { cursorTs: events[events.length - 1].createdAt, cursorId: events[events.length - 1].id }
      : null;

    return { events, summary, nextCursor };
  });
}
