import {ActorType, Prisma, PrismaClient} from '@prisma/client';

const TELEMETRY_ACTOR_SOURCE_PREFIX = 'telemetry-user:';
const TELEMETRY_ACTOR_LABEL = 'Telemetry Events';
const TELEMETRY_ACTOR_NOTE =
    'Actor that owns telemetry history for a single user';

const cachedActorIds = new Map<string, string>();

const buildActorSource = (userId: string) =>
    `${TELEMETRY_ACTOR_SOURCE_PREFIX}${userId}`;

export const TELEMETRY_SESSION_TARGET = 'telemetry-session';

export const getTelemetryActorSource = (userId: string) =>
    buildActorSource(userId);

export async function ensureTelemetryActor(
    prisma: PrismaClient, userId: string) {
  const source = buildActorSource(userId);
  const existing = await prisma.actor.findFirst({
    where: {type: ActorType.TELEMETRY, source},
  });
  if (existing) return existing;
  return prisma.actor.create({
    data: {
      type: ActorType.TELEMETRY,
      label: `${TELEMETRY_ACTOR_LABEL} ${userId}`,
      source,
      note: TELEMETRY_ACTOR_NOTE,
      metadata: {userId} as Prisma.JsonValue,
    },
  });
}

export async function ensureTelemetryActorId(
    prisma: PrismaClient, userId: string) {
  const cached = cachedActorIds.get(userId);
  if (cached) return cached;
  const actor = await ensureTelemetryActor(prisma, userId);
  cachedActorIds.set(userId, actor.id);
  return actor.id;
}