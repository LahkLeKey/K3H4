import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorCacheSelectObjectSchema as ActorCacheSelectObjectSchema } from './objects/ActorCacheSelect.schema';
import { ActorCacheCreateManyInputObjectSchema as ActorCacheCreateManyInputObjectSchema } from './objects/ActorCacheCreateManyInput.schema';

export const ActorCacheCreateManyAndReturnSchema: z.ZodType<Prisma.ActorCacheCreateManyAndReturnArgs> = z.object({ select: ActorCacheSelectObjectSchema.optional(), data: z.union([ ActorCacheCreateManyInputObjectSchema, z.array(ActorCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ActorCacheCreateManyAndReturnArgs>;

export const ActorCacheCreateManyAndReturnZodSchema = z.object({ select: ActorCacheSelectObjectSchema.optional(), data: z.union([ ActorCacheCreateManyInputObjectSchema, z.array(ActorCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();