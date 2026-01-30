import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { GeoStatusLogCountOrderByAggregateInputObjectSchema as GeoStatusLogCountOrderByAggregateInputObjectSchema } from './GeoStatusLogCountOrderByAggregateInput.schema';
import { GeoStatusLogAvgOrderByAggregateInputObjectSchema as GeoStatusLogAvgOrderByAggregateInputObjectSchema } from './GeoStatusLogAvgOrderByAggregateInput.schema';
import { GeoStatusLogMaxOrderByAggregateInputObjectSchema as GeoStatusLogMaxOrderByAggregateInputObjectSchema } from './GeoStatusLogMaxOrderByAggregateInput.schema';
import { GeoStatusLogMinOrderByAggregateInputObjectSchema as GeoStatusLogMinOrderByAggregateInputObjectSchema } from './GeoStatusLogMinOrderByAggregateInput.schema';
import { GeoStatusLogSumOrderByAggregateInputObjectSchema as GeoStatusLogSumOrderByAggregateInputObjectSchema } from './GeoStatusLogSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  poiStatus: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  centerLat: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  centerLng: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  error: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  userAgent: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => GeoStatusLogCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => GeoStatusLogAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => GeoStatusLogMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => GeoStatusLogMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => GeoStatusLogSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const GeoStatusLogOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.GeoStatusLogOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogOrderByWithAggregationInput>;
export const GeoStatusLogOrderByWithAggregationInputObjectZodSchema = makeSchema();
