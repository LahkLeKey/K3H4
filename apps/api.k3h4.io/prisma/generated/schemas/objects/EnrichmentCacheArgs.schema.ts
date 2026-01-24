import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EnrichmentCacheSelectObjectSchema as EnrichmentCacheSelectObjectSchema } from './EnrichmentCacheSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => EnrichmentCacheSelectObjectSchema).optional()
}).strict();
export const EnrichmentCacheArgsObjectSchema = makeSchema();
export const EnrichmentCacheArgsObjectZodSchema = makeSchema();
