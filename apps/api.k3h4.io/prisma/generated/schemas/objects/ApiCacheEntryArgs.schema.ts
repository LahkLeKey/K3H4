import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ApiCacheEntrySelectObjectSchema as ApiCacheEntrySelectObjectSchema } from './ApiCacheEntrySelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ApiCacheEntrySelectObjectSchema).optional()
}).strict();
export const ApiCacheEntryArgsObjectSchema = makeSchema();
export const ApiCacheEntryArgsObjectZodSchema = makeSchema();
