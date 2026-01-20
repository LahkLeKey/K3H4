import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerCacheEntrySelectObjectSchema as MaptilerCacheEntrySelectObjectSchema } from './MaptilerCacheEntrySelect.schema';
import { MaptilerCacheEntryIncludeObjectSchema as MaptilerCacheEntryIncludeObjectSchema } from './MaptilerCacheEntryInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => MaptilerCacheEntrySelectObjectSchema).optional(),
  include: z.lazy(() => MaptilerCacheEntryIncludeObjectSchema).optional()
}).strict();
export const MaptilerCacheEntryArgsObjectSchema = makeSchema();
export const MaptilerCacheEntryArgsObjectZodSchema = makeSchema();
