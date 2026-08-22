import {Prisma, type PrismaClient} from '@prisma/client';

import {ACTOR_TYPES, ENTITY_KINDS} from '../../lib/actor-entity-constants';
import type {ChatMessage, ChatPersistence, ChatRole, ChatSession} from './index';

const CHAT_ACTOR_LABEL = 'Chat Session';
const CHAT_ACTOR_SOURCE = 'k3h4-chat';
const CHAT_MESSAGE_SOURCE = 'k3h4-chat';

export function createPrismaChatPersistence(
    prisma: PrismaClient): ChatPersistence {
  return {
    async listSessions(userId, limit) {
      const actors = await prisma.actor.findMany({
        where: {userId, type: ACTOR_TYPES.CHAT_SESSION},
        orderBy: {updatedAt: 'desc'},
        take: limit,
        select: {id: true, metadata: true, createdAt: true, updatedAt: true},
      });
      const actorIds = actors.map((actor) => actor.id);
      const counts = actorIds.length ? await prisma.entity.groupBy({
        by: ['actorId'],
        where: {actorId: {in : actorIds}, kind: ENTITY_KINDS.CHAT_MESSAGE},
        _count: {_all: true},
      }) : [];
      const countMap = new Map(
          counts.map((row) => [row.actorId, row._count._all ?? 0]));
      return Promise.all(actors.map(async (actor) => {
        const last = await prisma.entity.findFirst({
          where: {actorId: actor.id, kind: ENTITY_KINDS.CHAT_MESSAGE},
          orderBy: {createdAt: 'desc'},
          select: {id: true, metadata: true, createdAt: true},
        });
        return {
          ...mapActor(actor),
          messageCount: countMap.get(actor.id) ?? 0,
          lastMessage: last ? mapEntity(last) : null,
        };
      }));
    },

    async createSession(input) {
      const actor = await prisma.actor.create({
        data: {
          userId: input.userId,
          type: ACTOR_TYPES.CHAT_SESSION,
          label: input.title ?? CHAT_ACTOR_LABEL,
          source: CHAT_ACTOR_SOURCE,
          metadata: buildSessionMetadata({
            title: input.title,
            systemPrompt: input.systemPrompt,
            model: input.model,
            temperature: input.temperature,
            metadata: null,
          }),
        },
      });
      return mapActor(actor);
    },

    async findSession(userId, sessionId) {
      const actor = await prisma.actor.findFirst({
        where: {id: sessionId, userId, type: ACTOR_TYPES.CHAT_SESSION},
        select: {id: true, metadata: true, createdAt: true, updatedAt: true},
      });
      return actor ? mapActor(actor) : null;
    },

    async listMessages(sessionId, limit) {
      const rows = await prisma.entity.findMany({
        where: {actorId: sessionId, kind: ENTITY_KINDS.CHAT_MESSAGE},
        orderBy: {createdAt: 'desc'},
        take: limit,
        select: {id: true, metadata: true, createdAt: true},
      });
      return rows.reverse().map(mapEntity);
    },

    async createMessage(input) {
      const row = await prisma.entity.create({
        data: {
          actorId: input.sessionId,
          kind: ENTITY_KINDS.CHAT_MESSAGE,
          source: CHAT_MESSAGE_SOURCE,
          metadata: buildMessageMetadata(input),
        },
      });
      return mapEntity(row);
    },

    async updateSession(sessionId, patch) {
      const current = await prisma.actor.findUnique({
        where: {id: sessionId},
        select: {metadata: true},
      });
      const actor = await prisma.actor.update({
        where: {id: sessionId},
        data: {
          label: patch.title === undefined ? undefined :
                                               patch.title ?? CHAT_ACTOR_LABEL,
          metadata: mergeSessionMetadata(current?.metadata, patch),
        },
        select: {id: true, metadata: true, createdAt: true, updatedAt: true},
      });
      return mapActor(actor);
    },

    countMessages: (sessionId) => prisma.entity.count({
      where: {actorId: sessionId, kind: ENTITY_KINDS.CHAT_MESSAGE},
    }),
  };
}

function mapActor(actor: {
  id: string;
  metadata: Prisma.JsonValue|null;
  createdAt: Date;
  updatedAt: Date;
}): ChatSession {
  const metadata = asRecord(actor.metadata);
  return {
    id: actor.id,
    title: stringOrNull(metadata.title),
    systemPrompt: stringOrNull(metadata.systemPrompt),
    model: stringOrNull(metadata.model) ?? 'llama3.2:1b',
    temperature: numberFromJson(metadata.temperature),
    metadata: metadata.metadata ?? null,
    createdAt: actor.createdAt,
    updatedAt: actor.updatedAt,
  };
}

function mapEntity(row: {
  id: string;
  metadata: Prisma.JsonValue|null;
  createdAt: Date;
}): ChatMessage {
  const metadata = asRecord(row.metadata);
  return {
    id: row.id,
    role: stringToChatRole(metadata.role) ?? 'USER',
    content: stringOrNull(metadata.content) ?? '',
    metadata: metadata.metadata ?? null,
    createdAt: row.createdAt,
  };
}

function buildMessageMetadata(input: {
  role: ChatRole;
  content: string;
  metadata: unknown|null;
}): Prisma.InputJsonObject {
  return pruneJsonObject({
           role: input.role.toLowerCase(),
           content: input.content,
           metadata: toInputJsonValue(input.metadata),
         }) ?? {};
}

function buildSessionMetadata(session: Omit<ChatSession, 'id'|'createdAt'|'updatedAt'>):
    Prisma.InputJsonObject {
  return pruneJsonObject({
           title: toInputJsonValue(session.title),
           systemPrompt: toInputJsonValue(session.systemPrompt),
           model: toInputJsonValue(session.model),
           temperature: toInputJsonValue(session.temperature),
           metadata: toInputJsonValue(session.metadata),
         }) ?? {};
}

function mergeSessionMetadata(
    base: Prisma.JsonValue|null|undefined,
    patch: {
      title?: string|null;
      systemPrompt?: string|null;
      model: string;
      temperature: number;
    }): Prisma.InputJsonObject {
  const next = {...asRecord(base)} as
      Record<string, Prisma.InputJsonValue|undefined>;
  if (patch.title !== undefined) next.title = toInputJsonValue(patch.title);
  if (patch.systemPrompt !== undefined)
    next.systemPrompt = toInputJsonValue(patch.systemPrompt);
  next.model = patch.model;
  next.temperature = patch.temperature;
  return pruneJsonObject(next) ?? {};
}

function stringToChatRole(value: unknown): ChatRole|null {
  if (typeof value !== 'string') return null;
  const role = value.toUpperCase();
  return role === 'USER' || role === 'ASSISTANT' || role === 'SYSTEM' ?
      role :
      null;
}

function asRecord(value: Prisma.JsonValue|null|undefined):
    Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ?
      value as Record<string, unknown> :
      {};
}

function stringOrNull(value: unknown): string|null {
  return typeof value === 'string' ? value : null;
}

function numberFromJson(value: unknown): number|null {
  const numeric = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function toInputJsonValue(value: unknown|null|undefined):
    Prisma.InputJsonValue|undefined {
  if (value === undefined) return undefined;
  if (value === null)
    return Prisma.JsonNull as unknown as Prisma.InputJsonValue;
  return value as Prisma.InputJsonValue;
}

function pruneJsonObject(
    value: Record<string, Prisma.InputJsonValue|undefined>):
    Prisma.InputJsonObject|null {
  const entries = Object.entries(value).filter(([, item]) => item !== undefined);
  return entries.length ? Object.fromEntries(entries) as Prisma.InputJsonObject :
                          null;
}