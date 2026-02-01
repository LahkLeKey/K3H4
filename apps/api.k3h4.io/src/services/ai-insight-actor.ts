import {ActorType, Entity, EntityKind, Prisma, PrismaClient} from '@prisma/client';

const AI_ACTOR_LABEL = 'AI Insight Ledger';
const AI_ACTOR_SOURCE = 'k3h4-ai';
const AI_ENTITY_SOURCE = 'k3h4-ai';

type PrismaTx = PrismaClient|Prisma.TransactionClient;

const asRecord = (value: Prisma.JsonValue|null|undefined) => {
  if (value && typeof value === 'object' && !Array.isArray(value))
    return value as Record<string, unknown>;
  return {} as Record<string, unknown>;
};

const stringOrNull = (value: unknown) => {
  if (typeof value === 'string') return value;
  if (value == null) return null;
  return String(value);
};

const buildMetadata = (payload: AiInsightCreateOptions): Prisma.JsonValue => ({
  description: payload.description,
  targetLabel: payload.targetLabel ?? null,
  model: payload.model ?? null,
  systemPrompt: payload.systemPrompt ?? null,
  metadata: payload.metadata ?? null,
  payload: payload.payload ?? null,
});

export type AiInsightPayload = {
  id: string; description: string; targetType: string | null;
  targetId: string | null;
  targetLabel: string | null;
  metadata: unknown | null;
  payload: unknown | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AiInsightCreateOptions = {
  userId: string; description: string;
  targetType?: string | null;
  targetId?: string | null;
  targetLabel?: string | null;
  metadata?: unknown;
  payload?: unknown;
  model?: string | null;
  systemPrompt?: string | null;
};

export async function ensureAiInsightActor(
    tx: PrismaTx, userId: string, metadata?: Prisma.JsonValue|null) {
  const existing = await tx.actor.findFirst({
    where: {userId, type: ActorType.AI_INSIGHT},
  });
  if (existing) return existing;
  return tx.actor.create({
    data: {
      userId,
      type: ActorType.AI_INSIGHT,
      label: AI_ACTOR_LABEL,
      source: AI_ACTOR_SOURCE,
      metadata: metadata ?? undefined,
    },
  });
}

export async function findAiInsightActor(
    prisma: PrismaClient|Prisma.TransactionClient, userId: string) {
  return prisma.actor.findFirst({where: {userId, type: ActorType.AI_INSIGHT}});
}

const buildAiInsightPayload = (entity: Entity): AiInsightPayload => {
  const metadata = asRecord(entity.metadata);
  return {
    id: entity.id,
    description: stringOrNull(metadata.description) ?? entity.name ?? '',
    targetType: entity.targetType ?? null,
    targetId: entity.targetId ?? null,
    targetLabel: stringOrNull(metadata.targetLabel),
    metadata: metadata.metadata ?? null,
    payload: metadata.payload ?? null,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
};

export async function loadAiInsights(
    prisma: PrismaClient|Prisma.TransactionClient, userId: string,
    targetType?: string|null, limit?: number) {
  const actor = await findAiInsightActor(prisma, userId);
  if (!actor) return [] as AiInsightPayload[];
  const where: Prisma.EntityWhereInput = {
    actorId: actor.id,
    kind: EntityKind.AI_INSIGHT,
  };
  if (targetType) where.targetType = targetType;
  const findArgs: Prisma.EntityFindManyArgs = {
    where,
    orderBy: {createdAt: 'desc'},
  };
  if (limit !== undefined) findArgs.take = limit;
  const entities = await prisma.entity.findMany(findArgs);
  return entities.map(buildAiInsightPayload);
}

export async function createAiInsight(
    tx: PrismaTx, options: AiInsightCreateOptions) {
  const actor = await ensureAiInsightActor(tx, options.userId);
  const entity = await tx.entity.create({
    data: {
      actorId: actor.id,
      kind: EntityKind.AI_INSIGHT,
      source: AI_ENTITY_SOURCE,
      targetType: options.targetType ?? null,
      targetId: options.targetId ?? null,
      name: options.description,
      metadata: buildMetadata(options),
    },
  });
  return buildAiInsightPayload(entity);
}
