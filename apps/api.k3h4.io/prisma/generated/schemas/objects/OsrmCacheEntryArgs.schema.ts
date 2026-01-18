import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntrySelectObjectSchema as OsrmCacheEntrySelectObjectSchema } from './OsrmCacheEntrySelect.schema';
import { OsrmCacheEntryIncludeObjectSchema as OsrmCacheEntryIncludeObjectSchema } from './OsrmCacheEntryInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => OsrmCacheEntrySelectObjectSchema).optional(),
  include: z.lazy(() => OsrmCacheEntryIncludeObjectSchema).optional()
}).strict();
export const OsrmCacheEntryArgsObjectSchema = makeSchema();
export const OsrmCacheEntryArgsObjectZodSchema = makeSchema();
