import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MaptilerCacheEntryCountOrderByAggregateInputObjectSchema as MaptilerCacheEntryCountOrderByAggregateInputObjectSchema } from './MaptilerCacheEntryCountOrderByAggregateInput.schema';
import { MaptilerCacheEntryAvgOrderByAggregateInputObjectSchema as MaptilerCacheEntryAvgOrderByAggregateInputObjectSchema } from './MaptilerCacheEntryAvgOrderByAggregateInput.schema';
import { MaptilerCacheEntryMaxOrderByAggregateInputObjectSchema as MaptilerCacheEntryMaxOrderByAggregateInputObjectSchema } from './MaptilerCacheEntryMaxOrderByAggregateInput.schema';
import { MaptilerCacheEntryMinOrderByAggregateInputObjectSchema as MaptilerCacheEntryMinOrderByAggregateInputObjectSchema } from './MaptilerCacheEntryMinOrderByAggregateInput.schema';
import { MaptilerCacheEntrySumOrderByAggregateInputObjectSchema as MaptilerCacheEntrySumOrderByAggregateInputObjectSchema } from './MaptilerCacheEntrySumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  queryId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  kind: SortOrderSchema.optional(),
  path: SortOrderSchema.optional(),
  params: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  paramsHash: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  method: SortOrderSchema.optional(),
  responseType: SortOrderSchema.optional(),
  url: SortOrderSchema.optional(),
  statusCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  data: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  contentType: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cacheControl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => MaptilerCacheEntryCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => MaptilerCacheEntryAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => MaptilerCacheEntryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => MaptilerCacheEntryMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => MaptilerCacheEntrySumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const MaptilerCacheEntryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryOrderByWithAggregationInput>;
export const MaptilerCacheEntryOrderByWithAggregationInputObjectZodSchema = makeSchema();
