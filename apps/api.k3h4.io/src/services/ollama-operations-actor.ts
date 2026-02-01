import {ActorType, Prisma, PrismaClient} from '@prisma/client';

const OLLAMA_ACTOR_LABEL = 'Ollama Operations';
const OLLAMA_ACTOR_SOURCE = 'k3h4-ollama';

type PrismaTx = PrismaClient|Prisma.TransactionClient;

export async function ensureOllamaOperationsActor(
    tx: PrismaTx, userId: string) {
  const existing = await tx.actor.findFirst({
    where: {userId, type: ActorType.AI_OPERATION},
  });
  if (existing) return existing;
  return tx.actor.create({
    data: {
      userId,
      type: ActorType.AI_OPERATION,
      label: OLLAMA_ACTOR_LABEL,
      source: OLLAMA_ACTOR_SOURCE,
    },
  });
}

export async function findOllamaOperationsActor(
    prisma: PrismaClient|Prisma.TransactionClient, userId: string) {
  return prisma.actor.findFirst({
    where: {userId, type: ActorType.AI_OPERATION},
  });
}
