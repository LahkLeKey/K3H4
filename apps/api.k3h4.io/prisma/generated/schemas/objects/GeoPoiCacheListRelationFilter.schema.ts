import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoPoiCacheWhereInputObjectSchema as GeoPoiCacheWhereInputObjectSchema } from './GeoPoiCacheWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => GeoPoiCacheWhereInputObjectSchema).optional(),
  some: z.lazy(() => GeoPoiCacheWhereInputObjectSchema).optional(),
  none: z.lazy(() => GeoPoiCacheWhereInputObjectSchema).optional()
}).strict();
export const GeoPoiCacheListRelationFilterObjectSchema: z.ZodType<Prisma.GeoPoiCacheListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheListRelationFilter>;
export const GeoPoiCacheListRelationFilterObjectZodSchema = makeSchema();
