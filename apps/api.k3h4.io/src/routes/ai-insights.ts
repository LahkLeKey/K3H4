import {type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';
import * as z from 'zod';

import {createAiOperationsKit, type AiInsight, type AiOperationsKit} from '../kits/ai-operations';
import {createOllamaProvider} from '../kits/ai-operations/ollama-provider';
import {AuthHeaderSchema, IntegerLikeSchema, StandardErrorResponses, toJsonSchema, withExamples} from '../lib/schemas/openapi';
import {createAiInsight, loadAiInsights} from '../services/ai-insight-actor';

import {recordOllamaOperation} from './ollama-operations';
import {withTelemetryBase} from './telemetry';
import type {RecordTelemetryFn} from './types';

type InsightsListQuery = {
  limit?: string|number|null;
  targetType?: string | null;
};

type InsightCreateBody = {
  description?: string;
  targetType?: string | null;
  targetId?: string | null;
  targetLabel?: string | null;
  metadata?: unknown;
  payload?: unknown;
  model?: string | null;
  systemPrompt?: string | null;
};

const DEFAULT_LIST_LIMIT = 20;
const MAX_LIST_LIMIT = 100;
const DEFAULT_MODEL = process.env.OLLAMA_INSIGHT_MODEL?.trim() || 'llama3.2:1b';

const InsightSchema = z.object({
                         id: z.string().min(1),
                         description: z.string().min(1),
                         targetType: z.string().nullable(),
                         targetId: z.string().nullable(),
                         targetLabel: z.string().nullable(),
                         metadata: z.unknown().nullable(),
                         payload: z.unknown().nullable(),
                         createdAt: z.string().min(1),
                         updatedAt: z.string().min(1),
                       }).passthrough();

const insightsListSchema = {
  summary: 'List AI insights',
  description: 'Returns recent AI insights for the authenticated user.',
  operationId: 'ai_insight_list',
  tags: ['ai'],
  headers: toJsonSchema(AuthHeaderSchema, 'AuthHeader'),
  security: [{bearerAuth: []}],
  querystring: toJsonSchema(
      z.object({
         limit: IntegerLikeSchema
                    .describe(
                        `Max items to return (default ${DEFAULT_LIST_LIMIT})`)
                    .optional(),
         targetType: z.string().min(1).optional(),
       }).strict(),
      'InsightsListQuery'),
  response: {
    200: withExamples(
        toJsonSchema(
            z.object({
               insights: z.array(InsightSchema),
             }).strict(),
            'InsightsListResponse'),
        [{
          insights: [{
            id: 'ai_insight_01',
            description: 'Customer sentiment improved after shipment arrived.',
            targetType: 'freight_load',
            targetId: 'load_123',
            targetLabel: 'Inbound PO #4492',
            metadata: {source: 'ollama'},
            payload: {score: 0.82},
            createdAt: '2026-02-01T10:15:30.000Z',
            updatedAt: '2026-02-01T10:15:30.000Z',
          }],
        }]),
    ...StandardErrorResponses,
  },
};

const insightCreateSchema = {
  summary: 'Create an AI insight',
  description:
      'Creates a new AI insight and optionally synthesizes a description.',
  operationId: 'ai_insight_create',
  tags: ['ai'],
  headers: toJsonSchema(AuthHeaderSchema, 'AuthHeader'),
  security: [{bearerAuth: []}],
  body: toJsonSchema(
      z.object({
         description: z.string().min(1),
         targetType: z.string().min(1).optional(),
         targetId: z.string().min(1).optional(),
         targetLabel: z.string().min(1).optional(),
         metadata: z.unknown().optional(),
         payload: z.unknown().optional(),
         model: z.string().min(1).optional().default(DEFAULT_MODEL),
         systemPrompt: z.string().min(1).optional(),
       }).strict(),
      'InsightCreateBody'),
  response: {
    200: withExamples(
        toJsonSchema(
            z.object({insight: InsightSchema}).strict(),
            'InsightCreateResponse'),
        [{
          insight: {
            id: 'ai_insight_02',
            description: 'Order backlog reduced after staffing changes.',
            targetType: 'staffing_engagement',
            targetId: 'eng_456',
            targetLabel: 'Spring engagement',
            metadata: {model: DEFAULT_MODEL},
            payload: {delta: -12},
            createdAt: '2026-02-01T11:22:00.000Z',
            updatedAt: '2026-02-01T11:22:00.000Z',
          },
        }]),
    ...StandardErrorResponses,
  },
};

export function registerAiInsightsRoutes(
    server: FastifyInstance,
    prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn,
    injectedKit?: AiOperationsKit,
) {
  const authenticate = server.authenticate;
  const kit = injectedKit ?? createAiOperationsKit({
    provider: createOllamaProvider({
      baseUrl: process.env.OLLAMA_URL?.trim() ?? '',
    }),
    persistence: {
      listInsights: (userId, targetType, limit) =>
          loadAiInsights(prisma, userId, targetType, limit),
      createInsight: (input) => createAiInsight(prisma, input),
    },
    recordOperation: (record) => recordOllamaOperation({prisma, ...record}),
    warn: (error, message) => server.log.warn({err: error}, message),
  });

  server.get(
      '/ai/insights',
      {
        preHandler: [authenticate],
        schema: insightsListSchema,
      },
      async (request) => {
        const telemetry = withTelemetryBase(recordTelemetry, request);
        const userId = (request.user as {sub: string}).sub;
        const query = request.query as InsightsListQuery;
        const limit = clampLimit(query.limit);
        const insights = await kit.listInsights(
          userId, query.targetType ?? null, limit);
        await telemetry({
          eventType: 'ai.insights.list',
          source: 'ai',
          payload: {
            count: insights.length,
            limit,
            targetType: query.targetType ?? null
          },
        });
        return {insights: insights.map(mapInsight)};
      },
  );

  server.post(
      '/ai/insights',
      {
        preHandler: [authenticate],
        schema: insightCreateSchema,
      },
      async (request, reply) => {
        const telemetry = withTelemetryBase(recordTelemetry, request);
        const body = request.body as InsightCreateBody;
        const userId = (request.user as {sub: string}).sub;
        const descriptionDraft =
            typeof body.description === 'string' ? body.description.trim() : '';
        if (!descriptionDraft) {
          return reply.status(400).send({error: 'description is required'});
        }
        const targetType = normalizeString(body.targetType);
        const targetId = normalizeString(body.targetId);
        const targetLabel = normalizeString(body.targetLabel);
        const model = normalizeModel(body.model);
        const systemPrompt = body.systemPrompt?.trim();
        const {insight, aiGenerated} = await kit.createInsight({
          userId,
          description: descriptionDraft,
          targetType,
          targetId,
          targetLabel,
          metadata: body.metadata,
          payload: body.payload,
          model,
          systemPrompt,
        });
        await telemetry({
          eventType: 'ai.insight.create',
          source: 'ai',
          payload: {
            insightId: insight.id,
            targetType: insight.targetType ?? null,
            hasPayload: insight.payload !== null,
            aiGenerated,
          },
        });
        return {insight: mapInsight(insight)};
      },
  );
}

function clampLimit(value: string|number|null|undefined): number {
  const numeric = typeof value === 'number' ? value : Number(value ?? NaN);
  if (!Number.isFinite(numeric)) return DEFAULT_LIST_LIMIT;
  return Math.max(1, Math.min(MAX_LIST_LIMIT, Math.floor(numeric)));
}

function normalizeString(value?: string|null): string|null {
  const trimmed = value?.trim();
  return trimmed && trimmed.length ? trimmed : null;
}

function mapInsight(insight: AiInsight) {
  return {
    id: insight.id,
    description: insight.description,
    targetType: insight.targetType,
    targetId: insight.targetId,
    targetLabel: insight.targetLabel,
    metadata: insight.metadata ?? null,
    payload: insight.payload ?? null,
    createdAt: insight.createdAt.toISOString(),
    updatedAt: insight.updatedAt.toISOString(),
  };
}

function normalizeModel(value?: string|null): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length ? trimmed : DEFAULT_MODEL;
}

function safeParseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
