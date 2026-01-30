import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorCacheUpdateManyMutationInputObjectSchema as ActorCacheUpdateManyMutationInputObjectSchema } from './objects/ActorCacheUpdateManyMutationInput.schema';
import { ActorCacheWhereInputObjectSchema as ActorCacheWhereInputObjectSchema } from './objects/ActorCacheWhereInput.schema';

export const ActorCacheUpdateManySchema: z.ZodType<Prisma.ActorCacheUpdateManyArgs> = z.object({ data: ActorCacheUpdateManyMutationInputObjectSchema, where: ActorCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ActorCacheUpdateManyArgs>;

export const ActorCacheUpdateManyZodSchema = z.object({ data: ActorCacheUpdateManyMutationInputObjectSchema, where: ActorCacheWhereInputObjectSchema.optional() }).strict();