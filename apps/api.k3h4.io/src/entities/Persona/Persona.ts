import {Entity, Prisma, type PrismaClient} from '@prisma/client';

import {ACTOR_TYPES, ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {asRecord, readNumber, readString, readStringArray} from '../../lib/json-record';
import {readActorCache, writeActorCache} from '../../services/actor-cache';

const PERSONA_ACTOR_LABEL = 'Persona Ledger';
const PERSONA_ACTOR_NOTE = 'Ledger that tracks persona definitions';
const PERSONA_ACTOR_SOURCE = 'k3h4-persona';
export const PERSONA_TARGET_TYPE = 'persona';
const personaAttributeKind = ENTITY_KINDS.PERSONA_ATTRIBUTE;
const personaKind = ENTITY_KINDS.PERSONA;

type PrismaTx = PrismaClient|Prisma.TransactionClient;

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
        category: readString(metadata, 'category', {coerce: true}) ?? '',
        value: readString(metadata, 'value', {coerce: true}) ?? '',
        weight: readNumber(metadata, 'weight') ?? 1,
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
    alias: readString(metadata, 'alias', {coerce: true}) ?? '',
    account: readString(metadata, 'account', {coerce: true}) ?? '',
    handle: readString(metadata, 'handle', {coerce: true}),
    note: readString(metadata, 'note', {coerce: true}),
    tags: readStringArray(metadata, 'tags'),
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
      await tx.actor.findFirst({where: {userId, type: ACTOR_TYPES.PERSONA}});
  if (existing) return existing;
  return tx.actor.create({
    data: {
      userId,
      type: ACTOR_TYPES.PERSONA,
      label: PERSONA_ACTOR_LABEL,
      note: PERSONA_ACTOR_NOTE,
      source: PERSONA_ACTOR_SOURCE,
    },
  });
}

export async function findPersonaActor(prisma: PrismaClient, userId: string) {
  return prisma.actor.findFirst({where: {userId, type: ACTOR_TYPES.PERSONA}});
}

const buildPersonaEntityCriteria = (actorId: string) => ({
  actorId,
  kind: personaKind,
});

const buildAttributeEntityCriteria = (actorId: string) => ({
  actorId,
  kind: personaAttributeKind,
});

const serializeCachePayload = (records: PersonaRecord[]) =>
    records.map(serializePersonaRecordForCache);

const readCachedPersonaRecords = (payload: Prisma.JsonValue|null) =>
    deserializePersonaRecords(payload);

export async function readPersonaRecords(
    prisma: PrismaClient, userId: string, options?: {useCache?: boolean}) {
  const actor = await findPersonaActor(prisma, userId);
  if (!actor) return [] as PersonaRecord[];
  if (options?.useCache) {
    const cachedPayload =
        await readActorCache(prisma, actor.id, PERSONA_CACHE_KEY);
    const cached = readCachedPersonaRecords(cachedPayload);
    if (cached) return cached;
  }

  const [personaEntities, attributeEntities] = await Promise.all([
    prisma.entity.findMany({
      where: buildPersonaEntityCriteria(actor.id),
      orderBy: {createdAt: 'desc'},
    }),
    prisma.entity.findMany({
      where: buildAttributeEntityCriteria(actor.id),
      orderBy: {createdAt: 'desc'},
    }),
  ]);

  const attributeMap = buildAttributeMap(attributeEntities);
  const personas =
      personaEntities.map((entity) => buildPersonaRecord(entity, attributeMap));

  if (options?.useCache) {
    const cachePayload = serializeCachePayload(personas);
    await writeActorCache(
        prisma,
        actor.id,
        PERSONA_CACHE_KEY,
        cachePayload,
        PERSONA_CACHE_TTL_MS,
    );
  }

  return personas;
}

export async function createPersona(
    tx: PrismaTx,
    userId: string,
    payload: {
      alias: string; account: string;
      handle?: string | null;
      note?: string | null;
      tags?: string[] | null;
    },
) {
  const actor = await ensurePersonaActor(tx, userId);
  const metadata = {
    alias: readString({alias: payload.alias}, 'alias', {coerce: true}) ?? '',
    account:
        readString({account: payload.account}, 'account', {coerce: true}) ?? '',
    handle: readString({handle: payload.handle}, 'handle', {coerce: true}),
    note: readString({note: payload.note}, 'note', {coerce: true}),
    tags: normalizeTags(payload.tags),
  };
  const entity = await tx.entity.create({
    data: {
      actorId: actor.id,
      kind: personaKind,
      targetType: PERSONA_TARGET_TYPE,
      metadata,
    },
  });
  return buildPersonaRecord(entity, new Map());
}

export async function createPersonaAttribute(
    tx: PrismaTx,
    userId: string,
    payload:
        {personaId: string; category: string; value: string; weight?: number;},
) {
  const actor = await ensurePersonaActor(tx, userId);
  const metadata = {
    category:
        readString({category: payload.category}, 'category', {coerce: true}) ??
        '',
    value: readString({value: payload.value}, 'value', {coerce: true}) ?? '',
    weight: Number.isFinite(Number(payload.weight)) ? Number(payload.weight) :
                                                      1,
  };
  const entity = await tx.entity.create({
    data: {
      actorId: actor.id,
      kind: personaAttributeKind,
      targetType: PERSONA_TARGET_TYPE,
      targetId: payload.personaId,
      metadata,
    },
  });
  return buildPersonaAttributeRecord(entity);
}

export async function updatePersona(
    tx: PrismaTx,
    userId: string,
    personaId: string,
    payload: {
      alias?: string|null;
      account?: string | null;
      handle?: string | null;
      note?: string | null;
      tags?: string[] | null;
    },
) {
  const actor = await ensurePersonaActor(tx, userId);
  const entity = await tx.entity.findFirst({
    where: {
      id: personaId,
      actorId: actor.id,
      kind: personaKind,
    },
  });
  if (!entity) return null;
  const metadata = asRecord(entity.metadata);
  if (payload.alias !== undefined)
    metadata.alias =
        readString({alias: payload.alias}, 'alias', {coerce: true});
  if (payload.account !== undefined)
    metadata.account =
        readString({account: payload.account}, 'account', {coerce: true});
  if (payload.handle !== undefined)
    metadata.handle =
        readString({handle: payload.handle}, 'handle', {coerce: true});
  if (payload.note !== undefined)
    metadata.note = readString({note: payload.note}, 'note', {coerce: true});
  if (payload.tags !== undefined) metadata.tags = normalizeTags(payload.tags);

  const updated = await tx.entity.update({
    where: {id: entity.id},
    data: {metadata},
  });
  return buildPersonaRecord(updated, new Map());
}

export async function deletePersona(
    tx: PrismaTx,
    userId: string,
    personaId: string,
) {
  const actor = await ensurePersonaActor(tx, userId);
  await tx.entity.deleteMany({
    where: {
      actorId: actor.id,
      kind: personaAttributeKind,
      targetType: PERSONA_TARGET_TYPE,
      targetId: personaId,
    },
  });
  await tx.entity.deleteMany({
    where: {
      actorId: actor.id,
      kind: personaKind,
      id: personaId,
    },
  });
}

export async function deletePersonaAttribute(
    tx: PrismaTx,
    userId: string,
    personaId: string,
    attributeId: string,
) {
  const actor = await ensurePersonaActor(tx, userId);
  await tx.entity.deleteMany({
    where: {
      actorId: actor.id,
      kind: personaAttributeKind,
      targetType: PERSONA_TARGET_TYPE,
      targetId: personaId,
      id: attributeId,
    },
  });
}

export async function buildPersonaCompatibilityRecord(
    prisma: PrismaClient,
    actorId: string,
    userId: string,
) {
  const entities = await prisma.entity.findMany({
    where: {actorId, kind: ENTITY_KINDS.PERSONA_COMPATIBILITY},
    orderBy: {createdAt: 'desc'},
  });
  return entities.map((entity) => ({
                        id: entity.id,
                        userId,
                        metadata: entity.metadata,
                        createdAt: entity.createdAt,
                      }));
}

export async function loadPersonaCompatibility(
    prisma: PrismaClient, userId: string) {
  const actor = await findPersonaActor(prisma, userId);
  if (!actor) return [] as Prisma.JsonValue[];
  const entries = await prisma.entity.findMany({
    where: {actorId: actor.id, kind: ENTITY_KINDS.PERSONA_COMPATIBILITY},
    orderBy: {createdAt: 'desc'},
  });
  return entries.map((entry) => ({
                       id: entry.id,
                       metadata: entry.metadata,
                       createdAt: entry.createdAt,
                     }));
}

export async function storePersonaCompatibility(
    tx: PrismaTx,
    userId: string,
    payload: {metadata: Prisma.JsonValue},
) {
  const actor = await ensurePersonaActor(tx, userId);
  return tx.entity.create({
    data: {
      actorId: actor.id,
      kind: ENTITY_KINDS.PERSONA_COMPATIBILITY,
      metadata: payload.metadata,
    },
  });
}

export async function clearPersonaCompatibility(tx: PrismaTx, userId: string) {
  const actor = await findPersonaActor(tx as PrismaClient, userId);
  if (!actor) return {count: 0};
  return tx.entity.deleteMany({
    where: {
      actorId: actor.id,
      kind: ENTITY_KINDS.PERSONA_COMPATIBILITY,
    },
  });
}
