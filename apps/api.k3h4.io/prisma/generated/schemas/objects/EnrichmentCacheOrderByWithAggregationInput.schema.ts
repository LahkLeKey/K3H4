import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { EnrichmentCacheCountOrderByAggregateInputObjectSchema as EnrichmentCacheCountOrderByAggregateInputObjectSchema } from './EnrichmentCacheCountOrderByAggregateInput.schema';
import { EnrichmentCacheMaxOrderByAggregateInputObjectSchema as EnrichmentCacheMaxOrderByAggregateInputObjectSchema } from './EnrichmentCacheMaxOrderByAggregateInput.schema';
import { EnrichmentCacheMinOrderByAggregateInputObjectSchema as EnrichmentCacheMinOrderByAggregateInputObjectSchema } from './EnrichmentCacheMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  namespace: SortOrderSchema.optional(),
  kind: SortOrderSchema.optional(),
  sourceKey: SortOrderSchema.optional(),
  paramsHash: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  wikidataId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => EnrichmentCacheCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => EnrichmentCacheMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => EnrichmentCacheMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const EnrichmentCacheOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.EnrichmentCacheOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.EnrichmentCacheOrderByWithAggregationInput>;
export const EnrichmentCacheOrderByWithAggregationInputObjectZodSchema = makeSchema();
