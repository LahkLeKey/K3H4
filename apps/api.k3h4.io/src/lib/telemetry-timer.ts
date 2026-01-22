import { type FastifyRequest } from "fastify";

import { buildTelemetryBase, normalizeDurationMs } from "../routes/telemetry";
import { type RecordTelemetryFn } from "../routes/types";

export type TelemetryMeta = {
    source?: string;
    payload?: unknown;
    sessionId?: string;
    path?: string;
    userId?: string;
};

const mergePayloadWithError = (payload: unknown, errMsg: string) => {
    if (payload && typeof payload === "object" && !Array.isArray(payload)) {
        return { ...(payload as Record<string, unknown>), errorMessage: errMsg };
    }
    if (payload === undefined) return { errorMessage: errMsg };
    return { errorMessage: errMsg, payload };
};

const applyMetaOverrides = (base: ReturnType<typeof buildTelemetryBase>, meta: TelemetryMeta) => {
    const next = { ...base };
    if (meta.sessionId !== undefined) next.sessionId = meta.sessionId;
    if (meta.userId !== undefined) next.userId = meta.userId;
    if (meta.path !== undefined) next.path = meta.path;
    return next;
};

export function createTelemetryTimer(request: FastifyRequest, recordTelemetry: RecordTelemetryFn, defaults?: Partial<TelemetryMeta>) {
    return async function withTiming<T>(eventType: string, meta: TelemetryMeta = {}, fn: () => Promise<T> | T): Promise<T> {
        const started = process.hrtime.bigint();
        const mergedMeta: TelemetryMeta = { ...(defaults ?? {}), ...meta };
        const source = mergedMeta.source ?? "unknown";

        const buildEnvelope = (durationMsRaw: number, payload: unknown, error: boolean) => {
            const base = applyMetaOverrides(buildTelemetryBase(request), mergedMeta);
            const durationMs = normalizeDurationMs(durationMsRaw);
            const safePayload = payload === undefined ? {} : payload;
            return { ...base, source, eventType, durationMs, payload: safePayload, error };
        };

        try {
            const result = await fn();
            const durationMs = Number((process.hrtime.bigint() - started) / 1_000_000n);
            await recordTelemetry(request, buildEnvelope(durationMs, mergedMeta.payload, false));
            return result;
        } catch (err) {
            const durationMs = Number((process.hrtime.bigint() - started) / 1_000_000n);
            const errMsg = err instanceof Error ? err.message : String(err);
            const payload = mergePayloadWithError(mergedMeta.payload, errMsg);
            await recordTelemetry(request, buildEnvelope(durationMs, payload, true));
            throw err;
        }
    };
}
