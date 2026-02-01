import {Actor, Entity, Prisma, PrismaClient} from '@prisma/client';
import {type FastifyInstance, type FastifyRequest} from 'fastify';
import * as z from 'zod';

import {ensureOllamaOperationsActor, findOllamaOperationsActor,} from '../actors/OllamaOperations/OllamaOperations';
import {ENTITY_KINDS} from '../lib/actor-entity-constants';
import {AuthHeaderSchema, IntegerLikeSchema, StandardErrorResponses, toJsonSchema, withExamples} from '../lib/schemas/openapi';

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

const OLLAMA_SESSION_TARGET_TYPE = 'chat-session';

const DEFAULT_OPERATIONS_LIMIT = 30;
const MAX_OPERATIONS_LIMIT = 100;

const operationsListSchema = {
  summary: 'List Ollama operations',
  description: 'Lists recorded Ollama model operations for the current user.',
  operationId: 'ai_ollama_operation_list',
  tags: ['ai'],
  headers: toJsonSchema(AuthHeaderSchema, 'AuthHeader'),
  security: [{bearerAuth: []}],
  querystring: toJsonSchema(
      z.object({
         limit: IntegerLikeSchema
                    .describe(`Max items to return (default ${
                        DEFAULT_OPERATIONS_LIMIT})`)
                    .optional(),
         source: z.enum(['chat', 'insights']).optional(),
         sessionId: z.string().min(1).optional(),
       }).strict(),
      'OllamaOperationsQuery'),
  response: {
    200: withExamples(
        toJsonSchema(
            z.object({
               operations: z.array(
                   z.object({
                      id: z.string().min(1),
                      source: z.enum(['chat', 'insights']),
                      model: z.string().min(1),
                      temperature: z.number().nullable().optional(),
                      systemPrompt: z.string().nullable().optional(),
                      requestBody: z.unknown().nullable().optional(),
                      responseBody: z.unknown().nullable().optional(),
                      metadata: z.unknown().nullable().optional(),
                      statusCode: z.number().int().nullable().optional(),
                      errorMessage: z.string().nullable().optional(),
                      createdAt: z.string().min(1),
                      sessionId: z.string().nullable().optional(),
                      sessionTitle: z.string().nullable().optional(),
                    }).passthrough()),
             }).strict(),
            'OllamaOperationsResponse'),
        [{
          operations: [{
            id: 'op_01',
            source: 'chat',
            model: 'llama3.2:1b',
            temperature: 0.7,
            systemPrompt: 'Be concise.',
            requestBody: {messages: []},
            responseBody: {message: {content: 'Hello'}},
            metadata: null,
            statusCode: 200,
            errorMessage: null,
            createdAt: '2026-02-01T12:05:00.000Z',
            sessionId: 'sess_01',
            sessionTitle: 'Store planning',
          }],
        }]),
    ...StandardErrorResponses,
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
  const actor = await ensureOllamaOperationsActor(prisma, userId);
  await prisma.entity.create({
    data: {
      actorId: actor.id,
      kind: ENTITY_KINDS.OLLAMA_OPERATION,
      source,
      targetType: sessionId ? OLLAMA_SESSION_TARGET_TYPE : undefined,
      targetId: sessionId ?? undefined,
      name: model,
      metadata: buildMetadata({
        requestBody,
        responseBody,
        temperature,
        systemPrompt,
        statusCode,
        errorMessage,
        metadata,
      }),
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
      async (request: FastifyRequest) => {
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
        const actor = await findOllamaOperationsActor(prisma, userId);
        let operations: Entity[] = [];
        let sessionTitles = new Map<string, string|null>();
        if (actor) {
          const where: Prisma.EntityWhereInput = {
            actorId: actor.id,
            kind: ENTITY_KINDS.OLLAMA_OPERATION,
          };
          if (normalizedSource) where.source = normalizedSource;
          if (normalizedSessionId) {
            where.targetType = OLLAMA_SESSION_TARGET_TYPE;
            where.targetId = normalizedSessionId;
          }
          operations = await prisma.entity.findMany({
            where,
            orderBy: {createdAt: 'desc'},
            take: limit,
          });
          const sessionIds = Array.from(new Set(
              operations
                  .map(
                      (row) => row.targetType === OLLAMA_SESSION_TARGET_TYPE ?
                          row.targetId :
                          null)
                  .filter((id): id is string => Boolean(id))));
          if (sessionIds.length) {
            const sessionActors = await prisma.actor.findMany({
              where: {id: {in : sessionIds}},
              select: {id: true, metadata: true},
            });
            sessionTitles = new Map(sessionActors.map(
                (actor) => [actor.id, getActorSessionTitle(actor)]));
          }
        }
        await telemetry({
          eventType: 'ai.ollama.operations.list',
          source: 'ai',
          payload: {
            count: operations.length,
            limit,
            source: normalizedSource ?? 'all',
          },
        });
        return {
          operations: operations.map(
              (operation) => mapEntityToOperation(operation, sessionTitles)),
        };
      },
  );
}

function buildMetadata(payload: {
  requestBody: unknown;
  responseBody?: unknown;
  temperature?: number | null;
  systemPrompt?: string | null;
  statusCode?: number | null;
  errorMessage?: string | null;
  metadata?: unknown;
}): Prisma.InputJsonObject {
  const trimmedPrompt = typeof payload.systemPrompt === 'string' &&
          payload.systemPrompt.trim().length ?
      payload.systemPrompt.trim() :
      null;
  return {
    temperature: payload.temperature ?? null,
    systemPrompt: trimmedPrompt,
    requestBody: toJsonValue(payload.requestBody),
    responseBody: toNullableJsonValue(payload.responseBody),
    statusCode: payload.statusCode ?? null,
    errorMessage: payload.errorMessage ?? null,
    metadata: safeInputJsonValue(payload.metadata),
  };
}

function safeInputJsonValue(value: unknown): Prisma.InputJsonValue|null {
  if (value === undefined) return null;
  try {
    return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
  } catch {
    return null;
  }
}

function toJsonValue(value: unknown): Prisma.InputJsonValue {
  if (value === null) return null as unknown as Prisma.InputJsonValue;
  const type = typeof value;
  if (type === 'string' || type === 'number' || type === 'boolean') {
    return value as Prisma.InputJsonValue;
  }
  if (Array.isArray(value) || type === 'object') {
    return value as Prisma.InputJsonValue;
  }
  return String(value);
}

function toNullableJsonValue(value?: unknown): Prisma.InputJsonValue|undefined {
  if (value === undefined) return undefined;
  return toJsonValue(value);
}

function mapEntityToOperation(
    row: Entity, sessionTitles: Map<string, string|null>) {
  const metadata = asRecord(row.metadata);
  const sessionId = row.targetType === OLLAMA_SESSION_TARGET_TYPE ?
      row.targetId ?? null :
      null;
  const titleFromMap = sessionId ? sessionTitles.get(sessionId) ?? null : null;
  const metadataTitle = stringOrNull(metadata.sessionTitle);
  return {
    id: row.id,
    source: row.source as OllamaOperationSource,
    model: row.name ?? '',
    temperature: numberFromJson(metadata.temperature),
    systemPrompt: stringOrNull(metadata.systemPrompt),
    requestBody: metadata.requestBody ?? null,
    responseBody: metadata.responseBody ?? null,
    metadata: metadata.metadata ?? null,
    statusCode: numberFromJson(metadata.statusCode),
    errorMessage: stringOrNull(metadata.errorMessage),
    sessionId,
    sessionTitle: titleFromMap ?? metadataTitle,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

function asRecord(value: Prisma.JsonValue|null|undefined) {
  if (value && typeof value === 'object' && !Array.isArray(value))
    return value as Record<string, unknown>;
  return {} as Record<string, unknown>;
}

function getActorSessionTitle(actor: {metadata: Prisma.JsonValue|null}) {
  const metadata = asRecord(actor.metadata);
  return stringOrNull(metadata.title);
}

function stringOrNull(value: unknown) {
  if (typeof value === 'string') return value;
  return null;
}

function numberFromJson(value: unknown) {
  const numeric = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(numeric)) return null;
  return numeric;
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
