import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { GeoRouteCacheCountOrderByAggregateInputObjectSchema as GeoRouteCacheCountOrderByAggregateInputObjectSchema } from './GeoRouteCacheCountOrderByAggregateInput.schema';
import { GeoRouteCacheAvgOrderByAggregateInputObjectSchema as GeoRouteCacheAvgOrderByAggregateInputObjectSchema } from './GeoRouteCacheAvgOrderByAggregateInput.schema';
import { GeoRouteCacheMaxOrderByAggregateInputObjectSchema as GeoRouteCacheMaxOrderByAggregateInputObjectSchema } from './GeoRouteCacheMaxOrderByAggregateInput.schema';
import { GeoRouteCacheMinOrderByAggregateInputObjectSchema as GeoRouteCacheMinOrderByAggregateInputObjectSchema } from './GeoRouteCacheMinOrderByAggregateInput.schema';
import { GeoRouteCacheSumOrderByAggregateInputObjectSchema as GeoRouteCacheSumOrderByAggregateInputObjectSchema } from './GeoRouteCacheSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  provider: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  originLat: SortOrderSchema.optional(),
  originLng: SortOrderSchema.optional(),
  destinationLat: SortOrderSchema.optional(),
  destinationLng: SortOrderSchema.optional(),
  distanceKm: SortOrderSchema.optional(),
  durationMinutes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  geojson: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => GeoRouteCacheCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => GeoRouteCacheAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => GeoRouteCacheMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => GeoRouteCacheMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => GeoRouteCacheSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const GeoRouteCacheOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheOrderByWithAggregationInput>;
export const GeoRouteCacheOrderByWithAggregationInputObjectZodSchema = makeSchema();
