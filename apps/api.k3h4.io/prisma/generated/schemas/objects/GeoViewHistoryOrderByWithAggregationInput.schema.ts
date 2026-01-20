import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { GeoViewHistoryCountOrderByAggregateInputObjectSchema as GeoViewHistoryCountOrderByAggregateInputObjectSchema } from './GeoViewHistoryCountOrderByAggregateInput.schema';
import { GeoViewHistoryAvgOrderByAggregateInputObjectSchema as GeoViewHistoryAvgOrderByAggregateInputObjectSchema } from './GeoViewHistoryAvgOrderByAggregateInput.schema';
import { GeoViewHistoryMaxOrderByAggregateInputObjectSchema as GeoViewHistoryMaxOrderByAggregateInputObjectSchema } from './GeoViewHistoryMaxOrderByAggregateInput.schema';
import { GeoViewHistoryMinOrderByAggregateInputObjectSchema as GeoViewHistoryMinOrderByAggregateInputObjectSchema } from './GeoViewHistoryMinOrderByAggregateInput.schema';
import { GeoViewHistorySumOrderByAggregateInputObjectSchema as GeoViewHistorySumOrderByAggregateInputObjectSchema } from './GeoViewHistorySumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  zoomBand: SortOrderSchema.optional(),
  bboxMinLat: SortOrderSchema.optional(),
  bboxMinLng: SortOrderSchema.optional(),
  bboxMaxLat: SortOrderSchema.optional(),
  bboxMaxLng: SortOrderSchema.optional(),
  lastPoiIds: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastPoiCount: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  firstViewedAt: SortOrderSchema.optional(),
  lastViewedAt: SortOrderSchema.optional(),
  viewCount: SortOrderSchema.optional(),
  staleAfter: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => GeoViewHistoryCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => GeoViewHistoryAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => GeoViewHistoryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => GeoViewHistoryMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => GeoViewHistorySumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const GeoViewHistoryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryOrderByWithAggregationInput>;
export const GeoViewHistoryOrderByWithAggregationInputObjectZodSchema = makeSchema();
