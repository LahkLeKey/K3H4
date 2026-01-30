import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  includeHash: z.literal(true).optional(),
  fetchedAt: z.literal(true).optional(),
  expiresAt: z.literal(true).optional()
}).strict();
export const PoiEnrichmentCacheMinAggregateInputObjectSchema: z.ZodType<Prisma.PoiEnrichmentCacheMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheMinAggregateInputType>;
export const PoiEnrichmentCacheMinAggregateInputObjectZodSchema = makeSchema();
