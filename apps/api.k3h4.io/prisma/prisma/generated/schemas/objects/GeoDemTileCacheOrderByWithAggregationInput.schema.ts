import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { GeoDemTileCacheCountOrderByAggregateInputObjectSchema as GeoDemTileCacheCountOrderByAggregateInputObjectSchema } from './GeoDemTileCacheCountOrderByAggregateInput.schema';
import { GeoDemTileCacheAvgOrderByAggregateInputObjectSchema as GeoDemTileCacheAvgOrderByAggregateInputObjectSchema } from './GeoDemTileCacheAvgOrderByAggregateInput.schema';
import { GeoDemTileCacheMaxOrderByAggregateInputObjectSchema as GeoDemTileCacheMaxOrderByAggregateInputObjectSchema } from './GeoDemTileCacheMaxOrderByAggregateInput.schema';
import { GeoDemTileCacheMinOrderByAggregateInputObjectSchema as GeoDemTileCacheMinOrderByAggregateInputObjectSchema } from './GeoDemTileCacheMinOrderByAggregateInput.schema';
import { GeoDemTileCacheSumOrderByAggregateInputObjectSchema as GeoDemTileCacheSumOrderByAggregateInputObjectSchema } from './GeoDemTileCacheSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  provider: SortOrderSchema.optional(),
  source: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  signature: SortOrderSchema.optional(),
  z: SortOrderSchema.optional(),
  x: SortOrderSchema.optional(),
  y: SortOrderSchema.optional(),
  format: SortOrderSchema.optional(),
  url: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  data: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  byteLength: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  etag: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cacheControl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  fetchedAt: SortOrderSchema.optional(),
  lastAccessed: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => GeoDemTileCacheCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => GeoDemTileCacheAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => GeoDemTileCacheMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => GeoDemTileCacheMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => GeoDemTileCacheSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const GeoDemTileCacheOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheOrderByWithAggregationInput>;
export const GeoDemTileCacheOrderByWithAggregationInputObjectZodSchema = makeSchema();
