import { type FastifyRequest } from "fastify";

export type RecordTelemetryFn = (
  request: FastifyRequest,
  params: { eventType: string; source: string; payload?: unknown; sessionId?: string; path?: string; userId?: string },
) => Promise<void>;
