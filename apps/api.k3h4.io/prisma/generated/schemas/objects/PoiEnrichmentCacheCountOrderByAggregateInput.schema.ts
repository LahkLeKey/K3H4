import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  includeHash: SortOrderSchema.optional(),
  payload: SortOrderSchema.optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional()
}).strict();
export const PoiEnrichmentCacheCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PoiEnrichmentCacheCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheCountOrderByAggregateInput>;
export const PoiEnrichmentCacheCountOrderByAggregateInputObjectZodSchema = makeSchema();
