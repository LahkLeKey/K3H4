import { type FastifyRequest } from "fastify";

export type TelemetryParams = {
  eventType: string;
  source: string;
  payload: unknown;
  sessionId: string;
  path: string;
  userId: string;
  durationMs: number;
  error: boolean;
};

export type RecordTelemetryFn = (request: FastifyRequest, params: TelemetryParams) => Promise<void>;
