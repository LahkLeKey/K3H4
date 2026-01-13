import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AgriculturePlotCountOrderByAggregateInputObjectSchema as AgriculturePlotCountOrderByAggregateInputObjectSchema } from './AgriculturePlotCountOrderByAggregateInput.schema';
import { AgriculturePlotAvgOrderByAggregateInputObjectSchema as AgriculturePlotAvgOrderByAggregateInputObjectSchema } from './AgriculturePlotAvgOrderByAggregateInput.schema';
import { AgriculturePlotMaxOrderByAggregateInputObjectSchema as AgriculturePlotMaxOrderByAggregateInputObjectSchema } from './AgriculturePlotMaxOrderByAggregateInput.schema';
import { AgriculturePlotMinOrderByAggregateInputObjectSchema as AgriculturePlotMinOrderByAggregateInputObjectSchema } from './AgriculturePlotMinOrderByAggregateInput.schema';
import { AgriculturePlotSumOrderByAggregateInputObjectSchema as AgriculturePlotSumOrderByAggregateInputObjectSchema } from './AgriculturePlotSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  fieldCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  crop: SortOrderSchema.optional(),
  stage: SortOrderSchema.optional(),
  acres: SortOrderSchema.optional(),
  health: SortOrderSchema.optional(),
  soilType: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  irrigationZone: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastConditionAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => AgriculturePlotCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => AgriculturePlotAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AgriculturePlotMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AgriculturePlotMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => AgriculturePlotSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AgriculturePlotOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AgriculturePlotOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotOrderByWithAggregationInput>;
export const AgriculturePlotOrderByWithAggregationInputObjectZodSchema = makeSchema();
