import {type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';
import * as z from 'zod';

import {ChatSessionNotFoundError, createChatSessionsKit, type ChatMessage, type ChatSessionsKit, type ChatSessionSummary} from '../kits/chat-sessions';
import {createPrismaChatPersistence} from '../kits/chat-sessions/prisma-adapter';
import {createOllamaProvider} from '../kits/ai-operations/ollama-provider';
import {ChatResource, ChatSubresource} from '../lib/openapi/route-kinds';
import {AuthHeaderSchema, ChatRoleSchema, IntegerLikeSchema, makeParamsSchema, makeQuerySchema, StandardErrorResponses, toJsonSchema, withExamples} from '../lib/schemas/openapi';

import {recordOllamaOperation} from './ollama-operations';
import {withTelemetryBase} from './telemetry';
import type {RecordTelemetryFn} from './types';

const CHAT_HISTORY_LIMIT =
    clampNumber(Number(process.env.OLLAMA_CHAT_HISTORY_LIMIT ?? 32), 32, 8, 64);
const DEFAULT_MODEL = 'llama3.2:1b';
const DEFAULT_TEMPERATURE =
    clampFloat(Number(process.env.OLLAMA_CHAT_TEMPERATURE ?? NaN), 0.2, 0, 1);
const SessionSummarySchema =
    z.object({
       id: z.string().min(1),
       title: z.string().nullable(),
       systemPrompt: z.string().nullable(),
       model: z.string().min(1),
       temperature: z.number().nullable().optional(),
       metadata: z.unknown().nullable().optional(),
       createdAt: z.string().min(1),
       updatedAt: z.string().min(1),
       messageCount: z.number().int(),
       lastMessage: z.object({
                       id: z.string().min(1),
                       role: ChatRoleSchema,
                       content: z.string(),
                       metadata: z.unknown().nullable().optional(),
                       createdAt: z.string().min(1),
                     }).nullable(),
     }).passthrough();

const ChatMessageSchema = z.object({
                             id: z.string().min(1),
                             role: ChatRoleSchema,
                             content: z.string(),
                             metadata: z.unknown().nullable().optional(),
                             createdAt: z.string().min(1),
                           }).passthrough();

const chatResourceParamsSchema = makeParamsSchema(
    z.object({
       resource: ChatResource.describe('Chat resource to list'),
     }).strict(),
    'ChatResourceParams');

const chatListQuerySchema = makeQuerySchema(
    z.object({
       limit: IntegerLikeSchema.optional().describe('Max items to return'),
     }).strict(),
    'ChatListQuery', [{limit: 25}]);

const chatAuthSchema = toJsonSchema(AuthHeaderSchema, 'AuthHeader');

const chatListSchema = {
  summary: 'Chat resources list',
  description: 'Lists chat sessions, models, or operations.',
  operationId: 'chat_resource_list',
  tags: ['chat'],
  headers: chatAuthSchema,
  security: [{bearerAuth: []}],
  params: chatResourceParamsSchema,
  querystring: chatListQuerySchema,
  response: {
    200: withExamples(
        toJsonSchema(
            z.object({
               sessions: z.array(SessionSummarySchema).optional(),
               models: z.array(z.string().min(1)).optional(),
               operations: z.array(z.unknown()).optional(),
             }).strict(),
            'ChatResourceListResponse'),
        [{
          sessions: [{
            id: 'sess_01',
            title: 'Store planning',
            systemPrompt: 'Be brief',
            model: DEFAULT_MODEL,
            temperature: DEFAULT_TEMPERATURE,
            metadata: null,
            createdAt: '2026-02-01T09:00:00.000Z',
            updatedAt: '2026-02-01T09:10:00.000Z',
            messageCount: 3,
            lastMessage: {
              id: 'msg_03',
              role: 'assistant',
              content: 'Ready to help.',
              metadata: null,
              createdAt: '2026-02-01T09:10:00.000Z',
            },
          }],
        }]),
    ...StandardErrorResponses,
  },
};

const chatCreateSessionSchema = {
  summary: 'Create a chat session',
  description: 'Creates a new chat session and stores preferences.',
  operationId: 'chat_session_create',
  tags: ['chat'],
  headers: chatAuthSchema,
  security: [{bearerAuth: []}],
  params: toJsonSchema(
      z.object({resource: z.enum(['sessions'])}).strict(), 'ChatCreateParams'),
  body: toJsonSchema(
      z.object({
         title: z.string().min(1).optional(),
         systemPrompt: z.string().min(1).optional(),
         model: z.string().min(1).optional(),
         temperature: z.number().min(0).max(1).optional(),
       }).strict(),
      'ChatCreateSessionBody'),
  response: {
    200: withExamples(
        toJsonSchema(
            z.object({
               session: SessionSummarySchema,
             }).strict(),
            'ChatCreateSessionResponse'),
        [{
          session: {
            id: 'sess_02',
            title: 'Logistics follow-up',
            systemPrompt: null,
            model: DEFAULT_MODEL,
            temperature: DEFAULT_TEMPERATURE,
            metadata: null,
            createdAt: '2026-02-01T10:00:00.000Z',
            updatedAt: '2026-02-01T10:00:00.000Z',
            messageCount: 0,
            lastMessage: null,
          },
        }]),
    ...StandardErrorResponses,
  },
};

const chatMessagesParamsSchema = makeParamsSchema(
    z.object({
       sessionId: z.string().min(1).describe('Chat session id'),
       subresource: ChatSubresource.describe('Subresource type'),
     }).strict(),
    'ChatMessagesParams');

const chatListMessagesSchema = {
  summary: 'List chat messages',
  description: 'Fetches recent messages for a chat session.',
  operationId: 'chat_message_list',
  tags: ['chat'],
  headers: chatAuthSchema,
  security: [{bearerAuth: []}],
  params: chatMessagesParamsSchema,
  querystring: chatListQuerySchema,
  response: {
    200: withExamples(
        toJsonSchema(
            z.object({
               session: SessionSummarySchema,
               messages: z.array(ChatMessageSchema),
             }).strict(),
            'ChatMessageListResponse'),
        [{
          session: {
            id: 'sess_01',
            title: 'Store planning',
            systemPrompt: 'Be brief',
            model: DEFAULT_MODEL,
            temperature: DEFAULT_TEMPERATURE,
            metadata: null,
            createdAt: '2026-02-01T09:00:00.000Z',
            updatedAt: '2026-02-01T09:10:00.000Z',
            messageCount: 2,
            lastMessage: null,
          },
          messages: [{
            id: 'msg_01',
            role: 'user',
            content: 'Summarize today\'s plan.',
            metadata: null,
            createdAt: '2026-02-01T09:01:00.000Z',
          }],
        }]),
    ...StandardErrorResponses,
  },
};

const chatSendMessageSchema = {
  summary: 'Send a chat message',
  description:
      'Sends a message to a chat session and returns the assistant reply.',
  operationId: 'chat_message_send',
  tags: ['chat'],
  headers: chatAuthSchema,
  security: [{bearerAuth: []}],
  params: chatMessagesParamsSchema,
  body: toJsonSchema(
      z.object({
         message: z.string().min(1),
         systemPrompt: z.string().min(1).optional(),
         model: z.string().min(1).optional(),
         temperature: z.number().min(0).max(1).optional(),
         metadata: z.unknown().optional(),
       }).strict(),
      'ChatSendMessageBody'),
  response: {
    200: withExamples(
        toJsonSchema(
            z.object({
               session: SessionSummarySchema,
               message: ChatMessageSchema,
               assistant: ChatMessageSchema,
             }).strict(),
            'ChatSendMessageResponse'),
        [{
          session: {
            id: 'sess_01',
            title: 'Store planning',
            systemPrompt: 'Be brief',
            model: DEFAULT_MODEL,
            temperature: DEFAULT_TEMPERATURE,
            metadata: null,
            createdAt: '2026-02-01T09:00:00.000Z',
            updatedAt: '2026-02-01T09:10:00.000Z',
            messageCount: 2,
            lastMessage: null,
          },
          message: {
            id: 'msg_user',
            role: 'user',
            content: 'Summarize today\'s plan.',
            metadata: null,
            createdAt: '2026-02-01T09:11:00.000Z',
          },
          assistant: {
            id: 'msg_assistant',
            role: 'assistant',
            content: 'Today: ship, restock, brief team.',
            metadata: null,
            createdAt: '2026-02-01T09:11:05.000Z',
          },
        }]),
    ...StandardErrorResponses,
  },
};

export function registerChatRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn, injectedKit?: ChatSessionsKit) {
  const authenticate = server.authenticate;
  const kit = injectedKit ?? createChatSessionsKit({
    persistence: createPrismaChatPersistence(prisma),
    provider: createOllamaProvider({baseUrl: process.env.OLLAMA_URL?.trim() ?? ''}),
    recordOperation: (record) => recordOllamaOperation({prisma, ...record}),
    warn: (error, message) => server.log.warn({err: error}, message),
    defaultModel: DEFAULT_MODEL,
    defaultTemperature: DEFAULT_TEMPERATURE,
    historyLimit: CHAT_HISTORY_LIMIT,
  });
  const handleListSessions = async (request: any) => {
    const telemetry = withTelemetryBase(recordTelemetry, request);
    const query = request.query as {limit?: string | number | null};
    const limit = clampNumber(
        typeof query.limit === 'number' ? query.limit :
                                          Number(query.limit ?? NaN),
        16, 5, 50);
    const userId = (request.user as {sub: string}).sub;
    const sessions = await kit.listSessions(userId, limit);
    await telemetry({
      eventType: 'chat.sessions.list',
      source: 'chat',
      payload: {count: sessions.length, limit},
    });
    return {sessions: sessions.map(mapSession)};
  };

  const handleListModels = async (request: any) => {
    const telemetry = withTelemetryBase(recordTelemetry, request);
    const models = kit.listModels();
    await telemetry({
      eventType: 'chat.models.list',
      source: 'chat',
      payload: {count: models.length},
    });
    return {models};
  };

  const handleCreateSession = async (request: any) => {
    const telemetry = withTelemetryBase(recordTelemetry, request);
    const body = request.body as {
      title?: string|null;
      systemPrompt?: string|null;
      model?: string|null;
      temperature?: number|null;
    }
    |undefined;
    const userId = (request.user as {sub: string}).sub;
    const session = await kit.createSession({
      userId,
      title: body?.title,
      systemPrompt: body?.systemPrompt,
      model: body?.model,
      temperature: body?.temperature,
    });
    await telemetry({
      eventType: 'chat.session.create',
      source: 'chat',
      payload: {
        sessionId: session.id,
        hasPrompt: Boolean(session.systemPrompt),
      },
    });
    return {session: mapSession(session)};
  };

  const handleListMessages = async (request: any, reply: any) => {
    const telemetry = withTelemetryBase(recordTelemetry, request);
    const params = request.params as {sessionId: string};
    const userId = (request.user as {sub: string}).sub;
    const query = request.query as {limit?: string | number | null};
    const limit = clampNumber(
        typeof query.limit === 'number' ? query.limit :
                                          Number(query.limit ?? NaN),
        200, 1, 500);
    let result;
    try {
      result = await kit.listMessages({
        userId, sessionId: params.sessionId, limit,
      });
    } catch (error) {
      if (error instanceof ChatSessionNotFoundError)
        return reply.status(404).send({error: error.message});
      throw error;
    }
    await telemetry({
      eventType: 'chat.messages.list',
      source: 'chat',
      payload: {
        sessionId: result.session.id,
        limit,
        fetched: result.messages.length,
      },
    });
    return {
      session: mapSession(result.session),
      messages: result.messages.map(mapMessage),
    };
  };

  const handleSendMessage = async (request: any, reply: any) => {
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
    const text = typeof body?.message === 'string' ? body.message.trim() : '';
    if (!text) {
      return reply.status(400).send({error: 'Message is required'});
    }
    try {
      const result = await kit.sendMessage({
        userId,
        sessionId: params.sessionId,
        message: text,
        systemPrompt: body?.systemPrompt,
        model: body?.model,
        temperature: body?.temperature,
        metadata: body?.metadata,
      });
      await telemetry({
        eventType: 'chat.message.send',
        source: 'chat',
        payload: {
          sessionId: result.session.id,
          model: result.session.model,
          temperature: result.session.temperature,
          systemPrompt: Boolean(result.session.systemPrompt),
        },
      });
      const message = mapMessage(result.message);
      return {
        message,
        assistant: message,
        session: mapSession(result.session),
      };
    } catch (error) {
      if (error instanceof ChatSessionNotFoundError)
        return reply.status(404).send({error: error.message});
      await telemetry({
        eventType: 'chat.message.send',
        source: 'chat',
        payload: {
          sessionId: params.sessionId,
          model: body?.model ?? DEFAULT_MODEL,
          temperature: body?.temperature ?? DEFAULT_TEMPERATURE,
          systemPrompt: Boolean(body?.systemPrompt),
        },
        error: true,
      });
      request.log.error(
          {err: error, sessionId: params.sessionId},
          'chat message delivery failed');
      return reply.status(502).send(
          {error: error instanceof Error ? error.message : 'Chat request failed'});
    }
  };

  const handleOperations = () => ({operations: []});

  server.get(
      '/chat/:resource',
      {preHandler: [authenticate], schema: chatListSchema},
      async (request, reply) => {
        const {resource} = request.params as {resource?: string};
        if (resource === 'sessions') return handleListSessions(request);
        if (resource === 'models') return handleListModels(request);
        if (resource === 'operations') return handleOperations();
        return reply.status(404).send({error: 'Resource not found'});
      },
  );

  server.post(
      '/chat/:resource',
      {preHandler: [authenticate], schema: chatCreateSessionSchema},
      async (request, reply) => {
        const {resource} = request.params as {resource?: string};
        if (resource === 'sessions') return handleCreateSession(request);
        return reply.status(404).send({error: 'Resource not found'});
      },
  );

  server.get(
      '/chat/sessions/:sessionId/:subresource',
      {preHandler: [authenticate], schema: chatListMessagesSchema},
      async (request, reply) => {
        const {subresource} = request.params as {subresource?: string};
        if (subresource === 'messages')
          return handleListMessages(request, reply);
        return reply.status(404).send({error: 'Resource not found'});
      },
  );

  server.post(
      '/chat/sessions/:sessionId/:subresource',
      {preHandler: [authenticate], schema: chatSendMessageSchema},
      async (request, reply) => {
        const {subresource} = request.params as {subresource?: string};
        if (subresource === 'messages')
          return handleSendMessage(request, reply);
        return reply.status(404).send({error: 'Resource not found'});
      },
  );
}

function mapSession(session: ChatSessionSummary) {
  return {
    ...session,
    createdAt: session.createdAt.toISOString(),
    updatedAt: session.updatedAt.toISOString(),
    lastMessage: session.lastMessage ? mapMessage(session.lastMessage) : null,
  };
}

function mapMessage(message: ChatMessage) {
  return {...message, createdAt: message.createdAt.toISOString()};
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
