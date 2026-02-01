import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorCacheCreateManyInputObjectSchema as ActorCacheCreateManyInputObjectSchema } from './objects/ActorCacheCreateManyInput.schema';

export const ActorCacheCreateManySchema: z.ZodType<Prisma.ActorCacheCreateManyArgs> = z.object({ data: z.union([ ActorCacheCreateManyInputObjectSchema, z.array(ActorCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ActorCacheCreateManyArgs>;

export const ActorCacheCreateManyZodSchema = z.object({ data: z.union([ ActorCacheCreateManyInputObjectSchema, z.array(ActorCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();