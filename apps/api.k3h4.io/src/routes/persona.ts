import { faker } from "@faker-js/faker";
import { type Prisma, type PrismaClient } from "@prisma/client";
import { type FastifyInstance } from "fastify";
import { type RecordTelemetryFn } from "./types";
import { runOnnxCompatibility, type CompatFeatureVector } from "../lib/compat-onnx";

type PersonaWithAttributes = Prisma.PersonaGetPayload<{ include: { attributes: true } }>;

type CompatibilityWithNodes = Prisma.PersonaCompatibilityGetPayload<{
  include: {
    source: { include: { attributes: true } };
    target: { include: { attributes: true } };
  };
}>;

const serializeAttributes = (attrs: { id: string; category: string; value: string; weight: number }[] | undefined) =>
  attrs?.map((attr) => ({ id: attr.id, category: attr.category, value: attr.value, weight: attr.weight })) ?? [];

const tagArray = (value: Prisma.JsonValue | null | undefined) => (Array.isArray(value) ? (value as string[]).filter((tag) => typeof tag === "string" && tag.trim().length > 0) : []);

const serializePersona = (persona: {
  id: string;
  alias: string;
  account: string;
  handle: string | null;
  note: string | null;
  tags: Prisma.JsonValue | null;
  createdAt: Date;
  updatedAt: Date;
  attributes?: { id: string; category: string; value: string; weight: number }[];
}) => ({
  ...persona,
  handle: persona.handle ?? undefined,
  note: persona.note ?? undefined,
  tags: Array.isArray(persona.tags) ? (persona.tags as string[]) : [],
  attributes: serializeAttributes(persona.attributes),
});

const buildFakerPersona = () => ({
  alias: faker.person.fullName(),
  account: faker.internet.email().toLowerCase(),
  handle: `@${faker.internet.username().toLowerCase()}`,
  note: faker.hacker.phrase(),
  tags: [faker.hacker.noun(), faker.company.buzzNoun()].map((tag) => tag.toLowerCase()),
});

const buildSeedAttributes = (personaId: string, userId: string, tags: string[]) => {
  const industries = ["fintech", "logistics", "commerce", "gaming", "media", "operations"];
  const stacks = ["node", "python", "go", "rust", "rails"];
  const tones = ["analytical", "playful", "direct", "technical", "empathetic"];
  return [
    { userId, personaId, category: "industry", value: tags[0]?.toLowerCase() || faker.helpers.arrayElement(industries) },
    { userId, personaId, category: "stack", value: faker.helpers.arrayElement(stacks) },
    { userId, personaId, category: "tone", value: faker.helpers.arrayElement(tones) },
  ];
};

const normalizeToken = (value: string) => value.trim().toLowerCase().replace(/\s+/g, "-");

const tokensForPersona = (persona: PersonaWithAttributes) => {
  const tokens = new Set<string>();
  tokens.add(normalizeToken(persona.alias));
  if (persona.handle) tokens.add(normalizeToken(persona.handle));
  if (Array.isArray(persona.tags)) {
    (persona.tags as string[]).forEach((tag) => tokens.add(normalizeToken(tag)));
  }
  persona.attributes?.forEach((attr) => {
    tokens.add(`${normalizeToken(attr.category)}:${normalizeToken(attr.value)}`);
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
  const score = unionCount === 0 ? 0 : Number((intersectionCount / unionCount).toFixed(4));
  return { score, intersectionCount, unionCount, overlap: Array.from(intersection) };
};

const buildCompatibilityPayload = (personas: PersonaWithAttributes[]) => {
  const payload: Prisma.PersonaCompatibilityCreateManyInput[] = [];
  for (let i = 0; i < personas.length; i += 1) {
    for (let j = i + 1; j < personas.length; j += 1) {
      const left = personas[i];
      const right = personas[j];
      const leftTokens = tokensForPersona(left);
      const rightTokens = tokensForPersona(right);
      const { score, intersectionCount, unionCount, overlap } = calculateJaccard(leftTokens, rightTokens);
      payload.push({
        userId: left.userId,
        sourceId: left.id,
        targetId: right.id,
        jaccardScore: score,
        intersectionCount,
        unionCount,
        overlappingTokens: overlap,
      });
    }
  }
  return payload;
};

const serializeCompatibility = (compat: CompatibilityWithNodes) => ({
  id: compat.id,
  jaccardScore: compat.jaccardScore,
  intersectionCount: compat.intersectionCount,
  unionCount: compat.unionCount,
  overlappingTokens: Array.isArray(compat.overlappingTokens) ? (compat.overlappingTokens as string[]) : [],
  computedAt: compat.computedAt.toISOString(),
  sourceId: compat.sourceId,
  targetId: compat.targetId,
  status: compat.status,
  rationale: compat.rationale ?? undefined,
  source: serializePersona(compat.source),
  target: serializePersona(compat.target),
});

const pairKey = (a: string, b: string) => (a < b ? `${a}|${b}` : `${b}|${a}`);

const computeConfusionFromPairs = async (
  pairs: ConfusionExampleInput[],
  userId: string,
  prisma: PrismaClient,
  threshold: number,
  modelPath?: string,
) => {
  const normalizedPairs = pairs
    .map((pair) => ({
      sourceId: pair.sourceId?.trim(),
      targetId: pair.targetId?.trim(),
      label: pair.label,
    }))
    .filter((pair) => !!pair.sourceId && !!pair.targetId && typeof pair.label === "boolean") as { sourceId: string; targetId: string; label: boolean }[];

  if (normalizedPairs.length === 0) return { counts: emptyConfusion, details: [], missing: pairs.length };

  const searchPairs = normalizedPairs.map((pair) => ({ sourceId: pair.sourceId, targetId: pair.targetId }));

  const compatibilities = await prisma.personaCompatibility.findMany({
    where: {
      userId,
      OR: searchPairs.flatMap((pair) => ([
        { sourceId: pair.sourceId, targetId: pair.targetId },
        { sourceId: pair.targetId, targetId: pair.sourceId },
      ])),
    },
    include: {
      source: { include: { attributes: true } },
      target: { include: { attributes: true } },
    },
  });

  const compatMap = new Map<string, CompatibilityWithNodes>();
  compatibilities.forEach((compat) => compatMap.set(pairKey(compat.sourceId, compat.targetId), compat));

  const counts: ConfusionCounts = { ...emptyConfusion };
  const details: Array<{
    id: string;
    probability: number;
    predicted: boolean;
    label: boolean;
    usedOnnx: boolean;
    sourceId: string;
    targetId: string;
    jaccardScore: number;
  }> = [];

  for (const pair of normalizedPairs) {
    const key = pairKey(pair.sourceId, pair.targetId);
    const compat = compatMap.get(key);
    if (!compat) continue;

    const features: CompatFeatureVector = {
      jaccardScore: compat.jaccardScore,
      intersectionCount: compat.intersectionCount,
      unionCount: compat.unionCount,
    };
    const { probability, usedOnnx } = await runOnnxCompatibility(features, modelPath);
    const predicted = probability >= threshold;

    if (pair.label && predicted) counts.tp += 1;
    else if (!pair.label && predicted) counts.fp += 1;
    else if (!pair.label && !predicted) counts.tn += 1;
    else counts.fn += 1;

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

  return { counts, details, missing: normalizedPairs.length - details.length };
};

type ConfusionExampleInput = {
  sourceId?: string;
  targetId?: string;
  label?: boolean;
};

type ConfusionCounts = {
  tp: number;
  fp: number;
  tn: number;
  fn: number;
};

const emptyConfusion: ConfusionCounts = { tp: 0, fp: 0, tn: 0, fn: 0 };

const clampThreshold = (value: unknown) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return 0.5;
  return Math.min(Math.max(num, 0), 1);
};

export function registerPersonaRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  server.get(
    "/personas",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;

      let personas = await prisma.persona.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, include: { attributes: true } });

      if (personas.length === 0) {
        const seedPayload = Array.from({ length: 3 }).map(() => ({ ...buildFakerPersona(), userId }));
        await prisma.persona.createMany({ data: seedPayload });
        personas = await prisma.persona.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, include: { attributes: true } });
        const attributeSeeds = personas.flatMap((p) => buildSeedAttributes(p.id, userId, tagArray(p.tags)));
        if (attributeSeeds.length > 0) {
          await prisma.personaAttribute.createMany({ data: attributeSeeds, skipDuplicates: true });
          personas = await prisma.persona.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, include: { attributes: true } });
        }
        await recordTelemetry(request, {
          eventType: "persona.seed",
          source: "api",
          payload: { count: seedPayload.length },
        });
      }

      await recordTelemetry(request, {
        eventType: "persona.list",
        source: "api",
        payload: { count: personas.length },
      });

      return { personas: personas.map(serializePersona) };
    },
  );

  server.post(
    "/personas",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as {
        alias?: string;
        account?: string;
        handle?: string;
        note?: string;
        tags?: string[];
        attributes?: { category?: string; values?: string[]; weight?: number }[];
      } | undefined;

      const alias = body?.alias?.trim();
      const account = body?.account?.trim();
      if (!alias || !account) return reply.status(400).send({ error: "alias and account are required" });

      const attributes = (body?.attributes ?? [])
        .flatMap((entry) => {
          const category = entry.category?.trim();
          if (!category) return [];
          const weight = Number.isFinite(entry.weight) ? Number(entry.weight) : 1;
          return (entry.values ?? []).map((value) => ({
            category,
            value: value.trim(),
            weight: weight || 1,
          })).filter((attr) => attr.value.length > 0);
        });

      const persona = await prisma.persona.create({
        data: {
          userId,
          alias,
          account,
          handle: body?.handle?.trim() || null,
          note: body?.note?.trim() || null,
          tags: Array.isArray(body?.tags) ? body?.tags : [],
        },
      });

      if (attributes.length > 0) {
        await prisma.personaAttribute.createMany({ data: attributes.map((attr) => ({ ...attr, userId, personaId: persona.id })) });
      }

      await recordTelemetry(request, {
        eventType: "persona.create",
        source: "api",
        payload: { hasTags: Array.isArray(body?.tags) && body?.tags.length > 0 },
      });

      const withAttributes = await prisma.persona.findUnique({ where: { id: persona.id }, include: { attributes: true } });
      return { persona: withAttributes ? serializePersona(withAttributes) : serializePersona(persona) };
    },
  );

  server.post(
    "/personas/generate",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as { count?: number } | undefined;
      const count = (() => {
        const parsed = Number(body?.count ?? 1);
        if (!Number.isFinite(parsed)) return 1;
        return Math.min(Math.max(Math.floor(parsed), 1), 10);
      })();

      const payload = Array.from({ length: count }).map(() => ({ ...buildFakerPersona(), userId }));
      await prisma.persona.createMany({ data: payload });
      let personas = await prisma.persona.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: count, include: { attributes: true } });

      const attributeSeeds = personas.flatMap((p) => buildSeedAttributes(p.id, userId, tagArray(p.tags)));
      if (attributeSeeds.length > 0) {
        await prisma.personaAttribute.createMany({ data: attributeSeeds, skipDuplicates: true });
        personas = await prisma.persona.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: count, include: { attributes: true } });
      }

      await recordTelemetry(request, {
        eventType: "persona.generate",
        source: "api",
        payload: { count },
      });

      return { personas: personas.map(serializePersona) };
    },
  );

  server.put(
    "/personas/:id/attributes",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const personaId = (request.params as { id?: string } | undefined)?.id;
      if (!personaId) return reply.status(400).send({ error: "persona id is required" });

      const persona = await prisma.persona.findFirst({ where: { id: personaId, userId } });
      if (!persona) return reply.status(404).send({ error: "persona not found" });

      const body = request.body as { attributes?: { category?: string; values?: string[]; weight?: number }[] } | undefined;
      const attributes = (body?.attributes ?? [])
        .flatMap((entry) => {
          const category = entry.category?.trim();
          if (!category) return [];
          const weight = Number.isFinite(entry.weight) ? Number(entry.weight) : 1;
          return (entry.values ?? []).map((value) => ({
            category,
            value: value.trim(),
            weight: weight || 1,
          })).filter((attr) => attr.value.length > 0);
        });

      const attributeTx: Prisma.PrismaPromise<unknown>[] = [
        prisma.personaAttribute.deleteMany({ where: { personaId } }),
      ];

      if (attributes.length > 0) {
        attributeTx.push(prisma.personaAttribute.createMany({ data: attributes.map((attr) => ({ ...attr, userId, personaId })) }));
      }

      await prisma.$transaction(attributeTx);

      const updated = await prisma.persona.findUnique({ where: { id: personaId }, include: { attributes: true } });

      await recordTelemetry(request, {
        eventType: "persona.attributes.update",
        source: "api",
        payload: { count: attributes.length },
      });

      return { persona: updated ? serializePersona(updated) : serializePersona(persona) };
    },
  );

  server.post(
    "/personas/compatibility/recompute",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const personas = await prisma.persona.findMany({ where: { userId }, include: { attributes: true } });

      if (personas.length < 2) {
        await prisma.personaCompatibility.deleteMany({ where: { userId } });
        return { compatibilities: [] };
      }

      const payload = buildCompatibilityPayload(personas);

      await prisma.$transaction([
        prisma.personaCompatibility.deleteMany({ where: { userId } }),
        prisma.personaCompatibility.createMany({ data: payload, skipDuplicates: true }),
      ]);

      const compatibilities = await prisma.personaCompatibility.findMany({
        where: { userId },
        include: {
          source: { include: { attributes: true } },
          target: { include: { attributes: true } },
        },
        orderBy: { jaccardScore: "desc" },
      });

      await recordTelemetry(request, {
        eventType: "persona.compatibility.recompute",
        source: "api",
        payload: { count: compatibilities.length },
      });

      return { compatibilities: compatibilities.map(serializeCompatibility) };
    },
  );

  server.get(
    "/personas/compatibility",
    { preHandler: [server.authenticate] },
    async (request) => {
      const userId = (request.user as { sub: string }).sub;
      const personaId = (request.query as { personaId?: string } | undefined)?.personaId;

      const compatibilities = await prisma.personaCompatibility.findMany({
        where: personaId ? { userId, OR: [{ sourceId: personaId }, { targetId: personaId }] } : { userId },
        include: {
          source: { include: { attributes: true } },
          target: { include: { attributes: true } },
        },
        orderBy: { jaccardScore: "desc" },
      });

      await recordTelemetry(request, {
        eventType: "persona.compatibility.list",
        source: "api",
        payload: { count: compatibilities.length },
      });

      return { compatibilities: compatibilities.map(serializeCompatibility) };
    },
  );

  server.post(
    "/personas/compatibility/confusion",
    { preHandler: [server.authenticate] },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as { pairs?: ConfusionExampleInput[]; threshold?: number; modelPath?: string } | undefined;

      if (!Array.isArray(body?.pairs) || body.pairs.length === 0) {
        return reply.status(400).send({ error: "pairs array is required" });
      }
      if (body.pairs.length > 2000) {
        return reply.status(400).send({ error: "limit pairs to 2000 per request" });
      }

      const threshold = clampThreshold(body?.threshold ?? 0.5);
      const { counts, details, missing } = await computeConfusionFromPairs(body.pairs, userId, prisma, threshold, body?.modelPath);
      const total = counts.tp + counts.fp + counts.tn + counts.fn;
      const precision = counts.tp + counts.fp === 0 ? 0 : counts.tp / (counts.tp + counts.fp);
      const recall = counts.tp + counts.fn === 0 ? 0 : counts.tp / (counts.tp + counts.fn);
      const accuracy = total === 0 ? 0 : (counts.tp + counts.tn) / total;
      const f1 = precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);

      await recordTelemetry(request, {
        eventType: "persona.compatibility.confusion",
        source: "api",
        payload: { evaluated: details.length, missing, threshold },
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
