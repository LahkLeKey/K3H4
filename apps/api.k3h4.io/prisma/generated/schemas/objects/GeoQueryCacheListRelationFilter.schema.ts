import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoQueryCacheWhereInputObjectSchema as GeoQueryCacheWhereInputObjectSchema } from './GeoQueryCacheWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => GeoQueryCacheWhereInputObjectSchema).optional(),
  some: z.lazy(() => GeoQueryCacheWhereInputObjectSchema).optional(),
  none: z.lazy(() => GeoQueryCacheWhereInputObjectSchema).optional()
}).strict();
export const GeoQueryCacheListRelationFilterObjectSchema: z.ZodType<Prisma.GeoQueryCacheListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheListRelationFilter>;
export const GeoQueryCacheListRelationFilterObjectZodSchema = makeSchema();
