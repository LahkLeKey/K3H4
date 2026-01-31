import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PointOfInterestCountOrderByAggregateInputObjectSchema as PointOfInterestCountOrderByAggregateInputObjectSchema } from './PointOfInterestCountOrderByAggregateInput.schema';
import { PointOfInterestAvgOrderByAggregateInputObjectSchema as PointOfInterestAvgOrderByAggregateInputObjectSchema } from './PointOfInterestAvgOrderByAggregateInput.schema';
import { PointOfInterestMaxOrderByAggregateInputObjectSchema as PointOfInterestMaxOrderByAggregateInputObjectSchema } from './PointOfInterestMaxOrderByAggregateInput.schema';
import { PointOfInterestMinOrderByAggregateInputObjectSchema as PointOfInterestMinOrderByAggregateInputObjectSchema } from './PointOfInterestMinOrderByAggregateInput.schema';
import { PointOfInterestSumOrderByAggregateInputObjectSchema as PointOfInterestSumOrderByAggregateInputObjectSchema } from './PointOfInterestSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  osmType: SortOrderSchema.optional(),
  osmId: SortOrderSchema.optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  category: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  latitude: SortOrderSchema.optional(),
  longitude: SortOrderSchema.optional(),
  tags: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  source: SortOrderSchema.optional(),
  lastSeenAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => PointOfInterestCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => PointOfInterestAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PointOfInterestMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PointOfInterestMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => PointOfInterestSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PointOfInterestOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PointOfInterestOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PointOfInterestOrderByWithAggregationInput>;
export const PointOfInterestOrderByWithAggregationInputObjectZodSchema = makeSchema();
