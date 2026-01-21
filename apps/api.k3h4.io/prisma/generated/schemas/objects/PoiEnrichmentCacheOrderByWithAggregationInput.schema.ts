import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { PoiEnrichmentCacheCountOrderByAggregateInputObjectSchema as PoiEnrichmentCacheCountOrderByAggregateInputObjectSchema } from './PoiEnrichmentCacheCountOrderByAggregateInput.schema';
import { PoiEnrichmentCacheMaxOrderByAggregateInputObjectSchema as PoiEnrichmentCacheMaxOrderByAggregateInputObjectSchema } from './PoiEnrichmentCacheMaxOrderByAggregateInput.schema';
import { PoiEnrichmentCacheMinOrderByAggregateInputObjectSchema as PoiEnrichmentCacheMinOrderByAggregateInputObjectSchema } from './PoiEnrichmentCacheMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  includeHash: SortOrderSchema.optional(),
  payload: SortOrderSchema.optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  _count: z.lazy(() => PoiEnrichmentCacheCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PoiEnrichmentCacheMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PoiEnrichmentCacheMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PoiEnrichmentCacheOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PoiEnrichmentCacheOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiEnrichmentCacheOrderByWithAggregationInput>;
export const PoiEnrichmentCacheOrderByWithAggregationInputObjectZodSchema = makeSchema();
