import {faker} from '@faker-js/faker';
import {Entity, EntityKind, LifecycleStatus, type Prisma, type PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {type CompatFeatureVector, runOnnxCompatibility} from '../lib/compat-onnx';
import * as personaLedger from '../services/persona-ledger';
import type {PersonaRecord} from '../services/persona-ledger';

import {withTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

type PersonaAttributeInput = {
  category?: string;
  values?: string[];
  weight?: number;
};

type CompatibilityPayload = {
  sourceId: string; targetId: string; metadata: {
    sourceId: string; targetId: string; jaccardScore: number;
    intersectionCount: number;
    unionCount: number;
    overlappingTokens: string[];
    status: LifecycleStatus;
    rationale?: string | null;
  };
};

type CompatibilityRecord = {
  id: string; sourceId: string; targetId: string; jaccardScore: number;
  intersectionCount: number;
  unionCount: number;
  overlappingTokens: string[];
  status: LifecycleStatus;
  rationale?: string | null; createdAt: Date;
};

const normalizeToken = (value: string) =>
    value.trim().toLowerCase().replace(/\s+/g, '-');

const tokensForPersona = (persona: PersonaRecord) => {
  const tokens = new Set<string>();
  tokens.add(normalizeToken(persona.alias));
  if (persona.handle) tokens.add(normalizeToken(persona.handle));
  persona.tags.forEach((tag) => tokens.add(normalizeToken(tag)));
  persona.attributes.forEach((attr) => {
    tokens.add(
        `${normalizeToken(attr.category)}:${normalizeToken(attr.value)}`);
  });
  return tokens;
};

const calculateJaccard = (a: Set<string>, b: Set<string>) => {
  const intersection = new Set<string>();
  a.forEach((token) => {
    if (b.has(token)) intersection.add(token);
  });
  const unionCount = new Set([...a, ...b]).size || 1;
  const intersectionCount = intersection.size;
  const score = unionCount === 0 ?
      0 :
      Number((intersectionCount / unionCount).toFixed(4));
  return {
    score,
    intersectionCount,
    unionCount,
    overlap: Array.from(intersection)
  };
};

const buildCompatibilityPayload = (personas: PersonaRecord[]) => {
  const payload: CompatibilityPayload[] = [];
  for (let i = 0; i < personas.length; i += 1) {
    for (let j = i + 1; j < personas.length; j += 1) {
      const left = personas[i];
      const right = personas[j];
      const leftTokens = tokensForPersona(left);
      const rightTokens = tokensForPersona(right);
      const {score, intersectionCount, unionCount, overlap} =
          calculateJaccard(leftTokens, rightTokens);
      payload.push({
        sourceId: left.id,
        targetId: right.id,
        metadata: {
          sourceId: left.id,
          targetId: right.id,
          jaccardScore: score,
          intersectionCount,
          unionCount,
          overlappingTokens: overlap,
          status: LifecycleStatus.ACTIVE,
        },
      });
    }
  }
  return payload;
};

const metadataRecord = (value: unknown) => {
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
              if (typeof entry === 'string') return entry;
              if (typeof entry === 'number') return String(entry);
              return null;
            })
            .filter((entry): entry is string => typeof entry === 'string');
      }
      return [];
    };

const compatibilityRecordFromEntity = (entity: Entity): CompatibilityRecord => {
  const metadata = metadataRecord(entity.metadata);
  return {
    id: entity.id,
    sourceId: metadataString(metadata, 'sourceId') ?? '',
    targetId: metadataString(metadata, 'targetId') ?? '',
    jaccardScore: Number(metadataString(metadata, 'jaccardScore') ?? 0),
    intersectionCount: metadataNumber(metadata, 'intersectionCount') ?? 0,
    unionCount: metadataNumber(metadata, 'unionCount') ?? 1,
    overlappingTokens: metadataStringArray(metadata, 'overlappingTokens'),
    status: (metadataString(metadata, 'status') as LifecycleStatus) ??
        LifecycleStatus.ACTIVE,
    rationale: metadataString(metadata, 'rationale'),
    createdAt: entity.createdAt,
  };
};

const loadCompatibilityRecords = async (
    prisma: PrismaClient,
    actorId: string,
    ) => {
  const entities = await prisma.entity.findMany({
    where: {actorId, kind: EntityKind.PERSONA_COMPATIBILITY},
  });
  return entities.map(compatibilityRecordFromEntity);
};

const pairKey = (a: string, b: string) => (a < b ? `${a}|${b}` : `${b}|${a}`);

const serializeCompatibility = (
    record: CompatibilityRecord,
    personaMap: Map<string, PersonaRecord>,
    ) => {
  const source = personaMap.get(record.sourceId);
  const target = personaMap.get(record.targetId);
  if (!source || !target) return null;
  return {
    id: record.id,
    jaccardScore: record.jaccardScore,
    intersectionCount: record.intersectionCount,
    unionCount: record.unionCount,
    overlappingTokens: record.overlappingTokens,
    computedAt: record.createdAt.toISOString(),
    sourceId: record.sourceId,
    targetId: record.targetId,
    status: record.status,
    rationale: record.rationale ?? undefined,
    source: personaLedger.personaRecordToResponse(source),
    target: personaLedger.personaRecordToResponse(target),
  };
};

const normalizeAttributeInput = (input: PersonaAttributeInput) => {
  const category = input.category?.trim();
  if (!category) return [] as {
      category: string;
      value: string;
      weight: number
    }
  [];
  const weight =
      Number.isFinite(input.weight ?? 1) ? Number(input.weight ?? 1) : 1;
  return (input.values ?? [])
      .map((value) => value?.trim())
      .filter((value): value is string => Boolean(value))
      .map((value) => ({category, value, weight}));
};

const clampCount = (value?: number) => {
  const parsed = Number(value ?? 1);
  if (!Number.isFinite(parsed)) return 1;
  return Math.min(Math.max(Math.floor(parsed), 1), 10);
};

const buildFakerPersona = () => ({
  alias: faker.person.fullName(),
  account: faker.internet.email().toLowerCase(),
  handle: `@${faker.internet.username().toLowerCase()}`,
  note: faker.hacker.phrase(),
  tags: [faker.hacker.noun(), faker.company.buzzNoun()].map(
      (tag) => tag.toLowerCase()),
});

const buildSeedAttributes = (personaId: string, tags: string[]) => {
  const industries =
      ['fintech', 'logistics', 'commerce', 'gaming', 'media', 'operations'];
  const stacks = ['node', 'python', 'go', 'rust', 'rails'];
  const tones = ['analytical', 'playful', 'direct', 'technical', 'empathetic'];
  return [
    {
      personaId,
      category: 'industry',
      value: tags[0]?.toLowerCase() ?? faker.helpers.arrayElement(industries),
      weight: 1,
    },
    {
      personaId,
      category: 'stack',
      value: faker.helpers.arrayElement(stacks),
      weight: 1,
    },
    {
      personaId,
      category: 'tone',
      value: faker.helpers.arrayElement(tones),
      weight: 1,
    },
  ];
};

type ConfusionExampleInput = {
  sourceId?: string;
  targetId?: string;
  label?: boolean;
};

type ConfusionCounts = {
  tp: number; fp: number; tn: number; fn: number
};

const emptyConfusion: ConfusionCounts = {
  tp: 0,
  fp: 0,
  tn: 0,
  fn: 0
};

const computeConfusionFromPairs = async (
    pairs: ConfusionExampleInput[],
    userId: string,
    prisma: PrismaClient,
    threshold: number,
    modelPath?: string,
    ) => {
  const normalized = pairs
                         .map((pair) => ({
                                sourceId: pair.sourceId?.trim(),
                                targetId: pair.targetId?.trim(),
                                label: pair.label,
                              }))
                         .filter(
                             (pair) => pair.sourceId && pair.targetId &&
                                 typeof pair.label === 'boolean',
                             ) as {
    sourceId: string;
    targetId: string;
    label: boolean
  }
  [];
  if (normalized.length === 0) {
    return {counts: emptyConfusion, details: [], missing: pairs.length};
  }
  const actor = await personaLedger.ensurePersonaActor(prisma, userId);
  const compatibilityRecords = await loadCompatibilityRecords(prisma, actor.id);
  const personaMap = await personaLedger.loadPersonaMap(prisma, userId);
  const compatMap = new Map<string, CompatibilityRecord>();
  compatibilityRecords.forEach((record) => {
    compatMap.set(pairKey(record.sourceId, record.targetId), record);
  });

  const counts: ConfusionCounts = {...emptyConfusion};
  const details: Array<{
    id: string; probability: number; predicted: boolean; label: boolean;
    usedOnnx: boolean;
    sourceId: string;
    targetId: string;
    jaccardScore: number;
  }> = [];

  for (const pair of normalized) {
    const key = pairKey(pair.sourceId, pair.targetId);
    const compat = compatMap.get(key);
    if (!compat) continue;
    const features: CompatFeatureVector = {
      jaccardScore: compat.jaccardScore,
      intersectionCount: compat.intersectionCount,
      unionCount: compat.unionCount,
    };
    const {probability, usedOnnx} = await runOnnxCompatibility(
        features,
        modelPath,
    );
    const predicted = probability >= threshold;
    if (pair.label && predicted)
      counts.tp += 1;
    else if (!pair.label && predicted)
      counts.fp += 1;
    else if (!pair.label && !predicted)
      counts.tn += 1;
    else
      counts.fn += 1;
    details.push({
      id: key,
      probability,
      predicted,
      label: pair.label,
      usedOnnx,
      sourceId: compat.sourceId,
      targetId: compat.targetId,
      jaccardScore: compat.jaccardScore,
    });
  }

  return {counts, details, missing: normalized.length - details.length};
};

export function registerPersonaRoutes(
    server: FastifyInstance,
    prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn,
) {
  server.get(
      '/personas',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const rt = withTelemetryBase(recordTelemetry, request);
        const actor = await personaLedger.ensurePersonaActor(prisma, userId);
        let personas =
            await personaLedger.loadPersonaRecordsByActor(prisma, actor.id);
        if (personas.length === 0) {
          const seedData = Array.from({length: 3})
                               .map(
                                   () => personaLedger.buildPersonaMetadata(
                                       buildFakerPersona()));
          await prisma.entity.createMany({
            data: seedData.map((row) => ({
                                 actorId: actor.id,
                                 kind: EntityKind.PERSONA,
                                 metadata: row,
                               })),
          });
          personas =
              await personaLedger.loadPersonaRecordsByActor(prisma, actor.id);
          const attributeSeeds = personas.flatMap(
              (persona) => buildSeedAttributes(persona.id, persona.tags));
          if (attributeSeeds.length > 0) {
            await prisma.entity.createMany({
              data: attributeSeeds.map(
                  (entry) => ({
                    actorId: actor.id,
                    kind: EntityKind.PERSONA_ATTRIBUTE,
                    targetType: personaLedger.PERSONA_TARGET_TYPE,
                    targetId: entry.personaId,
                    metadata: {
                      category: entry.category,
                      value: entry.value,
                      weight: entry.weight,
                    },
                  })),
            });
            personas =
                await personaLedger.loadPersonaRecordsByActor(prisma, actor.id);
          }
          await rt({
            eventType: 'persona.seed',
            source: 'api',
            payload: {count: seedData.length}
          });
        }
        await rt({
          eventType: 'persona.list',
          source: 'api',
          payload: {count: personas.length}
        });
        return {personas: personas.map(personaLedger.personaRecordToResponse)};
      },
  );

  server.post(
      '/personas',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const rt = withTelemetryBase(recordTelemetry, request);
        const body = request.body as {
          alias?: string;
          account?: string;
          handle?: string;
          note?: string;
          tags?: string[];
          attributes?: PersonaAttributeInput[];
        }
        |undefined;
        const alias = body?.alias?.trim();
        const account = body?.account?.trim();
        if (!alias || !account) {
          return reply.status(400).send(
              {error: 'alias and account are required'});
        }
        const actor = await personaLedger.ensurePersonaActor(prisma, userId);
        const personaEntity = await prisma.entity.create({
          data: {
            actorId: actor.id,
            kind: EntityKind.PERSONA,
            metadata: personaLedger.buildPersonaMetadata({
              alias,
              account,
              handle: body?.handle,
              note: body?.note,
              tags: body?.tags,
            }),
          },
        });
        const attributes =
            (body?.attributes ??
             []).flatMap((entry) => normalizeAttributeInput(entry));
        if (attributes.length > 0) {
          await prisma.entity.createMany({
            data: personaLedger.buildPersonaAttributeEntities(
                actor.id, personaEntity.id, attributes),
          });
        }
        const tags = body?.tags;
        const hasTags = Array.isArray(tags) && tags.length > 0;
        await rt(
            {eventType: 'persona.create', source: 'api', payload: {hasTags}});
        const persona = await personaLedger.loadPersonaRecordById(
            prisma, actor.id, personaEntity.id);
        return {
          persona: persona ? personaLedger.personaRecordToResponse(persona) :
                             null
        };
      },
  );

  server.post(
      '/personas/generate',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const rt = withTelemetryBase(recordTelemetry, request);
        const body = request.body as {count?: number} | undefined;
        const count = clampCount(body?.count);
        const actor = await personaLedger.ensurePersonaActor(prisma, userId);
        const metadataPayload =
            Array.from({length: count})
                .map(
                    () => personaLedger.buildPersonaMetadata(
                        buildFakerPersona()));
        await prisma.entity.createMany({
          data: metadataPayload.map((row) => ({
                                      actorId: actor.id,
                                      kind: EntityKind.PERSONA,
                                      metadata: row,
                                    })),
        });
        let personas =
            await personaLedger.loadPersonaRecordsByActor(prisma, actor.id);
        const created = personas.slice(0, count);
        const attributeSeeds = created.flatMap(
            (persona) => buildSeedAttributes(persona.id, persona.tags));
        if (attributeSeeds.length > 0) {
          await prisma.entity.createMany({
            data: attributeSeeds.map(
                (entry) => ({
                  actorId: actor.id,
                  kind: EntityKind.PERSONA_ATTRIBUTE,
                  targetType: personaLedger.PERSONA_TARGET_TYPE,
                  targetId: entry.personaId,
                  metadata: {
                    category: entry.category,
                    value: entry.value,
                    weight: entry.weight,
                  },
                })),
          });
          personas =
              await personaLedger.loadPersonaRecordsByActor(prisma, actor.id);
        }
        await rt(
            {eventType: 'persona.generate', source: 'api', payload: {count}});
        return {
          personas: personas.slice(0, count).map(
              personaLedger.personaRecordToResponse)
        };
      },
  );

  server.put(
      '/personas/:id/attributes',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const rt = withTelemetryBase(recordTelemetry, request);
        const personaId = (request.params as {id?: string} | undefined)?.id;
        if (!personaId) {
          return reply.status(400).send({error: 'persona id is required'});
        }
        const actor = await personaLedger.ensurePersonaActor(prisma, userId);
        const persona = await personaLedger.loadPersonaRecordById(
            prisma, actor.id, personaId);
        if (!persona) {
          return reply.status(404).send({error: 'persona not found'});
        }
        const body =
            request.body as {attributes?: PersonaAttributeInput[]} | undefined;
        const attributes =
            (body?.attributes ??
             []).flatMap((entry) => normalizeAttributeInput(entry));
        const attributeOps: Prisma.PrismaPromise<unknown>[] = [
          prisma.entity.deleteMany({
            where: {
              actorId: actor.id,
              kind: EntityKind.PERSONA_ATTRIBUTE,
              targetType: personaLedger.PERSONA_TARGET_TYPE,
              targetId: personaId,
            },
          }),
        ];
        if (attributes.length > 0) {
          attributeOps.push(prisma.entity.createMany({
            data: personaLedger.buildPersonaAttributeEntities(
                actor.id, personaId, attributes),
          }));
        }
        await prisma.$transaction(attributeOps);
        const updated = await personaLedger.loadPersonaRecordById(
            prisma, actor.id, personaId);
        await rt({
          eventType: 'persona.attributes.update',
          source: 'api',
          payload: {count: attributes.length}
        });
        return {
          persona: updated ? personaLedger.personaRecordToResponse(updated) :
                             null
        };
      },
  );

  server.post(
      '/personas/compatibility/recompute',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const rt = withTelemetryBase(recordTelemetry, request);
        const actor = await personaLedger.ensurePersonaActor(prisma, userId);
        const personas =
            await personaLedger.loadPersonaRecordsByActor(prisma, actor.id);
        if (personas.length < 2) {
          await prisma.entity.deleteMany({
            where: {actorId: actor.id, kind: EntityKind.PERSONA_COMPATIBILITY},
          });
          return {compatibilities: []};
        }
        const payload = buildCompatibilityPayload(personas);
        await prisma.$transaction([
          prisma.entity.deleteMany({
            where: {actorId: actor.id, kind: EntityKind.PERSONA_COMPATIBILITY},
          }),
          prisma.entity.createMany({
            data: payload.map((entry) => ({
                                actorId: actor.id,
                                kind: EntityKind.PERSONA_COMPATIBILITY,
                                metadata: entry.metadata,
                              })),
          }),
        ]);
        const compatibilities =
            await loadCompatibilityRecords(prisma, actor.id);
        const personaMap = await personaLedger.loadPersonaMap(prisma, userId);
        const response =
            compatibilities
                .map((record) => serializeCompatibility(record, personaMap))
                .filter(
                    (item): item is NonNullable<typeof item> => Boolean(item))
                .sort((a, b) => b.jaccardScore - a.jaccardScore);
        await rt({
          eventType: 'persona.compatibility.recompute',
          source: 'api',
          payload: {count: response.length},
        });
        return {compatibilities: response};
      },
  );

  server.get(
      '/personas/compatibility',
      {preHandler: [server.authenticate]},
      async (request) => {
        const userId = (request.user as {sub: string}).sub;
        const actor = await personaLedger.ensurePersonaActor(prisma, userId);
        const compatibilities =
            await loadCompatibilityRecords(prisma, actor.id);
        const personaMap = await personaLedger.loadPersonaMap(prisma, userId);
        const serialized =
            compatibilities
                .map((record) => serializeCompatibility(record, personaMap))
                .filter(
                    (item): item is NonNullable<typeof item> => Boolean(item))
                .sort((a, b) => b.jaccardScore - a.jaccardScore);
        const rt = withTelemetryBase(recordTelemetry, request);
        await rt({
          eventType: 'persona.compatibility.list',
          source: 'api',
          payload: {count: serialized.length},
        });
        return {compatibilities: serialized};
      },
  );

  server.post(
      '/personas/compatibility/confusion',
      {preHandler: [server.authenticate]},
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const rt = withTelemetryBase(recordTelemetry, request);
        const body = request.body as {
          pairs?: ConfusionExampleInput[];
          threshold?: number;
          modelPath?: string;
        }
        |undefined;
        if (!Array.isArray(body?.pairs) || body.pairs.length === 0) {
          return reply.status(400).send({error: 'pairs array is required'});
        }
        if (body.pairs.length > 2000) {
          return reply.status(400).send(
              {error: 'limit pairs to 2000 per request'});
        }
        const threshold = (() => {
          const value = Number(body?.threshold ?? 0.5);
          if (!Number.isFinite(value)) return 0.5;
          return Math.min(Math.max(value, 0), 1);
        })();
        const {counts, details, missing} = await computeConfusionFromPairs(
            body.pairs,
            userId,
            prisma,
            threshold,
            body?.modelPath,
        );
        const total = counts.tp + counts.fp + counts.tn + counts.fn;
        const precision = counts.tp + counts.fp === 0 ?
            0 :
            counts.tp / (counts.tp + counts.fp);
        const recall = counts.tp + counts.fn === 0 ?
            0 :
            counts.tp / (counts.tp + counts.fn);
        const accuracy = total === 0 ? 0 : (counts.tp + counts.tn) / total;
        const f1 = precision + recall === 0 ?
            0 :
            (2 * precision * recall) / (precision + recall);
        await rt({
          eventType: 'persona.compatibility.confusion',
          source: 'api',
          payload: {evaluated: details.length, missing, threshold},
        });
        return {
          threshold,
          counts,
          metrics: {
            accuracy: Number(accuracy.toFixed(4)),
            precision: Number(precision.toFixed(4)),
            recall: Number(recall.toFixed(4)),
            f1: Number(f1.toFixed(4)),
          },
          evaluated: details.length,
          missing,
          details,
        };
      },
  );
}
