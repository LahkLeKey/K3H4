import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  includeHash: z.boolean().optional(),
  payload: z.boolean().optional(),
  fetchedAt: z.boolean().optional(),
  expiresAt: z.boolean().optional()
}).strict();
export const PoiEnrichmentCacheSelectObjectSchema: z.ZodType<Prisma.PoiEnrichmentCacheSelect> = makeSchema() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheSelect>;
export const PoiEnrichmentCacheSelectObjectZodSchema = makeSchema();
