import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCacheSelectObjectSchema as EntityCacheSelectObjectSchema } from './EntityCacheSelect.schema';
import { EntityCacheIncludeObjectSchema as EntityCacheIncludeObjectSchema } from './EntityCacheInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => EntityCacheSelectObjectSchema).optional(),
  include: z.lazy(() => EntityCacheIncludeObjectSchema).optional()
}).strict();
export const EntityCacheArgsObjectSchema = makeSchema();
export const EntityCacheArgsObjectZodSchema = makeSchema();
