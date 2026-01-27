import {type AiInsight, type PrismaClient} from '@prisma/client';
import {type FastifyInstance, type FastifyReply, type FastifyRequest} from 'fastify';

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

const insightsListSchema = {
  querystring: {
    type: 'object',
    properties: {
      limit: {type: 'number', minimum: 1, maximum: MAX_LIST_LIMIT},
      targetType: {type: 'string'},
    },
  },
};

const insightCreateSchema = {
  body: {
    type: 'object',
    properties: {
      description: {type: 'string', minLength: 1},
      targetType: {type: 'string'},
      targetId: {type: 'string'},
      targetLabel: {type: 'string'},
      metadata: {
        type: ['object', 'array', 'string', 'number', 'boolean', 'null'],
      },
      payload: {
        type: ['object', 'array', 'string', 'number', 'boolean', 'null'],
      },
      model: {type: 'string'},
      systemPrompt: {type: 'string'},
    },
    required: ['description'],
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
        const insights = await prisma.aiInsight.findMany({
          where: {
            userId,
            targetType: query.targetType ?? undefined,
          },
          orderBy: {createdAt: 'desc'},
          take: limit,
        });
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
          synthesizedDescription = await synthesizeInsight({
            model,
            systemPrompt,
            description: descriptionDraft,
            metadata: body.metadata,
            payload: body.payload,
            targetType,
            targetId,
            targetLabel,
          });
        } catch (err) {
          request.log.warn({err}, 'ai insight synthesis failed');
        }
        const finalDescription =
            synthesizedDescription?.trim() || descriptionDraft;
        const insight = await prisma.aiInsight.create({
          data: {
            userId,
            description: finalDescription,
            targetType,
            targetId,
            targetLabel,
            metadata: body.metadata ?? undefined,
            payload: body.payload ?? undefined,
          },
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

function mapInsight(row: AiInsight) {
  return {
    id: row.id,
    description: row.description,
    targetType: row.targetType,
    targetId: row.targetId,
    targetLabel: row.targetLabel,
    metadata: row.metadata ?? null,
    payload: row.payload ?? null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

const OLLAMA_CHAT_URL = `${resolveOllamaBaseUrl()}/api/chat`;

async function synthesizeInsight(params: {
  model: string; systemPrompt: string | null | undefined; description: string;
  metadata?: unknown;
  payload?: unknown;
  targetType?: string | null;
  targetId?: string | null;
  targetLabel?: string | null;
}) {
  const systemContent = params.systemPrompt?.trim() || CRITICAL_SYSTEM_PROMPT;
  const userMessage = buildInsightUserMessage(params);
  const response = await fetch(OLLAMA_CHAT_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      model: params.model,
      messages: [
        {role: 'system', content: systemContent},
        {role: 'user', content: userMessage},
      ],
      stream: false,
    }),
  });
  const textPayload = await response.text();
  if (!response.ok) {
    throw new Error(textPayload || `Ollama responded ${response.status}`);
  }
  const payload = textPayload ? JSON.parse(textPayload) : {};
  return extractAssistantContent(payload);
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
