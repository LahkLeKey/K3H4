import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorCacheSelectObjectSchema as ActorCacheSelectObjectSchema } from './ActorCacheSelect.schema';
import { ActorCacheIncludeObjectSchema as ActorCacheIncludeObjectSchema } from './ActorCacheInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ActorCacheSelectObjectSchema).optional(),
  include: z.lazy(() => ActorCacheIncludeObjectSchema).optional()
}).strict();
export const ActorCacheArgsObjectSchema = makeSchema();
export const ActorCacheArgsObjectZodSchema = makeSchema();
