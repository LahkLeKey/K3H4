import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoQueryCacheSelectObjectSchema as GeoQueryCacheSelectObjectSchema } from './GeoQueryCacheSelect.schema';
import { GeoQueryCacheIncludeObjectSchema as GeoQueryCacheIncludeObjectSchema } from './GeoQueryCacheInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => GeoQueryCacheSelectObjectSchema).optional(),
  include: z.lazy(() => GeoQueryCacheIncludeObjectSchema).optional()
}).strict();
export const GeoQueryCacheArgsObjectSchema = makeSchema();
export const GeoQueryCacheArgsObjectZodSchema = makeSchema();
