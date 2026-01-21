import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  includeHash: SortOrderSchema.optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional()
}).strict();
export const PoiEnrichmentCacheMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PoiEnrichmentCacheMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheMinOrderByAggregateInput>;
export const PoiEnrichmentCacheMinOrderByAggregateInputObjectZodSchema = makeSchema();
