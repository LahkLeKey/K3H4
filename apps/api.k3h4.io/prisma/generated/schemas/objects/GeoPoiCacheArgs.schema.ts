import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoPoiCacheSelectObjectSchema as GeoPoiCacheSelectObjectSchema } from './GeoPoiCacheSelect.schema';
import { GeoPoiCacheIncludeObjectSchema as GeoPoiCacheIncludeObjectSchema } from './GeoPoiCacheInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => GeoPoiCacheSelectObjectSchema).optional(),
  include: z.lazy(() => GeoPoiCacheIncludeObjectSchema).optional()
}).strict();
export const GeoPoiCacheArgsObjectSchema = makeSchema();
export const GeoPoiCacheArgsObjectZodSchema = makeSchema();
