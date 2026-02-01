import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityCacheSelectObjectSchema as EntityCacheSelectObjectSchema } from './objects/EntityCacheSelect.schema';
import { EntityCacheCreateManyInputObjectSchema as EntityCacheCreateManyInputObjectSchema } from './objects/EntityCacheCreateManyInput.schema';

export const EntityCacheCreateManyAndReturnSchema: z.ZodType<Prisma.EntityCacheCreateManyAndReturnArgs> = z.object({ select: EntityCacheSelectObjectSchema.optional(), data: z.union([ EntityCacheCreateManyInputObjectSchema, z.array(EntityCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.EntityCacheCreateManyAndReturnArgs>;

export const EntityCacheCreateManyAndReturnZodSchema = z.object({ select: EntityCacheSelectObjectSchema.optional(), data: z.union([ EntityCacheCreateManyInputObjectSchema, z.array(EntityCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();