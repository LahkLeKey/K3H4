import {type OllamaOperation, type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {withTelemetryBase} from './telemetry';
import type {RecordTelemetryFn} from './types';

export type OllamaOperationSource = 'chat'|'insights';

export type OllamaOperationCreateParams = {
  prisma: PrismaClient; userId: string; source: OllamaOperationSource;
  sessionId?: string | null; model: string;
  temperature?: number | null;
  systemPrompt?: string | null; requestBody: unknown;
  responseBody?: unknown;
  statusCode?: number | null;
  errorMessage?: string | null;
  metadata?: unknown;
};

const DEFAULT_OPERATIONS_LIMIT = 30;
const MAX_OPERATIONS_LIMIT = 100;

const operationsListSchema = {
  querystring: {
    type: 'object',
    properties: {
      limit: {type: 'number', minimum: 1, maximum: MAX_OPERATIONS_LIMIT},
      source: {type: 'string', enum: ['chat', 'insights']},
      sessionId: {type: 'string'},
    },
  },
};

export async function recordOllamaOperation(
    params: OllamaOperationCreateParams) {
  const {
    prisma,
    userId,
    source,
    sessionId,
    model,
    temperature,
    systemPrompt,
    requestBody,
    responseBody,
    statusCode,
    errorMessage,
    metadata,
  } = params;
  await prisma.ollamaOperation.create({
    data: {
      userId,
      source,
      sessionId: sessionId ?? undefined,
      model,
      temperature: temperature ?? undefined,
      systemPrompt: systemPrompt?.trim() || undefined,
      requestBody,
      responseBody,
      statusCode: statusCode ?? undefined,
      errorMessage: errorMessage ?? undefined,
      metadata: metadata ?? undefined,
    },
  });
}

export function registerOllamaProxyRoutes(
    server: FastifyInstance,
    prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn,
) {
  const authenticate = server.authenticate;

  server.get(
      '/ai/ollama/operations',
      {
        preHandler: [authenticate],
        schema: operationsListSchema,
      },
      async (request) => {
        const telemetry = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const query = request.query as {
          limit?: string|number|null;
          source?: string|null;
          sessionId?: string|null;
        };
        const limit = clampLimit(query.limit);
        const normalizedSource = normalizeSource(query.source);
        const normalizedSessionId = normalizeString(query.sessionId);
        const operations = await prisma.ollamaOperation.findMany({
          where: {
            userId,
            source: normalizedSource ?? undefined,
            sessionId: normalizedSessionId ?? undefined,
          },
          orderBy: {createdAt: 'desc'},
          take: limit,
          include: {
            session: {select: {title: true}},
          },
        });
        await telemetry({
          eventType: 'ai.ollama.operations.list',
          source: 'ai',
          payload: {
            count: operations.length,
            limit,
            source: normalizedSource ?? 'all',
          },
        });
        return {operations: operations.map(mapOllamaOperation)};
      },
  );
}

type OllamaOperationWithSession =
    OllamaOperation&{session: {title: string | null} | null};

function mapOllamaOperation(row: OllamaOperationWithSession) {
  return {
    id: row.id,
    source: row.source as OllamaOperationSource,
    model: row.model,
    temperature: row.temperature ?? null,
    systemPrompt: row.systemPrompt ?? null,
    requestBody: row.requestBody,
    responseBody: row.responseBody ?? null,
    metadata: row.metadata ?? null,
    statusCode: row.statusCode ?? null,
    errorMessage: row.errorMessage ?? null,
    sessionId: row.sessionId ?? null,
    sessionTitle: row.session?.title ?? null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function clampLimit(value?: string|number|null): number {
  const numeric = typeof value === 'number' ? value : Number(value ?? NaN);
  if (!Number.isFinite(numeric)) return DEFAULT_OPERATIONS_LIMIT;
  return Math.max(1, Math.min(MAX_OPERATIONS_LIMIT, Math.floor(numeric)));
}

function normalizeSource(value?: string|null): OllamaOperationSource|null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().toLowerCase();
  if (normalized === 'chat') return 'chat';
  if (normalized === 'insights' || normalized === 'insight') return 'insights';
  return null;
}

function normalizeString(value?: string|null): string|null {
  const trimmed = value?.trim();
  return trimmed && trimmed.length ? trimmed : null;
}
