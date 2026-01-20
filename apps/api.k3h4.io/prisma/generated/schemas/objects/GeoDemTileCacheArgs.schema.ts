import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDemTileCacheSelectObjectSchema as GeoDemTileCacheSelectObjectSchema } from './GeoDemTileCacheSelect.schema';
import { GeoDemTileCacheIncludeObjectSchema as GeoDemTileCacheIncludeObjectSchema } from './GeoDemTileCacheInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => GeoDemTileCacheSelectObjectSchema).optional(),
  include: z.lazy(() => GeoDemTileCacheIncludeObjectSchema).optional()
}).strict();
export const GeoDemTileCacheArgsObjectSchema = makeSchema();
export const GeoDemTileCacheArgsObjectZodSchema = makeSchema();
