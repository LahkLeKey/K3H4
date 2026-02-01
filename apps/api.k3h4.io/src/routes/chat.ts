import {ChatRole, Entity, Prisma, PrismaClient,} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {ACTOR_TYPES, ENTITY_KINDS} from '../lib/actor-entity-constants';

import {recordOllamaOperation} from './ollama-operations';
import {withTelemetryBase} from './telemetry';
import type {RecordTelemetryFn} from './types';

const CHAT_ACTOR_LABEL = 'Chat Session';
const CHAT_ACTOR_SOURCE = 'k3h4-chat';
const CHAT_MESSAGE_SOURCE = 'k3h4-chat';
const ActorType = ACTOR_TYPES;
const EntityKind = ENTITY_KINDS;
const CHAT_SESSION_ACTOR_TYPE = ActorType.CHAT_SESSION;
const CHAT_HISTORY_LIMIT =
    clampNumber(Number(process.env.OLLAMA_CHAT_HISTORY_LIMIT ?? 32), 32, 8, 64);
const DEFAULT_MODEL = 'llama3.2:1b';
const DEFAULT_TEMPERATURE =
    clampFloat(Number(process.env.OLLAMA_CHAT_TEMPERATURE ?? NaN), 0.2, 0, 1);
const OLLAMA_BASE_URL = resolveOllamaBaseUrl();
const OLLAMA_CHAT_URL = `${OLLAMA_BASE_URL}/api/chat`;
type SessionMetadataRecord = {
  title: string|null; systemPrompt: string | null; model: string | null;
  temperature: number | null;
  metadata: unknown | null;
};

type SessionMetadataPatch = Partial<SessionMetadataRecord>;

type ChatMessageResponse = {
  id: string; role: ChatRole; content: string; metadata: unknown | null;
  createdAt: string;
};

type ChatHistoryEntry = {
  role: ChatRole; content: string; createdAt: Date;
};

const operationsListSchema = {
  querystring: {
    type: 'object',
    properties: {
      limit: {type: 'number', minimum: 1, maximum: 100},
    },
  },
};

export function registerChatRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  const authenticate = server.authenticate;

  server.get(
      '/chat/sessions',
      {preHandler: [authenticate]},
      async (request) => {
        const telemetry = withTelemetryBase(recordTelemetry, request);
        const query = request.query as {limit?: string | number | null};
        const limit = clampNumber(
            typeof query.limit === 'number' ? query.limit :
                                              Number(query.limit ?? NaN),
            16, 5, 50);
        const userId = (request.user as {sub: string}).sub;
        const actors = await prisma.actor.findMany({
          where: {userId, type: CHAT_SESSION_ACTOR_TYPE},
          orderBy: {updatedAt: 'desc'},
          take: limit,
          select: {id: true, metadata: true, createdAt: true, updatedAt: true},
        });
        const actorIds = actors.map((actor) => actor.id);
        const countRecords = actorIds.length ? await prisma.entity.groupBy({
          by: ['actorId'],
          where: {
            actorId: {in : actorIds},
            kind: EntityKind.CHAT_MESSAGE,
          },
          _count: {_all: true},
        }) :
                                               [];
        const countMap = new Map(
            countRecords.map((row) => [row.actorId, row._count._all ?? 0]));
        const lastMessageMap = new Map<string, ChatHistoryEntry|null>();
        await Promise.all(actorIds.map(async (actorId) => {
          const entity = await prisma.entity.findFirst({
            where: {actorId, kind: EntityKind.CHAT_MESSAGE},
            orderBy: {createdAt: 'desc'},
            select: {id: true, metadata: true, createdAt: true},
          });
          lastMessageMap.set(
              actorId, entity ? entityToHistoryEntry(entity) : null);
        }));
        await telemetry({
          eventType: 'chat.sessions.list',
          source: 'chat',
          payload: {count: actors.length, limit},
        });
        return {
          sessions: actors.map(
              (actor) =>
                  mapActorToSessionSummary(actor, countMap, lastMessageMap)),
        };
      },
  );

  server.get(
      '/chat/models',
      {preHandler: [authenticate]},
      async (request) => {
        const telemetry = withTelemetryBase(recordTelemetry, request);
        const models = ['llama3.2:1b'];
        await telemetry({
          eventType: 'chat.models.list',
          source: 'chat',
          payload: {count: models.length},
        });
        return {models};
      },
  );

  server.post(
      '/chat/sessions',
      {preHandler: [authenticate]},
      async (request) => {
        const telemetry = withTelemetryBase(recordTelemetry, request);
        const body = request.body as {
          title?: string|null;
          systemPrompt?: string|null;
          model?: string|null;
          temperature?: number|null;
        }
        |undefined;
        const userId = (request.user as {sub: string}).sub;
        const sanitizedTitle = safeTrim(body?.title);
        const sanitizedPrompt = safeTrim(body?.systemPrompt);
        const modelOverride = normalizeModel(body?.model);
        const temperatureOverride = typeof body?.temperature === 'number' ?
            clampFloat(body.temperature, DEFAULT_TEMPERATURE) :
            null;
        const actor = await prisma.actor.create({
          data: {
            userId,
            type: CHAT_SESSION_ACTOR_TYPE,
            label: sanitizedTitle ?? CHAT_ACTOR_LABEL,
            source: CHAT_ACTOR_SOURCE,
            metadata: buildSessionMetadata({
              title: sanitizedTitle,
              systemPrompt: sanitizedPrompt,
              model: modelOverride,
              temperature: temperatureOverride,
              metadata: null,
            }),
          },
        });
        await telemetry({
          eventType: 'chat.session.create',
          source: 'chat',
          payload: {sessionId: actor.id, hasPrompt: Boolean(sanitizedPrompt)},
        });
        return {
          session: mapActorToSessionSummary(actor, new Map(), new Map()),
        };
      },
  );

  server.get(
      '/chat/sessions/:sessionId/messages',
      {preHandler: [authenticate]},
      async (request, reply) => {
        const telemetry = withTelemetryBase(recordTelemetry, request);
        const params = request.params as {sessionId: string};
        const userId = (request.user as {sub: string}).sub;
        const actor = await prisma.actor.findFirst({
          where: {id: params.sessionId, userId, type: CHAT_SESSION_ACTOR_TYPE},
          select: {id: true, metadata: true, createdAt: true, updatedAt: true},
        });
        if (!actor) {
          return reply.status(404).send({error: 'Session not found'});
        }
        const query = request.query as {limit?: string | number | null};
        const limit = clampNumber(
            typeof query.limit === 'number' ? query.limit :
                                              Number(query.limit ?? NaN),
            200, 1, 500);
        const rawMessages = await prisma.entity.findMany({
          where: {actorId: actor.id, kind: EntityKind.CHAT_MESSAGE},
          orderBy: {createdAt: 'desc'},
          take: limit,
          select: {id: true, metadata: true, createdAt: true},
        });
        const ordered = rawMessages.reverse().map(
            (entity) => mapEntityToChatMessage(entity));
        await telemetry({
          eventType: 'chat.messages.list',
          source: 'chat',
          payload: {sessionId: actor.id, limit, fetched: ordered.length},
        });
        const metadata = getSessionMetadata(actor.metadata);
        return {
          session: {
            id: actor.id,
            title: metadata.title,
            systemPrompt: metadata.systemPrompt,
            model: metadata.model ?? DEFAULT_MODEL,
            temperature: metadata.temperature,
            metadata: metadata.metadata,
            createdAt: actor.createdAt.toISOString(),
            updatedAt: actor.updatedAt.toISOString(),
            messageCount: ordered.length,
            lastMessage: ordered.length ? ordered[ordered.length - 1] : null,
          },
          messages: ordered,
        };
      },
  );

  server.post(
      '/chat/sessions/:sessionId/messages',
      {preHandler: [authenticate]},
      async (request, reply) => {
        const telemetry = withTelemetryBase(recordTelemetry, request);
        const params = request.params as {sessionId: string};
        const body = request.body as {
          message?: string;
          systemPrompt?: string|null;
          model?: string|null;
          temperature?: number|null;
          metadata?: unknown|null;
        }
        |undefined;
        const userId = (request.user as {sub: string}).sub;
        const text =
            typeof body?.message === 'string' ? body.message.trim() : '';
        if (!text) {
          return reply.status(400).send({error: 'Message is required'});
        }
        const actor = await prisma.actor.findFirst({
          where: {id: params.sessionId, userId, type: CHAT_SESSION_ACTOR_TYPE},
          select: {
            id: true,
            metadata: true,
            createdAt: true,
            updatedAt: true,
          },
        });
        if (!actor) {
          return reply.status(404).send({error: 'Session not found'});
        }
        const metadataRecord = getSessionMetadata(actor.metadata);
        const model = normalizeModel(body?.model ?? metadataRecord.model);
        const temperature = clampFloat(
            body?.temperature ?? metadataRecord.temperature ??
                DEFAULT_TEMPERATURE,
            DEFAULT_TEMPERATURE, 0, 1);
        const sanitizedSystemPrompt = typeof body?.systemPrompt === 'string' &&
                body.systemPrompt.trim().length ?
            body.systemPrompt.trim() :
            null;
        const historyEntities = await prisma.entity.findMany({
          where: {actorId: actor.id, kind: EntityKind.CHAT_MESSAGE},
          orderBy: {createdAt: 'desc'},
          take: CHAT_HISTORY_LIMIT,
          select: {id: true, metadata: true, createdAt: true},
        });
        const userMessageEntity = await prisma.entity.create({
          data: {
            actorId: actor.id,
            kind: EntityKind.CHAT_MESSAGE,
            source: CHAT_MESSAGE_SOURCE,
            metadata: buildMessageMetadata({
              role: ChatRole.USER,
              content: text,
              metadata: body?.metadata ?? null,
            }),
          },
        });
        const combinedHistory = [
          {
            role: ChatRole.USER,
            content: text,
            createdAt: userMessageEntity.createdAt
          },
          ...historyEntities.map((entity) => entityToHistoryEntry(entity)),
        ];
        const conversation = combinedHistory.slice(0, CHAT_HISTORY_LIMIT)
                                 .reverse()
                                 .map((entry) => ({
                                        role: toOllamaRole(entry.role),
                                        content: entry.content,
                                      }));
        const systemPromptEntry =
            sanitizedSystemPrompt ?? metadataRecord.systemPrompt;
        const messagesForOllama = [
          ...(systemPromptEntry ?
                  [{role: 'system', content: systemPromptEntry}] :
                  []),
          ...conversation,
        ];
        const requestBody = {
          model,
          temperature,
          messages: messagesForOllama,
          stream: false,
        };
        let responseBody: unknown = {};
        let statusCode: number|null = null;
        let errorMessage: string|null = null;
        let success = false;
        let assistantMessageEntity: Entity|null = null;
        try {
          const response = await fetch(OLLAMA_CHAT_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody),
          });
          statusCode = response.status;
          const textPayload = await response.text();
          responseBody = textPayload ? safeParseJson(textPayload) : {};
          if (!response.ok) {
            errorMessage = textPayload || `Ollama responded ${response.status}`;
            throw new Error(errorMessage);
          }
          const assistantContent = extractAssistantContent(responseBody);
          assistantMessageEntity = await prisma.entity.create({
            data: {
              actorId: actor.id,
              kind: EntityKind.CHAT_MESSAGE,
              source: CHAT_MESSAGE_SOURCE,
              metadata: buildMessageMetadata({
                role: ChatRole.ASSISTANT,
                content: assistantContent,
              }),
            },
          });
          const nextTitle = metadataRecord.title ?? deriveSessionTitle(text);
          const metadataPatch: SessionMetadataPatch = {
            model,
            temperature,
          };
          if (!metadataRecord.title) {
            metadataPatch.title = nextTitle;
          }
          if (sanitizedSystemPrompt !== null) {
            metadataPatch.systemPrompt = sanitizedSystemPrompt;
          }
          const updatedActor = await prisma.actor.update({
            where: {id: actor.id},
            data: {
              label: metadataRecord.title ? undefined :
                                            nextTitle ?? CHAT_ACTOR_LABEL,
              metadata: mergeSessionMetadata(actor.metadata, metadataPatch),
            },
            select: {createdAt: true, updatedAt: true, metadata: true},
          });
          const messageCount = await prisma.entity.count({
            where: {actorId: actor.id, kind: EntityKind.CHAT_MESSAGE},
          });
          const finalMetadata = getSessionMetadata(updatedActor.metadata);
          const lastMessage = assistantMessageEntity ?
              mapEntityToChatMessage(assistantMessageEntity) :
              null;
          await telemetry({
            eventType: 'chat.message.send',
            source: 'chat',
            payload: {
              sessionId: actor.id,
              model,
              temperature,
              systemPrompt: Boolean(systemPromptEntry),
            },
          });
          success = true;
          return {
            message: assistantMessageEntity ?
                mapEntityToChatMessage(assistantMessageEntity) :
                null,
            session: {
              id: actor.id,
              title: finalMetadata.title,
              systemPrompt: finalMetadata.systemPrompt,
              model,
              temperature,
              metadata: finalMetadata.metadata,
              createdAt: actor.createdAt.toISOString(),
              updatedAt: updatedActor.updatedAt.toISOString(),
              messageCount,
              lastMessage,
            },
          };
        } catch (err) {
          errorMessage = errorMessage ??
              (err instanceof Error ? err.message : 'Chat request failed');
          await telemetry({
            eventType: 'chat.message.send',
            source: 'chat',
            payload: {
              sessionId: actor.id,
              model,
              temperature,
              systemPrompt: Boolean(systemPromptEntry),
            },
            error: true,
          });
          request.log.error(
              {err, sessionId: actor.id}, 'chat message delivery failed');
          return reply.status(502).send({
            error: err instanceof Error ? err.message : 'Chat request failed'
          });
        } finally {
          try {
            await recordOllamaOperation({
              prisma,
              userId,
              source: 'chat',
              sessionId: actor.id,
              model,
              temperature,
              systemPrompt: systemPromptEntry,
              requestBody,
              responseBody,
              statusCode,
              errorMessage: success ? null : errorMessage,
              metadata: {
                userMessage: text,
                historyLength: messagesForOllama.length,
                hasSystemPrompt: Boolean(systemPromptEntry),
                sessionTitle: metadataRecord.title,
              },
            });
          } catch (recordErr) {
            request.log.warn(
                {err: recordErr}, 'failed to log Ollama chat operation');
          }
        }
      },
  );

  server.get(
      '/chat/operations',
      {preHandler: [authenticate], schema: operationsListSchema},
      () => {
        return {operations: []};
      },
  );
}

function mapActorToSessionSummary(
    actor: {
      id: string; metadata: Prisma.JsonValue | null; createdAt: Date;
      updatedAt: Date;
    },
    countMap: Map<string, number>,
    lastMessageMap: Map<string, ChatHistoryEntry|null>) {
  const metadata = getSessionMetadata(actor.metadata);
  const lastMessage = lastMessageMap.get(actor.id);
  return {
    id: actor.id,
    title: metadata.title,
    systemPrompt: metadata.systemPrompt,
    model: metadata.model ?? DEFAULT_MODEL,
    temperature: metadata.temperature,
    metadata: metadata.metadata,
    createdAt: actor.createdAt.toISOString(),
    updatedAt: actor.updatedAt.toISOString(),
    messageCount: countMap.get(actor.id) ?? 0,
    lastMessage: lastMessage ? {
      id: '',
      role: lastMessage.role,
      content: lastMessage.content,
      metadata: null,
      createdAt: lastMessage.createdAt.toISOString(),
    } :
                               null,
  };
}

function entityToHistoryEntry(row: {
  id: string; metadata: Prisma.JsonValue | null; createdAt: Date
}): ChatHistoryEntry {
  const record = asRecord(row.metadata);
  return {
    role: stringToChatRole(record.role) ?? ChatRole.USER,
    content: stringOrNull(record.content) ?? '',
    createdAt: row.createdAt,
  };
}

function mapEntityToChatMessage(row: {
  id: string; metadata: Prisma.JsonValue | null; createdAt: Date;
}): ChatMessageResponse {
  const record = asRecord(row.metadata);
  const role = stringToChatRole(record.role) ?? ChatRole.USER;
  return {
    id: row.id,
    role,
    content: stringOrNull(record.content) ?? '',
    metadata: record.metadata ?? null,
    createdAt: row.createdAt.toISOString(),
  };
}

function buildMessageMetadata(
    params: {role: ChatRole; content: string; metadata?: unknown | null;}):
    Prisma.InputJsonObject {
  return pruneJsonObject({
           role: toInputJsonValue(params.role.toLowerCase()),
           content: toInputJsonValue(params.content),
           metadata: toInputJsonValue(params.metadata),
         }) ??
      {};
}

function getSessionMetadata(metadata: Prisma.JsonValue|null):
    SessionMetadataRecord {
  const record = asRecord(metadata);
  return {
    title: stringOrNull(record.title),
    systemPrompt: stringOrNull(record.systemPrompt),
    model: stringOrNull(record.model),
    temperature: numberFromJson(record.temperature),
    metadata: record.metadata ?? null,
  };
}

function buildSessionMetadata(params: SessionMetadataRecord):
    Prisma.InputJsonObject {
  return pruneJsonObject({
           title: toInputJsonValue(params.title),
           systemPrompt: toInputJsonValue(params.systemPrompt),
           model: toInputJsonValue(params.model),
           temperature: toInputJsonValue(params.temperature),
           metadata: toInputJsonValue(params.metadata),
         }) ??
      {};
}

function mergeSessionMetadata(
    base: Prisma.JsonValue|null|undefined,
    patch: SessionMetadataPatch): Prisma.InputJsonObject {
  const existing = asRecord(base);
  const next = {...existing} as Record<string, Prisma.InputJsonValue|undefined>;
  if (patch.title !== undefined) next.title = toInputJsonValue(patch.title);
  if (patch.systemPrompt !== undefined)
    next.systemPrompt = toInputJsonValue(patch.systemPrompt);
  if (patch.model !== undefined) next.model = toInputJsonValue(patch.model);
  if (patch.temperature !== undefined)
    next.temperature = toInputJsonValue(patch.temperature);
  if (patch.metadata !== undefined)
    next.metadata = toInputJsonValue(patch.metadata);
  return pruneJsonObject(next) ?? {};
}

function stringToChatRole(value: unknown): ChatRole|null {
  if (typeof value !== 'string') return null;
  const normalized = value.toUpperCase();
  if (normalized === ChatRole.USER || normalized === ChatRole.ASSISTANT ||
      normalized === ChatRole.SYSTEM) {
    return normalized as ChatRole;
  }
  return null;
}

function asRecord(value: Prisma.JsonValue|null|undefined):
    Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value))
    return value as Record<string, unknown>;
  return {};
}

function stringOrNull(value: unknown): string|null {
  if (typeof value === 'string') return value;
  return null;
}

function numberFromJson(value: unknown) {
  const numeric = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(numeric)) return null;
  return numeric;
}

function toInputJsonValue(value: unknown|null|undefined): Prisma.InputJsonValue|
    undefined {
  if (value === undefined) return undefined;
  if (value === null)
    return Prisma.JsonNull as unknown as Prisma.InputJsonValue;
  return value as Prisma.InputJsonValue;
}

function pruneJsonObject(
    value: Record<string, Prisma.InputJsonValue|undefined>):
    Prisma.InputJsonObject|null {
  const entries = Object.entries(value).filter(([, val]) => val !== undefined);
  if (!entries.length) return null;
  return Object.fromEntries(entries) as Prisma.InputJsonObject;
}

function clampNumber(
    value: number, fallback: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, Math.floor(value)));
}

function clampFloat(value: number, fallback: number, min = 0, max = 1): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, value));
}

function resolveOllamaBaseUrl() {
  const base = process.env.OLLAMA_URL?.trim();
  if (!base) {
    throw new Error('OLLAMA_URL is required to reach the Ollama sidecar');
  }
  return base.replace(/\/+$/, '');
}

function deriveSessionTitle(message: string): string {
  const trimmed = message.trim();
  if (!trimmed) return 'New chat';
  return trimmed.length <= 48 ? trimmed : `${trimmed.slice(0, 45)}…`;
}

type OllamaRole = 'system'|'user'|'assistant';

function toOllamaRole(role: ChatRole): OllamaRole {
  return role.toLowerCase() as OllamaRole;
}

function safeTrim(value?: string|null) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length ? trimmed : null;
}

function safeParseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function extractAssistantContent(payload: unknown): string {
  const record = payload as Record<string, unknown>;
  const choice = Array.isArray(record.choices) && record.choices.length ?
      record.choices[0] :
      payload;
  const assistant = (choice as Record<string, unknown>)?.message ?? choice;
  const flattened = flattenMessageContent(assistant);
  if (flattened) return flattened;
  throw new Error('Ollama returned an unexpected payload');
}

function flattenMessageContent(value: unknown): string|null {
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value))
    return value.map(flattenMessageContent).filter(Boolean).join('');
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const candidate =
        record.content ?? record.text ?? record.message ?? record.delta;
    if (candidate !== undefined) return flattenMessageContent(candidate);
    const choices = record.choices;
    if (Array.isArray(choices) && choices.length) {
      return flattenMessageContent(choices[0]);
    }
  }
  return null;
}

function normalizeModel(value?: string|null): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length ? trimmed : DEFAULT_MODEL;
}
