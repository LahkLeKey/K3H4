import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { GeoDirectionSegmentCountOrderByAggregateInputObjectSchema as GeoDirectionSegmentCountOrderByAggregateInputObjectSchema } from './GeoDirectionSegmentCountOrderByAggregateInput.schema';
import { GeoDirectionSegmentAvgOrderByAggregateInputObjectSchema as GeoDirectionSegmentAvgOrderByAggregateInputObjectSchema } from './GeoDirectionSegmentAvgOrderByAggregateInput.schema';
import { GeoDirectionSegmentMaxOrderByAggregateInputObjectSchema as GeoDirectionSegmentMaxOrderByAggregateInputObjectSchema } from './GeoDirectionSegmentMaxOrderByAggregateInput.schema';
import { GeoDirectionSegmentMinOrderByAggregateInputObjectSchema as GeoDirectionSegmentMinOrderByAggregateInputObjectSchema } from './GeoDirectionSegmentMinOrderByAggregateInput.schema';
import { GeoDirectionSegmentSumOrderByAggregateInputObjectSchema as GeoDirectionSegmentSumOrderByAggregateInputObjectSchema } from './GeoDirectionSegmentSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  directionId: SortOrderSchema.optional(),
  sequence: SortOrderSchema.optional(),
  instruction: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  maneuverType: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  maneuverModifier: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  distanceMeters: SortOrderSchema.optional(),
  durationSeconds: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  startLat: SortOrderSchema.optional(),
  startLng: SortOrderSchema.optional(),
  endLat: SortOrderSchema.optional(),
  endLng: SortOrderSchema.optional(),
  geometry: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => GeoDirectionSegmentCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => GeoDirectionSegmentAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => GeoDirectionSegmentMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => GeoDirectionSegmentMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => GeoDirectionSegmentSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const GeoDirectionSegmentOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentOrderByWithAggregationInput>;
export const GeoDirectionSegmentOrderByWithAggregationInputObjectZodSchema = makeSchema();
