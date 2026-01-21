import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  includeHash: z.literal(true).optional(),
  fetchedAt: z.literal(true).optional(),
  expiresAt: z.literal(true).optional()
}).strict();
export const PoiEnrichmentCacheMaxAggregateInputObjectSchema: z.ZodType<Prisma.PoiEnrichmentCacheMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheMaxAggregateInputType>;
export const PoiEnrichmentCacheMaxAggregateInputObjectZodSchema = makeSchema();
