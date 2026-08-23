import type {OllamaChatRequest, OllamaProvider} from './ollama-provider';
import {OllamaProviderError} from './ollama-provider';

export type AiInsight = {
  id: string;
  description: string;
  targetType: string|null;
  targetId: string|null;
  targetLabel: string|null;
  metadata: unknown|null;
  payload: unknown|null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateAiInsightInput = {
  userId: string;
  description: string;
  targetType: string|null;
  targetId: string|null;
  targetLabel: string|null;
  metadata?: unknown;
  payload?: unknown;
  model: string;
  systemPrompt?: string|null;
};

export type AiInsightPersistence = {
  listInsights(
      userId: string, targetType: string|null, limit: number):
      Promise<AiInsight[]>;
  createInsight(input: CreateAiInsightInput): Promise<AiInsight>;
};

export type AiOperationRecord = {
  userId: string;
  source: 'insights';
  model: string;
  systemPrompt: string|null;
  requestBody: unknown;
  responseBody: unknown;
  statusCode: number|null;
  errorMessage: string|null;
  metadata: unknown;
};

export interface AiOperationsKit {
  listInsights(
      userId: string, targetType: string|null, limit: number):
      Promise<AiInsight[]>;
  createInsight(input: CreateAiInsightInput): Promise<{
    insight: AiInsight;
    aiGenerated: boolean;
  }>;
}

const DEFAULT_SYSTEM_PROMPT =
    'You summarize AI enrichment data for the K3H4 AI tools; focus on the target entity, highlight meaning or state changes, speak plainly, and keep the response under 160 characters when possible.';

export function createAiOperationsKit(dependencies: {
  provider: OllamaProvider;
  persistence: AiInsightPersistence;
  recordOperation(record: AiOperationRecord): Promise<void>;
  warn?(error: unknown, message: string): void;
}): AiOperationsKit {
  return {
    listInsights: (userId, targetType, limit) =>
        dependencies.persistence.listInsights(userId, targetType, limit),

    async createInsight(input) {
      const systemPrompt = input.systemPrompt?.trim() || DEFAULT_SYSTEM_PROMPT;
      const requestBody: OllamaChatRequest = {
        model: input.model,
        messages: [
          {role: 'system', content: systemPrompt},
          {role: 'user', content: buildInsightUserMessage(input)},
        ],
        stream: false,
      };
      let description: string|null = null;
      let responseBody: unknown = {};
      let statusCode: number|null = null;
      let errorMessage: string|null = null;

      try {
        const result = await dependencies.provider.chat(requestBody);
        description = result.content;
        responseBody = result.responseBody;
        statusCode = result.statusCode;
      } catch (error) {
        errorMessage = error instanceof Error ? error.message :
                                                   'Ollama request failed';
        if (error instanceof OllamaProviderError) {
          responseBody = error.details.responseBody;
          statusCode = error.details.statusCode;
        }
        dependencies.warn?.(error, 'ai insight synthesis failed');
      }

      try {
        await dependencies.recordOperation({
          userId: input.userId,
          source: 'insights',
          model: input.model,
          systemPrompt,
          requestBody,
          responseBody,
          statusCode,
          errorMessage,
          metadata: {
            targetType: input.targetType,
            targetId: input.targetId,
            targetLabel: input.targetLabel,
            description: input.description,
            metadata: input.metadata ?? null,
            payload: input.payload ?? null,
          },
        });
      } catch (error) {
        dependencies.warn?.(error, 'failed to log Ollama insight operation');
      }

      const aiGenerated = Boolean(description?.trim());
      const insight = await dependencies.persistence.createInsight({
        ...input,
        description: description?.trim() || input.description,
      });
      return {insight, aiGenerated};
    },
  };
}

function buildInsightUserMessage(input: CreateAiInsightInput) {
  const targetLine = input.targetType ?
      `${input.targetType}${input.targetId ? ` (${input.targetId})` : ''}` :
      'general entity';
  const labelLine = input.targetLabel ? ` – ${input.targetLabel}` : '';
  return [
    `Target: ${targetLine}${labelLine}`,
    `User note: ${input.description}`,
    `Metadata: ${formatValueForPrompt(input.metadata)}`,
    `Payload: ${formatValueForPrompt(input.payload)}`,
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