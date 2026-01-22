import { type FastifyRequest } from "fastify";

import { type RecordTelemetryFn } from "../routes/types";

export type TelemetryMeta = {
    source?: string;
    payload?: unknown;
    sessionId?: string;
    path?: string;
    userId?: string;
};

export function createTelemetryTimer(request: FastifyRequest, recordTelemetry: RecordTelemetryFn, defaults?: Partial<TelemetryMeta>) {
    return async function withTiming<T>(eventType: string, meta: TelemetryMeta = {}, fn: () => Promise<T> | T): Promise<T> {
        const started = process.hrtime.bigint();
        const base = { ...(defaults ?? {}) } as TelemetryMeta;
        const mergedMeta: TelemetryMeta = { ...base, ...meta };
        const source = mergedMeta.source ?? "unknown";

        try {
            const result = await fn();
            const durationMs = Number((process.hrtime.bigint() - started) / 1_000_000n);
            await recordTelemetry(request, { ...mergedMeta, source, eventType, durationMs, error: false });
            return result;
        } catch (err) {
            const durationMs = Number((process.hrtime.bigint() - started) / 1_000_000n);
            const errMsg = err instanceof Error ? err.message : String(err);
            const payload = mergePayloadWithError(mergedMeta.payload, errMsg);
            await recordTelemetry(request, { ...mergedMeta, source, eventType, durationMs, payload, error: true });
            throw err;
        }
    };
}

const mergePayloadWithError = (payload: unknown, errMsg: string) => {
    if (payload && typeof payload === "object" && !Array.isArray(payload)) {
        return { ...(payload as Record<string, unknown>), errorMessage: errMsg };
    }
    if (payload === undefined) return { errorMessage: errMsg };
    return { errorMessage: errMsg, payload };
};
