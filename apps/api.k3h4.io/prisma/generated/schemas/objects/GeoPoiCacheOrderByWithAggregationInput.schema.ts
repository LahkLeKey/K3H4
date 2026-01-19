import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { GeoPoiCacheCountOrderByAggregateInputObjectSchema as GeoPoiCacheCountOrderByAggregateInputObjectSchema } from './GeoPoiCacheCountOrderByAggregateInput.schema';
import { GeoPoiCacheAvgOrderByAggregateInputObjectSchema as GeoPoiCacheAvgOrderByAggregateInputObjectSchema } from './GeoPoiCacheAvgOrderByAggregateInput.schema';
import { GeoPoiCacheMaxOrderByAggregateInputObjectSchema as GeoPoiCacheMaxOrderByAggregateInputObjectSchema } from './GeoPoiCacheMaxOrderByAggregateInput.schema';
import { GeoPoiCacheMinOrderByAggregateInputObjectSchema as GeoPoiCacheMinOrderByAggregateInputObjectSchema } from './GeoPoiCacheMinOrderByAggregateInput.schema';
import { GeoPoiCacheSumOrderByAggregateInputObjectSchema as GeoPoiCacheSumOrderByAggregateInputObjectSchema } from './GeoPoiCacheSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  signature: SortOrderSchema.optional(),
  centerLat: SortOrderSchema.optional(),
  centerLng: SortOrderSchema.optional(),
  radiusM: SortOrderSchema.optional(),
  kinds: SortOrderSchema.optional(),
  pois: SortOrderSchema.optional(),
  count: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => GeoPoiCacheCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => GeoPoiCacheAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => GeoPoiCacheMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => GeoPoiCacheMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => GeoPoiCacheSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const GeoPoiCacheOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.GeoPoiCacheOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheOrderByWithAggregationInput>;
export const GeoPoiCacheOrderByWithAggregationInputObjectZodSchema = makeSchema();
