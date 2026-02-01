import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorCacheWhereInputObjectSchema as ActorCacheWhereInputObjectSchema } from './objects/ActorCacheWhereInput.schema';

export const ActorCacheDeleteManySchema: z.ZodType<Prisma.ActorCacheDeleteManyArgs> = z.object({ where: ActorCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ActorCacheDeleteManyArgs>;

export const ActorCacheDeleteManyZodSchema = z.object({ where: ActorCacheWhereInputObjectSchema.optional() }).strict();