import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityCacheCreateManyInputObjectSchema as EntityCacheCreateManyInputObjectSchema } from './objects/EntityCacheCreateManyInput.schema';

export const EntityCacheCreateManySchema: z.ZodType<Prisma.EntityCacheCreateManyArgs> = z.object({ data: z.union([ EntityCacheCreateManyInputObjectSchema, z.array(EntityCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.EntityCacheCreateManyArgs>;

export const EntityCacheCreateManyZodSchema = z.object({ data: z.union([ EntityCacheCreateManyInputObjectSchema, z.array(EntityCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();