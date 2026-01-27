import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheCountOutputTypeSelectObjectSchema as GeoRouteCacheCountOutputTypeSelectObjectSchema } from './GeoRouteCacheCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => GeoRouteCacheCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const GeoRouteCacheCountOutputTypeArgsObjectSchema = makeSchema();
export const GeoRouteCacheCountOutputTypeArgsObjectZodSchema = makeSchema();
