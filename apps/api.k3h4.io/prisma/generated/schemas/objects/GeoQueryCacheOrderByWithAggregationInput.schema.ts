import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { GeoQueryCacheCountOrderByAggregateInputObjectSchema as GeoQueryCacheCountOrderByAggregateInputObjectSchema } from './GeoQueryCacheCountOrderByAggregateInput.schema';
import { GeoQueryCacheAvgOrderByAggregateInputObjectSchema as GeoQueryCacheAvgOrderByAggregateInputObjectSchema } from './GeoQueryCacheAvgOrderByAggregateInput.schema';
import { GeoQueryCacheMaxOrderByAggregateInputObjectSchema as GeoQueryCacheMaxOrderByAggregateInputObjectSchema } from './GeoQueryCacheMaxOrderByAggregateInput.schema';
import { GeoQueryCacheMinOrderByAggregateInputObjectSchema as GeoQueryCacheMinOrderByAggregateInputObjectSchema } from './GeoQueryCacheMinOrderByAggregateInput.schema';
import { GeoQueryCacheSumOrderByAggregateInputObjectSchema as GeoQueryCacheSumOrderByAggregateInputObjectSchema } from './GeoQueryCacheSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  type: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  params: SortOrderSchema.optional(),
  payload: SortOrderSchema.optional(),
  count: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => GeoQueryCacheCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => GeoQueryCacheAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => GeoQueryCacheMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => GeoQueryCacheMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => GeoQueryCacheSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const GeoQueryCacheOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheOrderByWithAggregationInput>;
export const GeoQueryCacheOrderByWithAggregationInputObjectZodSchema = makeSchema();
