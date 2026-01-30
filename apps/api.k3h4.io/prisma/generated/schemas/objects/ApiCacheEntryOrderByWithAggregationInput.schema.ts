import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ApiCacheEntryCountOrderByAggregateInputObjectSchema as ApiCacheEntryCountOrderByAggregateInputObjectSchema } from './ApiCacheEntryCountOrderByAggregateInput.schema';
import { ApiCacheEntryMaxOrderByAggregateInputObjectSchema as ApiCacheEntryMaxOrderByAggregateInputObjectSchema } from './ApiCacheEntryMaxOrderByAggregateInput.schema';
import { ApiCacheEntryMinOrderByAggregateInputObjectSchema as ApiCacheEntryMinOrderByAggregateInputObjectSchema } from './ApiCacheEntryMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  scope: SortOrderSchema.optional(),
  endpoint: SortOrderSchema.optional(),
  params: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  paramsHash: SortOrderSchema.optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ApiCacheEntryCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ApiCacheEntryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ApiCacheEntryMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ApiCacheEntryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ApiCacheEntryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ApiCacheEntryOrderByWithAggregationInput>;
export const ApiCacheEntryOrderByWithAggregationInputObjectZodSchema = makeSchema();
