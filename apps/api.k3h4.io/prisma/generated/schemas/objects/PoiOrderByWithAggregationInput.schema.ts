import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PoiCountOrderByAggregateInputObjectSchema as PoiCountOrderByAggregateInputObjectSchema } from './PoiCountOrderByAggregateInput.schema';
import { PoiAvgOrderByAggregateInputObjectSchema as PoiAvgOrderByAggregateInputObjectSchema } from './PoiAvgOrderByAggregateInput.schema';
import { PoiMaxOrderByAggregateInputObjectSchema as PoiMaxOrderByAggregateInputObjectSchema } from './PoiMaxOrderByAggregateInput.schema';
import { PoiMinOrderByAggregateInputObjectSchema as PoiMinOrderByAggregateInputObjectSchema } from './PoiMinOrderByAggregateInput.schema';
import { PoiSumOrderByAggregateInputObjectSchema as PoiSumOrderByAggregateInputObjectSchema } from './PoiSumOrderByAggregateInput.schema'

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
  buildingId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => PoiCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => PoiAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PoiMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PoiMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => PoiSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PoiOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PoiOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiOrderByWithAggregationInput>;
export const PoiOrderByWithAggregationInputObjectZodSchema = makeSchema();
