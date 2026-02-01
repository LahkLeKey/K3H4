import {type PrismaClient} from '@prisma/client';
import {type FastifyInstance, type FastifyReply, type FastifyRequest} from 'fastify';
import * as z from 'zod';

import {AuthHeaderSchema, IntegerLikeSchema, StandardErrorResponses, toJsonSchema, withExamples} from '../lib/schemas/openapi';
import {type AiInsightPayload, createAiInsight, loadAiInsights} from '../services/ai-insight-actor';

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
const CRITICAL_SYSTEM_PROMPT =
    'You summarize AI enrichment data for the K3H4 AI tools; focus on the target entity, highlight meaning or state changes, speak plainly, and keep the response under 160 characters when possible.';

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
) {
  const authenticate = server.authenticate;

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
        const insights = await loadAiInsights(
            prisma, userId, query.targetType ?? null, limit);
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
        let synthesizedDescription: string|null = null;
        try {
          synthesizedDescription = await synthesizeInsight(
              {
                model,
                systemPrompt,
                description: descriptionDraft,
                metadata: body.metadata,
                payload: body.payload,
                targetType,
                targetId,
                targetLabel,
              },
              {prisma, userId, log: request.log},
          );
        } catch (err) {
          request.log.warn({err}, 'ai insight synthesis failed');
        }
        const finalDescription =
            synthesizedDescription?.trim() || descriptionDraft;
        const insight = await createAiInsight(prisma, {
          userId,
          description: finalDescription,
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
            aiGenerated: Boolean(synthesizedDescription),
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

function mapInsight(insight: AiInsightPayload) {
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

const OLLAMA_CHAT_URL = `${resolveOllamaBaseUrl()}/api/chat`;

type SynthesizeInsightContext = {
  prisma: PrismaClient; userId: string; log: FastifyRequest['log'];
};

async function synthesizeInsight(
    params: {
      model: string; systemPrompt: string | null | undefined;
      description: string;
      metadata?: unknown;
      payload?: unknown;
      targetType?: string | null;
      targetId?: string | null;
      targetLabel?: string | null;
    },
    context: SynthesizeInsightContext) {
  const systemContent = params.systemPrompt?.trim() || CRITICAL_SYSTEM_PROMPT;
  const userMessage = buildInsightUserMessage(params);
  const requestBody = {
    model: params.model,
    messages: [
      {role: 'system', content: systemContent},
      {role: 'user', content: userMessage},
    ],
    stream: false,
  };
  let responseBody: unknown = {};
  let statusCode: number|null = null;
  let errorMessage: string|null = null;
  let success = false;
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
    const assistant = extractAssistantContent(responseBody);
    success = true;
    return assistant;
  } catch (err) {
    errorMessage = errorMessage ??
        (err instanceof Error ? err.message : 'Ollama request failed');
    throw err;
  } finally {
    try {
      await recordOllamaOperation({
        prisma: context.prisma,
        userId: context.userId,
        source: 'insights',
        model: params.model,
        systemPrompt: systemContent,
        requestBody,
        responseBody,
        statusCode,
        errorMessage: success ? null : errorMessage,
        metadata: {
          targetType: params.targetType ?? null,
          targetId: params.targetId ?? null,
          targetLabel: params.targetLabel ?? null,
          description: params.description,
          metadata: params.metadata ?? null,
          payload: params.payload ?? null,
        },
      });
    } catch (recordErr) {
      context.log.warn(
          {err: recordErr}, 'failed to log Ollama insight operation');
    }
  }
}

function buildInsightUserMessage(params: {
  description: string;
  metadata?: unknown;
  payload?: unknown;
  targetType?: string | null;
  targetId?: string | null;
  targetLabel?: string | null;
}) {
  const targetLine = params.targetType ?
      `${params.targetType}${params.targetId ? ` (${params.targetId})` : ''}` :
                                               'general entity';
  const labelLine = params.targetLabel ? ` – ${params.targetLabel}` : '';
  return [
    `Target: ${targetLine}${labelLine}`,
    `User note: ${params.description}`,
    `Metadata: ${formatValueForPrompt(params.metadata)}`,
    `Payload: ${formatValueForPrompt(params.payload)}`,
    'Generate a concise, human-friendly summary describing what changed or what should be remembered about this entity.',
  ].join('\n\n');
}

function formatValueForPrompt(value: unknown): string {
  if (value === null || value === undefined) return '(not provided)';
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
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
    if (Array.isArray(choices) && choices.length)
      return flattenMessageContent(choices[0]);
  }
  return null;
}

function resolveOllamaBaseUrl(): string {
  const base = process.env.OLLAMA_URL?.trim();
  if (!base) {
    throw new Error('OLLAMA_URL is required to reach the Ollama sidecar');
  }
  return base.replace(/\/+$/, '');
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
