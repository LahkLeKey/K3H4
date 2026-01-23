import { ChatRole, PrismaClient } from "@prisma/client";
import { type FastifyInstance, type FastifyReply, type FastifyRequest } from "fastify";
import { withTelemetryBase } from "./telemetry";
import { type RecordTelemetryFn } from "./types";

type ChatSessionRow = {
  id: string;
  title: string | null;
  systemPrompt: string | null;
  model: string | null;
  temperature: number | null;
  metadata: unknown | null;
  createdAt: Date;
  updatedAt: Date;
  _count: { messages: number };
  messages: Array<{ role: ChatRole; content: string; createdAt: Date }>;
};

type ChatSessionSummary = {
  id: string;
  title: string | null;
  systemPrompt: string | null;
  model: string;
  temperature: number | null;
  metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  lastMessage: { role: ChatRole; content: string; createdAt: string } | null;
};

type ChatMessageBody = {
  message?: string;
  systemPrompt?: string | null;
  model?: string | null;
  temperature?: number | null;
  metadata?: unknown | null;
};

type SessionCreateBody = {
  title?: string | null;
  systemPrompt?: string | null;
  model?: string | null;
  temperature?: number | null;
};

const CHAT_HISTORY_LIMIT = clampNumber(Number(process.env.OLLAMA_CHAT_HISTORY_LIMIT ?? 32), 32, 8, 64);
const DEFAULT_MODEL = "llama2";
const DEFAULT_TEMPERATURE = clampFloat(Number(process.env.OLLAMA_CHAT_TEMPERATURE ?? NaN), 0.2, 0, 1);
const OLLAMA_CHAT_URL = resolveOllamaChatUrl();

export function registerChatRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  const authenticate = server.authenticate;

  server.get(
    "/chat/sessions",
    { preHandler: [authenticate] },
    async (request) => {
      const telemetry = withTelemetryBase(recordTelemetry, request);
      const query = request.query as { limit?: string | number | null };
      const limit = clampNumber(typeof query.limit === "number" ? query.limit : Number(query.limit ?? NaN), 16, 5, 50);
      const userId = (request.user as { sub: string }).sub;
      const sessions = await prisma.chatSession.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
        take: limit,
        select: {
          id: true,
          title: true,
          systemPrompt: true,
          model: true,
          temperature: true,
          metadata: true,
          createdAt: true,
          updatedAt: true,
          _count: { select: { messages: true } },
          messages: { take: 1, orderBy: { createdAt: "desc" }, select: { role: true, content: true, createdAt: true } },
        },
      });
      await telemetry({
        eventType: "chat.sessions.list",
        source: "chat",
        payload: { count: sessions.length, limit },
      });
      return { sessions: sessions.map(mapSessionSummary) };
    },
  );

  server.post(
    "/chat/sessions",
    { preHandler: [authenticate] },
    async (request) => {
      const telemetry = withTelemetryBase(recordTelemetry, request);
      const body = request.body as SessionCreateBody | undefined;
      const userId = (request.user as { sub: string }).sub;
      const sanitizedTitle = typeof body?.title === "string" && body.title.trim().length ? body.title.trim() : null;
      const sanitizedPrompt = typeof body?.systemPrompt === "string" && body.systemPrompt.trim().length ? body.systemPrompt.trim() : null;
      const modelOverride = normalizeModel(body?.model);
      const temperatureOverride = body?.temperature !== undefined ? clampFloat(body.temperature, DEFAULT_TEMPERATURE) : null;
      const session = await prisma.chatSession.create({
        data: {
          userId,
          title: sanitizedTitle,
          systemPrompt: sanitizedPrompt,
          model: modelOverride,
          temperature: temperatureOverride ?? undefined,
        },
      });
      await telemetry({
        eventType: "chat.session.create",
        source: "chat",
        payload: { sessionId: session.id, hasPrompt: Boolean(sanitizedPrompt) },
      });
      const summary = mapSessionSummary({
        id: session.id,
        title: session.title,
        systemPrompt: session.systemPrompt,
        model: session.model,
        temperature: session.temperature,
        metadata: null,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        _count: { messages: 0 },
        messages: [],
      });
      return { session: summary };
    },
  );

  server.get(
    "/chat/sessions/:sessionId/messages",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const telemetry = withTelemetryBase(recordTelemetry, request);
      const params = request.params as { sessionId: string };
      const userId = (request.user as { sub: string }).sub;
      const session = await prisma.chatSession.findUnique({
        where: { id: params.sessionId },
        select: {
          id: true,
          userId: true,
          title: true,
          systemPrompt: true,
          model: true,
          temperature: true,
          metadata: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!session || session.userId !== userId) {
        return reply.status(404).send({ error: "Session not found" });
      }
      const query = request.query as { limit?: string | number | null };
      const limit = clampNumber(typeof query.limit === "number" ? query.limit : Number(query.limit ?? NaN), 200, 1, 500);
      const rawMessages = await prisma.chatMessage.findMany({
        where: { sessionId: session.id },
        orderBy: { createdAt: "desc" },
        take: limit,
        select: { id: true, role: true, content: true, metadata: true, createdAt: true },
      });
      await telemetry({
        eventType: "chat.messages.list",
        source: "chat",
        payload: { sessionId: session.id, limit, fetched: rawMessages.length },
      });
      const ordered = rawMessages.reverse().map((msg) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        metadata: msg.metadata ?? null,
        createdAt: msg.createdAt.toISOString(),
      }));
      return {
        session: {
          id: session.id,
          title: session.title,
          systemPrompt: session.systemPrompt,
          model: session.model ?? DEFAULT_MODEL,
          temperature: session.temperature,
          metadata: session.metadata ?? null,
          createdAt: session.createdAt.toISOString(),
          updatedAt: session.updatedAt.toISOString(),
          messageCount: ordered.length,
          lastMessage: ordered[ordered.length - 1] ?? null,
        },
        messages: ordered,
      };
    },
  );

  server.post(
    "/chat/sessions/:sessionId/messages",
    { preHandler: [authenticate] },
    async (request, reply) => {
      const telemetry = withTelemetryBase(recordTelemetry, request);
      const params = request.params as { sessionId: string };
      const body = request.body as ChatMessageBody | undefined;
      const userId = (request.user as { sub: string }).sub;
      const text = typeof body?.message === "string" ? body.message.trim() : "";
      if (!text) {
        return reply.status(400).send({ error: "Message is required" });
      }
      const session = await prisma.chatSession.findUnique({
        where: { id: params.sessionId },
        select: {
          id: true,
          userId: true,
          title: true,
          systemPrompt: true,
          model: true,
          temperature: true,
          metadata: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!session || session.userId !== userId) {
        return reply.status(404).send({ error: "Session not found" });
      }
      const model = normalizeModel(body?.model ?? session.model);
      const temperature = clampFloat(body?.temperature ?? session.temperature ?? DEFAULT_TEMPERATURE, DEFAULT_TEMPERATURE, 0, 1);
      const sanitizedSystemPrompt = typeof body?.systemPrompt === "string" && body.systemPrompt.trim().length ? body.systemPrompt.trim() : null;
      const history = await prisma.chatMessage.findMany({
        where: { sessionId: session.id },
        orderBy: { createdAt: "desc" },
        take: CHAT_HISTORY_LIMIT,
        select: { role: true, content: true, createdAt: true },
      });
      const userMessage = await prisma.chatMessage.create({
        data: {
          sessionId: session.id,
          role: ChatRole.USER,
          content: text,
          metadata: body?.metadata ?? undefined,
        },
      });
      const combined = [{ role: ChatRole.USER, content: text, createdAt: userMessage.createdAt }, ...history];
      const conversation = combined
        .slice(0, CHAT_HISTORY_LIMIT)
        .reverse()
        .map((entry) => ({ role: toOllamaRole(entry.role), content: entry.content }));
      const systemPromptEntry = sanitizedSystemPrompt ?? session.systemPrompt;
      const messagesForOllama = [
        ...(systemPromptEntry ? [{ role: "system", content: systemPromptEntry }] : []),
        ...conversation,
      ];
      try {
        const response = await fetch(OLLAMA_CHAT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model, temperature, messages: messagesForOllama, stream: false }),
        });
        const textPayload = await response.text();
        if (!response.ok) {
          throw new Error(textPayload || `Ollama responded ${response.status}`);
        }
        const payload = textPayload ? JSON.parse(textPayload) : {};
        const assistantContent = extractAssistantContent(payload);
        const assistantMessage = await prisma.chatMessage.create({
          data: {
            sessionId: session.id,
            role: ChatRole.ASSISTANT,
            content: assistantContent,
          },
        });
        const nextTitle = session.title ?? deriveSessionTitle(text);
        const updatedSession = await prisma.chatSession.update({
          where: { id: session.id },
          data: {
            title: session.title ? undefined : nextTitle,
            model,
            temperature,
          },
          select: { title: true, updatedAt: true },
        });
        const messageCount = await prisma.chatMessage.count({ where: { sessionId: session.id } });
        await telemetry({
          eventType: "chat.message.send",
          source: "chat",
          payload: { sessionId: session.id, model, temperature, systemPrompt: Boolean(systemPromptEntry) },
        });
        return {
          message: {
            id: assistantMessage.id,
            role: assistantMessage.role,
            content: assistantMessage.content,
            createdAt: assistantMessage.createdAt.toISOString(),
          },
          session: {
            id: session.id,
            title: updatedSession.title,
            systemPrompt: session.systemPrompt,
            model,
            temperature,
            metadata: session.metadata ?? null,
            createdAt: session.createdAt.toISOString(),
            updatedAt: updatedSession.updatedAt.toISOString(),
            messageCount,
            lastMessage: {
              role: assistantMessage.role,
              content: assistantMessage.content,
              createdAt: assistantMessage.createdAt.toISOString(),
            },
          },
        };
      } catch (err) {
        await telemetry({
          eventType: "chat.message.send",
          source: "chat",
          payload: { sessionId: session.id, model, temperature, systemPrompt: Boolean(systemPromptEntry) },
          error: true,
        });
        request.log.error({ err, sessionId: session.id }, "chat message delivery failed");
        return reply.status(502).send({ error: err instanceof Error ? err.message : "Chat request failed" });
      }
    },
  );
}

function mapSessionSummary(row: ChatSessionRow): ChatSessionSummary {
  return {
    id: row.id,
    title: row.title,
    systemPrompt: row.systemPrompt,
    model: row.model ?? DEFAULT_MODEL,
    temperature: row.temperature,
    metadata: row.metadata ?? null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    messageCount: row._count.messages,
    lastMessage: row.messages[0]
      ? {
          role: row.messages[0].role,
          content: row.messages[0].content,
          createdAt: row.messages[0].createdAt.toISOString(),
        }
      : null,
  };
}

function clampNumber(value: number, fallback: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, Math.floor(value)));
}

function clampFloat(value: number, fallback: number, min = 0, max = 1): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, value));
}

function resolveOllamaChatUrl() {
  const base = process.env.OLLAMA_URL?.trim();
  if (!base) {
    throw new Error("OLLAMA_URL is required to reach the Ollama sidecar");
  }
  return `${base.replace(/\/+$/, "")}/api/chat`;
}

function deriveSessionTitle(message: string): string {
  const trimmed = message.trim();
  if (!trimmed) return "New chat";
  return trimmed.length <= 48 ? trimmed : `${trimmed.slice(0, 45)}…`;
}

type OllamaRole = "system" | "user" | "assistant";

function toOllamaRole(role: ChatRole): OllamaRole {
  return role.toLowerCase() as OllamaRole;
}

function flattenMessageContent(value: unknown): string | null {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return value.map(flattenMessageContent).filter(Boolean).join("");
  if (value && typeof value === "object") {
    const candidate = (value as Record<string, unknown>).content ?? (value as Record<string, unknown>).text ?? (value as Record<string, unknown>).message ?? (value as Record<string, unknown>).delta;
    if (candidate !== undefined) return flattenMessageContent(candidate);
    if (Array.isArray((value as Record<string, unknown>).choices)) {
      return flattenMessageContent((value as Record<string, unknown>).choices![0]);
    }
  }
  return null;
}

function extractAssistantContent(payload: unknown): string {
  const choice = Array.isArray((payload as Record<string, unknown>)?.choices)
    ? (payload as Record<string, unknown>).choices![0]
    : payload;
  const assistant = (choice as Record<string, unknown>)?.message ?? choice;
  const flattened = flattenMessageContent(assistant);
  if (flattened) return flattened;
  throw new Error("Ollama returned an unexpected payload");
}

function normalizeModel(value?: string | null): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : DEFAULT_MODEL;
}
