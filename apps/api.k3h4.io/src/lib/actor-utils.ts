import {Prisma, PrismaClient} from '@prisma/client';

export type PrismaTx = PrismaClient|Prisma.TransactionClient;

export type EnsureActorOptions = {
  where: Prisma.ActorWhereInput; create: Prisma.ActorCreateInput;
};

export const ensureActor =
    async (tx: PrismaTx, options: EnsureActorOptions) => {
  const existing = await tx.actor.findFirst({where: options.where});
  if (existing) return existing;
  return tx.actor.create({data: options.create});
};

export const buildUserActorCreateInput =
    (userId: string|null|undefined, data: Prisma.ActorCreateInput) => {
      if (userId) {
        return {
          ...data,
          user: {connect: {id: userId}},
        } as Prisma.ActorCreateInput;
      }
      return data;
    };

export const actorWhereUserType = (userId: string|null, type: string) =>
    ({userId, type}) as Prisma.ActorWhereInput;
