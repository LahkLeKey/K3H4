import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheSelectObjectSchema as GeoRouteCacheSelectObjectSchema } from './GeoRouteCacheSelect.schema';
import { GeoRouteCacheIncludeObjectSchema as GeoRouteCacheIncludeObjectSchema } from './GeoRouteCacheInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => GeoRouteCacheSelectObjectSchema).optional(),
  include: z.lazy(() => GeoRouteCacheIncludeObjectSchema).optional()
}).strict();
export const GeoRouteCacheArgsObjectSchema = makeSchema();
export const GeoRouteCacheArgsObjectZodSchema = makeSchema();
