import type {OllamaChatRequest, OllamaProvider} from '../ai-operations/ollama-provider';
import {OllamaProviderError} from '../ai-operations/ollama-provider';

export type ChatRole = 'USER'|'ASSISTANT'|'SYSTEM';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  metadata: unknown|null;
  createdAt: Date;
};

export type ChatSession = {
  id: string;
  title: string|null;
  systemPrompt: string|null;
  model: string;
  temperature: number|null;
  metadata: unknown|null;
  createdAt: Date;
  updatedAt: Date;
};

export type ChatSessionSummary = ChatSession&{
  messageCount: number;
  lastMessage: ChatMessage|null;
};

export type ChatPersistence = {
  listSessions(userId: string, limit: number): Promise<ChatSessionSummary[]>;
  createSession(input: {
    userId: string;
    title: string|null;
    systemPrompt: string|null;
    model: string;
    temperature: number|null;
  }): Promise<ChatSession>;
  findSession(userId: string, sessionId: string): Promise<ChatSession|null>;
  listMessages(sessionId: string, limit: number): Promise<ChatMessage[]>;
  createMessage(input: {
    sessionId: string;
    role: ChatRole;
    content: string;
    metadata: unknown|null;
  }): Promise<ChatMessage>;
  updateSession(sessionId: string, patch: {
    title?: string|null;
    systemPrompt?: string|null;
    model: string;
    temperature: number;
  }): Promise<ChatSession>;
  countMessages(sessionId: string): Promise<number>;
};

export type ChatOperationRecord = {
  userId: string;
  source: 'chat';
  sessionId: string;
  model: string;
  temperature: number;
  systemPrompt: string|null;
  requestBody: unknown;
  responseBody: unknown;
  statusCode: number|null;
  errorMessage: string|null;
  metadata: unknown;
};

export class ChatSessionNotFoundError extends Error {
  constructor() {
    super('Session not found');
    this.name = 'ChatSessionNotFoundError';
  }
}

export interface ChatSessionsKit {
  listSessions(userId: string, limit: number): Promise<ChatSessionSummary[]>;
  listModels(): string[];
  createSession(input: {
    userId: string;
    title?: string|null;
    systemPrompt?: string|null;
    model?: string|null;
    temperature?: number|null;
  }): Promise<ChatSessionSummary>;
  listMessages(input: {
    userId: string;
    sessionId: string;
    limit: number;
  }): Promise<{session: ChatSessionSummary; messages: ChatMessage[]}>;
  sendMessage(input: {
    userId: string;
    sessionId: string;
    message: string;
    systemPrompt?: string|null;
    model?: string|null;
    temperature?: number|null;
    metadata?: unknown|null;
  }): Promise<{session: ChatSessionSummary; message: ChatMessage}>;
}

export function createChatSessionsKit(dependencies: {
  persistence: ChatPersistence;
  provider: OllamaProvider;
  recordOperation(record: ChatOperationRecord): Promise<void>;
  warn?(error: unknown, message: string): void;
  defaultModel?: string;
  defaultTemperature?: number;
  historyLimit?: number;
}): ChatSessionsKit {
  const defaultModel = dependencies.defaultModel ?? 'llama3.2:1b';
  const defaultTemperature = clampFloat(
      dependencies.defaultTemperature ?? 0.2, 0.2, 0, 1);
  const historyLimit = clampNumber(
      dependencies.historyLimit ?? 32, 32, 8, 64);

  return {
    listSessions: (userId, limit) =>
        dependencies.persistence.listSessions(userId, limit),
    listModels: () => ['llama3.2:1b'],

    async createSession(input) {
      const session = await dependencies.persistence.createSession({
        userId: input.userId,
        title: safeTrim(input.title),
        systemPrompt: safeTrim(input.systemPrompt),
        model: normalizeModel(input.model, defaultModel),
        temperature: typeof input.temperature === 'number' ?
            clampFloat(input.temperature, defaultTemperature) :
            null,
      });
      return summarize(session, 0, null);
    },

    async listMessages(input) {
      const session = await dependencies.persistence.findSession(
          input.userId, input.sessionId);
      if (!session) throw new ChatSessionNotFoundError();
      const messages = await dependencies.persistence.listMessages(
          session.id, input.limit);
      return {
        session: summarize(
            session, messages.length,
            messages.length ? messages[messages.length - 1] : null),
        messages,
      };
    },

    async sendMessage(input) {
      const session = await dependencies.persistence.findSession(
          input.userId, input.sessionId);
      if (!session) throw new ChatSessionNotFoundError();
      const model = normalizeModel(input.model ?? session.model, defaultModel);
      const temperature = clampFloat(
          input.temperature ?? session.temperature ?? defaultTemperature,
          defaultTemperature, 0, 1);
      const systemPrompt = safeTrim(input.systemPrompt) ?? session.systemPrompt;
      const history = await dependencies.persistence.listMessages(
          session.id, historyLimit);
      const userMessage = await dependencies.persistence.createMessage({
        sessionId: session.id,
        role: 'USER',
        content: input.message,
        metadata: input.metadata ?? null,
      });
      const messages = [
        ...(systemPrompt ? [{role: 'system' as const, content: systemPrompt}] : []),
        ...history.slice(-(historyLimit - 1)).map((entry) => ({
          role: entry.role.toLowerCase() as 'system'|'user'|'assistant',
          content: entry.content,
        })),
        {role: 'user' as const, content: userMessage.content},
      ];
      const requestBody: OllamaChatRequest = {
        model,
        temperature,
        messages,
        stream: false,
      };
      let responseBody: unknown = {};
      let statusCode: number|null = null;
      let errorMessage: string|null = null;

      try {
        const result = await dependencies.provider.chat(requestBody);
        responseBody = result.responseBody;
        statusCode = result.statusCode;
        const assistant = await dependencies.persistence.createMessage({
          sessionId: session.id,
          role: 'ASSISTANT',
          content: result.content,
          metadata: null,
        });
        const title = session.title ?? deriveSessionTitle(input.message);
        const updatedSession = await dependencies.persistence.updateSession(
            session.id, {
              ...(session.title ? {} : {title}),
              ...(safeTrim(input.systemPrompt) ?
                   {systemPrompt: safeTrim(input.systemPrompt)} :
                   {}),
              model,
              temperature,
            });
        const messageCount =
            await dependencies.persistence.countMessages(session.id);
        return {
          message: assistant,
          session: summarize(updatedSession, messageCount, assistant),
        };
      } catch (error) {
        errorMessage = error instanceof Error ? error.message :
                                                   'Chat request failed';
        if (error instanceof OllamaProviderError) {
          responseBody = error.details.responseBody;
          statusCode = error.details.statusCode;
        }
        throw error;
      } finally {
        try {
          await dependencies.recordOperation({
            userId: input.userId,
            source: 'chat',
            sessionId: session.id,
            model,
            temperature,
            systemPrompt,
            requestBody,
            responseBody,
            statusCode,
            errorMessage,
            metadata: {
              userMessage: input.message,
              historyLength: messages.length,
              hasSystemPrompt: Boolean(systemPrompt),
              sessionTitle: session.title,
            },
          });
        } catch (error) {
          dependencies.warn?.(error, 'failed to log Ollama chat operation');
        }
      }
    },
  };
}

function summarize(
    session: ChatSession, messageCount: number,
    lastMessage: ChatMessage|null): ChatSessionSummary {
  return {...session, messageCount, lastMessage};
}

function deriveSessionTitle(message: string): string {
  const trimmed = message.trim();
  if (!trimmed) return 'New chat';
  return trimmed.length <= 48 ? trimmed : `${trimmed.slice(0, 45)}…`;
}

function normalizeModel(value: string|null|undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length ? trimmed : fallback;
}

function safeTrim(value?: string|null) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length ? trimmed : null;
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