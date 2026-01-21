import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PoiEnrichmentCacheSelectObjectSchema as PoiEnrichmentCacheSelectObjectSchema } from './PoiEnrichmentCacheSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PoiEnrichmentCacheSelectObjectSchema).optional()
}).strict();
export const PoiEnrichmentCacheArgsObjectSchema = makeSchema();
export const PoiEnrichmentCacheArgsObjectZodSchema = makeSchema();
