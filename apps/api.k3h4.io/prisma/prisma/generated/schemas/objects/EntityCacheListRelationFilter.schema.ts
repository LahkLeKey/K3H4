import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCacheWhereInputObjectSchema as EntityCacheWhereInputObjectSchema } from './EntityCacheWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => EntityCacheWhereInputObjectSchema).optional(),
  some: z.lazy(() => EntityCacheWhereInputObjectSchema).optional(),
  none: z.lazy(() => EntityCacheWhereInputObjectSchema).optional()
}).strict();
export const EntityCacheListRelationFilterObjectSchema: z.ZodType<Prisma.EntityCacheListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheListRelationFilter>;
export const EntityCacheListRelationFilterObjectZodSchema = makeSchema();
