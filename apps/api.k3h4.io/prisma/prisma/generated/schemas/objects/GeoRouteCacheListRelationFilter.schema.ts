import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheWhereInputObjectSchema as GeoRouteCacheWhereInputObjectSchema } from './GeoRouteCacheWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => GeoRouteCacheWhereInputObjectSchema).optional(),
  some: z.lazy(() => GeoRouteCacheWhereInputObjectSchema).optional(),
  none: z.lazy(() => GeoRouteCacheWhereInputObjectSchema).optional()
}).strict();
export const GeoRouteCacheListRelationFilterObjectSchema: z.ZodType<Prisma.GeoRouteCacheListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheListRelationFilter>;
export const GeoRouteCacheListRelationFilterObjectZodSchema = makeSchema();
