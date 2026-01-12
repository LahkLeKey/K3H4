import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AgricultureCropPlanCountOrderByAggregateInputObjectSchema as AgricultureCropPlanCountOrderByAggregateInputObjectSchema } from './AgricultureCropPlanCountOrderByAggregateInput.schema';
import { AgricultureCropPlanMaxOrderByAggregateInputObjectSchema as AgricultureCropPlanMaxOrderByAggregateInputObjectSchema } from './AgricultureCropPlanMaxOrderByAggregateInput.schema';
import { AgricultureCropPlanMinOrderByAggregateInputObjectSchema as AgricultureCropPlanMinOrderByAggregateInputObjectSchema } from './AgricultureCropPlanMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  plotId: SortOrderSchema.optional(),
  crop: SortOrderSchema.optional(),
  phase: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  startDate: SortOrderSchema.optional(),
  targetHarvestDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  endDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => AgricultureCropPlanCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AgricultureCropPlanMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AgricultureCropPlanMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AgricultureCropPlanOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanOrderByWithAggregationInput>;
export const AgricultureCropPlanOrderByWithAggregationInputObjectZodSchema = makeSchema();
