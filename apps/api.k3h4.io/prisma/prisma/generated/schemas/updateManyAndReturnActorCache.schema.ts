import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorCacheSelectObjectSchema as ActorCacheSelectObjectSchema } from './objects/ActorCacheSelect.schema';
import { ActorCacheUpdateManyMutationInputObjectSchema as ActorCacheUpdateManyMutationInputObjectSchema } from './objects/ActorCacheUpdateManyMutationInput.schema';
import { ActorCacheWhereInputObjectSchema as ActorCacheWhereInputObjectSchema } from './objects/ActorCacheWhereInput.schema';

export const ActorCacheUpdateManyAndReturnSchema: z.ZodType<Prisma.ActorCacheUpdateManyAndReturnArgs> = z.object({ select: ActorCacheSelectObjectSchema.optional(), data: ActorCacheUpdateManyMutationInputObjectSchema, where: ActorCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ActorCacheUpdateManyAndReturnArgs>;

export const ActorCacheUpdateManyAndReturnZodSchema = z.object({ select: ActorCacheSelectObjectSchema.optional(), data: ActorCacheUpdateManyMutationInputObjectSchema, where: ActorCacheWhereInputObjectSchema.optional() }).strict();