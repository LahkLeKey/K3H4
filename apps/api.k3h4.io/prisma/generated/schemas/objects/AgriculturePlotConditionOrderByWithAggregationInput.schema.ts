import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AgriculturePlotConditionCountOrderByAggregateInputObjectSchema as AgriculturePlotConditionCountOrderByAggregateInputObjectSchema } from './AgriculturePlotConditionCountOrderByAggregateInput.schema';
import { AgriculturePlotConditionAvgOrderByAggregateInputObjectSchema as AgriculturePlotConditionAvgOrderByAggregateInputObjectSchema } from './AgriculturePlotConditionAvgOrderByAggregateInput.schema';
import { AgriculturePlotConditionMaxOrderByAggregateInputObjectSchema as AgriculturePlotConditionMaxOrderByAggregateInputObjectSchema } from './AgriculturePlotConditionMaxOrderByAggregateInput.schema';
import { AgriculturePlotConditionMinOrderByAggregateInputObjectSchema as AgriculturePlotConditionMinOrderByAggregateInputObjectSchema } from './AgriculturePlotConditionMinOrderByAggregateInput.schema';
import { AgriculturePlotConditionSumOrderByAggregateInputObjectSchema as AgriculturePlotConditionSumOrderByAggregateInputObjectSchema } from './AgriculturePlotConditionSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  plotId: SortOrderSchema.optional(),
  recordedAt: SortOrderSchema.optional(),
  temperature: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  moisture: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  ph: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => AgriculturePlotConditionCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => AgriculturePlotConditionAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AgriculturePlotConditionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AgriculturePlotConditionMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => AgriculturePlotConditionSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AgriculturePlotConditionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionOrderByWithAggregationInput>;
export const AgriculturePlotConditionOrderByWithAggregationInputObjectZodSchema = makeSchema();
