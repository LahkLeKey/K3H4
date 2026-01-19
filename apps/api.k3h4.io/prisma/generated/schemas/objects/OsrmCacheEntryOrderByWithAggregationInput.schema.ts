import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { OsrmCacheEntryCountOrderByAggregateInputObjectSchema as OsrmCacheEntryCountOrderByAggregateInputObjectSchema } from './OsrmCacheEntryCountOrderByAggregateInput.schema';
import { OsrmCacheEntryAvgOrderByAggregateInputObjectSchema as OsrmCacheEntryAvgOrderByAggregateInputObjectSchema } from './OsrmCacheEntryAvgOrderByAggregateInput.schema';
import { OsrmCacheEntryMaxOrderByAggregateInputObjectSchema as OsrmCacheEntryMaxOrderByAggregateInputObjectSchema } from './OsrmCacheEntryMaxOrderByAggregateInput.schema';
import { OsrmCacheEntryMinOrderByAggregateInputObjectSchema as OsrmCacheEntryMinOrderByAggregateInputObjectSchema } from './OsrmCacheEntryMinOrderByAggregateInput.schema';
import { OsrmCacheEntrySumOrderByAggregateInputObjectSchema as OsrmCacheEntrySumOrderByAggregateInputObjectSchema } from './OsrmCacheEntrySumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  service: SortOrderSchema.optional(),
  profile: SortOrderSchema.optional(),
  coordinates: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  params: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  paramsHash: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  url: SortOrderSchema.optional(),
  statusCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => OsrmCacheEntryCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => OsrmCacheEntryAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => OsrmCacheEntryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => OsrmCacheEntryMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => OsrmCacheEntrySumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const OsrmCacheEntryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryOrderByWithAggregationInput>;
export const OsrmCacheEntryOrderByWithAggregationInputObjectZodSchema = makeSchema();
