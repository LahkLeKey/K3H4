import {ActorType, Entity, EntityKind, Prisma, type PrismaClient} from '@prisma/client';

import {readActorCache, writeActorCache} from './actor-cache';

const PERSONA_ACTOR_LABEL = 'Persona Ledger';
const PERSONA_ACTOR_NOTE = 'Ledger that tracks persona definitions';
const PERSONA_ACTOR_SOURCE = 'k3h4-persona';
export const PERSONA_TARGET_TYPE = 'persona';
const personaAttributeKind = EntityKind.PERSONA_ATTRIBUTE;
const personaKind = EntityKind.PERSONA;

type PrismaTx = PrismaClient|Prisma.TransactionClient;

const asRecord = (value: Prisma.JsonValue|null|undefined) => {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {} as Record<string, unknown>;
};

const metadataString = (metadata: Record<string, unknown>, key: string) => {
  const value = metadata[key];
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (value != null) return String(value);
  return null;
};

const metadataNumber = (metadata: Record<string, unknown>, key: string) => {
  const value = metadata[key];
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const metadataStringArray =
    (metadata: Record<string, unknown>, key: string) => {
      const value = metadata[key];
      if (Array.isArray(value)) {
        return value
            .map((entry) => {
              if (typeof entry === 'string') return entry.trim();
              if (typeof entry === 'number') return String(entry);
              return null;
            })
            .filter(
                (entry): entry is string =>
                    typeof entry === 'string' && entry.length > 0,
            );
      }
      if (typeof value === 'string') {
        const trimmed = value.trim();
        return trimmed.length ? [trimmed] : [];
      }
      return [];
    };

const normalizeTags = (tags?: string[]|null) => {
  if (!Array.isArray(tags)) return [];
  return tags.map((tag) => (typeof tag === 'string' ? tag.trim() : ''))
      .filter((tag) => tag.length > 0);
};

export type PersonaAttributeRecord = {
  id: string; category: string; value: string; weight: number; createdAt: Date;
  updatedAt: Date;
};

export type PersonaRecord = {
  id: string; alias: string; account: string; handle: string | null;
  note: string | null;
  tags: string[];
  attributes: PersonaAttributeRecord[];
  createdAt: Date;
  updatedAt: Date;
};

export type PersonaRef = {
  id: string; alias: string; account: string; handle: string | null;
};

const PERSONA_CACHE_KEY = 'persona-records';
const PERSONA_CACHE_TTL_MS =
    Number(process.env.PERSONA_CACHE_TTL_MS ?? 1000 * 60 * 5);

type PersonaAttributeCachePayload = {
  id: string; category: string; value: string; weight: number;
  createdAt: string;
  updatedAt: string;
};

type PersonaCachePayload = {
  id: string; alias: string; account: string; handle: string | null;
  note: string | null;
  tags: string[];
  attributes: PersonaAttributeCachePayload[];
  createdAt: string;
  updatedAt: string;
};

const parseCacheDate = (value: unknown): Date|null => {
  if (typeof value !== 'string') return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const serializePersonaRecordForCache =
    (persona: PersonaRecord): PersonaCachePayload => ({
      id: persona.id,
      alias: persona.alias,
      account: persona.account,
      handle: persona.handle,
      note: persona.note,
      tags: persona.tags,
      attributes:
          persona.attributes.map((attr) => ({
                                   id: attr.id,
                                   category: attr.category,
                                   value: attr.value,
                                   weight: attr.weight,
                                   createdAt: attr.createdAt.toISOString(),
                                   updatedAt: attr.updatedAt.toISOString(),
                                 })),
      createdAt: persona.createdAt.toISOString(),
      updatedAt: persona.updatedAt.toISOString(),
    });

const deserializePersonaRecords = (
    payload: Prisma.JsonValue|null,
    ): PersonaRecord[]|null => {
  if (!Array.isArray(payload)) return null;
  const records: PersonaRecord[] = [];
  payload.forEach((entry) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return;
    const candidate = entry as PersonaCachePayload;
    const createdAt = parseCacheDate(candidate.createdAt);
    const updatedAt = parseCacheDate(candidate.updatedAt);
    if (!createdAt || !updatedAt) return;
    const attributes: PersonaAttributeRecord[] = [];
    if (Array.isArray(candidate.attributes)) {
      candidate.attributes.forEach((attr) => {
        if (!attr || typeof attr !== 'object') return;
        const attrCreated = parseCacheDate(attr.createdAt);
        const attrUpdated = parseCacheDate(attr.updatedAt);
        if (!attrCreated || !attrUpdated) return;
        const weight = typeof attr.weight === 'number' ?
            attr.weight :
            Number(attr.weight ?? 0);
        attributes.push({
          id: attr.id,
          category: attr.category,
          value: attr.value,
          weight,
          createdAt: attrCreated,
          updatedAt: attrUpdated,
        });
      });
    }
    records.push({
      id: candidate.id,
      alias: candidate.alias,
      account: candidate.account,
      handle: candidate.handle,
      note: candidate.note,
      tags: Array.isArray(candidate.tags) ?
          candidate.tags.map((tag) => String(tag)) :
          [],
      attributes,
      createdAt,
      updatedAt,
    });
  });
  return records;
};

const buildPersonaAttributeRecord =
    (entity: Entity): PersonaAttributeRecord => {
      const metadata = asRecord(entity.metadata);
      return {
        id: entity.id,
        category: metadataString(metadata, 'category') ?? '',
        value: metadataString(metadata, 'value') ?? '',
        weight: metadataNumber(metadata, 'weight') ?? 1,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      };
    };

const buildAttributeMap = (entities: Entity[]) => {
  const map = new Map<string, PersonaAttributeRecord[]>();
  entities.forEach((entity) => {
    if (entity.targetType !== PERSONA_TARGET_TYPE || !entity.targetId) return;
    const list = map.get(entity.targetId) ?? [];
    list.push(buildPersonaAttributeRecord(entity));
    map.set(entity.targetId, list);
  });
  return map;
};

const buildPersonaRecord = (
    entity: Entity,
    attributeMap: Map<string, PersonaAttributeRecord[]>,
    ): PersonaRecord => {
  const metadata = asRecord(entity.metadata);
  return {
    id: entity.id,
    alias: metadataString(metadata, 'alias') ?? '',
    account: metadataString(metadata, 'account') ?? '',
    handle: metadataString(metadata, 'handle'),
    note: metadataString(metadata, 'note'),
    tags: metadataStringArray(metadata, 'tags'),
    attributes: attributeMap.get(entity.id) ?? [],
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
};

export const personaToRef = (persona: PersonaRecord): PersonaRef => ({
  id: persona.id,
  alias: persona.alias,
  account: persona.account,
  handle: persona.handle,
});

export const personaRecordToResponse = (persona: PersonaRecord) => ({
  id: persona.id,
  alias: persona.alias,
  account: persona.account,
  handle: persona.handle ?? undefined,
  note: persona.note ?? undefined,
  tags: persona.tags,
  attributes: persona.attributes.map((attr) => ({
                                       id: attr.id,
                                       category: attr.category,
                                       value: attr.value,
                                       weight: attr.weight,
                                     })),
  createdAt: persona.createdAt,
  updatedAt: persona.updatedAt,
});

export async function ensurePersonaActor(tx: PrismaTx, userId: string) {
  const existing =
      await tx.actor.findFirst({where: {userId, type: ActorType.PERSONA}});
  if (existing) return existing;
  return tx.actor.create({
    data: {
      userId,
      type: ActorType.PERSONA,
      label: PERSONA_ACTOR_LABEL,
      note: PERSONA_ACTOR_NOTE,
      source: PERSONA_ACTOR_SOURCE,
    },
  });
}

export async function findPersonaActor(prisma: PrismaClient, userId: string) {
  return prisma.actor.findFirst({where: {userId, type: ActorType.PERSONA}});
}

export async function loadPersonaRecordsByActor(
    prisma: PrismaClient,
    actorId: string,
) {
  const cached = await readActorCache(prisma, actorId, PERSONA_CACHE_KEY);
  const fromCache = deserializePersonaRecords(cached);
  if (fromCache) return fromCache;
  const [personas, attributes] = await Promise.all([
    prisma.entity.findMany({
      where: {actorId, kind: personaKind},
      orderBy: {createdAt: 'desc'},
    }),
    prisma.entity.findMany({where: {actorId, kind: personaAttributeKind}}),
  ]);
  const attributeMap = buildAttributeMap(attributes);
  const records =
      personas.map((entity) => buildPersonaRecord(entity, attributeMap));
  const cachePayload =
      records.map((record) => serializePersonaRecordForCache(record));
  await writeActorCache(
      prisma,
      actorId,
      PERSONA_CACHE_KEY,
      cachePayload as Prisma.JsonValue,
      PERSONA_CACHE_TTL_MS,
  );
  return records;
}

export async function loadPersonaRecordById(
    prisma: PrismaClient,
    actorId: string,
    personaId: string,
) {
  const personas = await loadPersonaRecordsByActor(prisma, actorId);
  return personas.find((persona) => persona.id === personaId) ?? null;
}

export async function loadPersonaMap(prisma: PrismaClient, userId: string) {
  const actor = await findPersonaActor(prisma, userId);
  if (!actor) return new Map<string, PersonaRecord>();
  const personas = await loadPersonaRecordsByActor(prisma, actor.id);
  return new Map(personas.map((persona) => [persona.id, persona]));
}

export const buildPersonaMetadata = (payload: {
  alias: string; account: string;
  handle?: string;
  note?: string;
  tags?: string[];
}) => {
  const tags = normalizeTags(payload.tags);
  return {
    alias: payload.alias,
    account: payload.account,
    handle: payload.handle?.trim() ?? null,
    note: payload.note?.trim() ?? null,
    tags,
  };
};

export const buildPersonaAttributeEntities = (
    actorId: string,
    personaId: string,
    attributes: {category: string; value: string; weight: number}[],
    ) => {
  return attributes.map((attr) => ({
                          actorId,
                          kind: personaAttributeKind,
                          targetType: PERSONA_TARGET_TYPE,
                          targetId: personaId,
                          metadata: {
                            category: attr.category,
                            value: attr.value,
                            weight: attr.weight,
                          },
                        }));
};