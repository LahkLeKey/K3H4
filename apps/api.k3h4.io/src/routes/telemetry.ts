import { type FastifyRequest } from "fastify";
import { type RecordTelemetryFn, type TelemetryParams } from "./types";

export type TelemetryBase = Pick<TelemetryParams, "sessionId" | "userId" | "path" | "durationMs" | "error">;

const clampDurationMs = (value: number): number => {
  if (!Number.isFinite(value)) return 0;
  const clamped = Math.max(0, Math.min(1_000_000, Math.round(value)));
  return clamped;
};

const resolveSessionId = (request: FastifyRequest): string => {
  const headerSession = request.headers["x-session-id"];
  if (typeof headerSession === "string" && headerSession.trim().length > 0) return headerSession.trim();
  if (Array.isArray(headerSession) && typeof headerSession[0] === "string" && headerSession[0].trim().length > 0) {
    return headerSession[0].trim();
  }
  return String(request.id ?? "unknown-session");
};

const resolveUserId = (request: FastifyRequest): string => {
  const candidate = (request.user as { sub?: string } | undefined)?.sub;
  if (typeof candidate === "string") {
    const trimmed = candidate.trim();
    if (trimmed.length > 0) return trimmed;
  }
  return "anonymous";
};

const resolveDurationMs = (request: FastifyRequest): number => {
  const start = (request as any).requestStartTime;
  if (typeof start === "bigint") {
    const elapsedMs = Number((process.hrtime.bigint() - start) / 1_000_000n);
    return clampDurationMs(elapsedMs);
  }
  return 0;
};

const resolvePath = (request: FastifyRequest): string => {
  const url = request.url;
  if (typeof url === "string" && url.trim().length > 0) return url;
  return "/";
};

export const buildTelemetryBase = (request: FastifyRequest): TelemetryBase => ({
  sessionId: resolveSessionId(request),
  userId: resolveUserId(request),
  path: resolvePath(request),
  durationMs: resolveDurationMs(request),
  error: false,
});

export const warnOnSuspiciousDuration = (request: FastifyRequest, params: { eventType: string; durationMs: number }) => {
  if (params.durationMs <= 0) {
    request.log.warn({ durationMs: params.durationMs, eventType: params.eventType, path: request.url }, "suspicious telemetry duration");
  }
};

export const normalizeDurationMs = clampDurationMs;

type TelemetryInput = Omit<TelemetryParams, "sessionId" | "userId" | "path" | "durationMs" | "error"> &
  Partial<Pick<TelemetryParams, "durationMs" | "error">>;

export const withTelemetryBase = (recordTelemetry: RecordTelemetryFn, request: FastifyRequest) =>
  (params: TelemetryInput) => {
    const base = buildTelemetryBase(request);
    const durationMs = params.durationMs !== undefined ? clampDurationMs(params.durationMs) : base.durationMs;
    const error = params.error ?? base.error;
    return recordTelemetry(request, { ...base, ...params, durationMs, error });
  };
