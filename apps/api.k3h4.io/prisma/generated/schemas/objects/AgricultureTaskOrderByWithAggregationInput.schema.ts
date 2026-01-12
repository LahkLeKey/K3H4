import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AgricultureTaskCountOrderByAggregateInputObjectSchema as AgricultureTaskCountOrderByAggregateInputObjectSchema } from './AgricultureTaskCountOrderByAggregateInput.schema';
import { AgricultureTaskAvgOrderByAggregateInputObjectSchema as AgricultureTaskAvgOrderByAggregateInputObjectSchema } from './AgricultureTaskAvgOrderByAggregateInput.schema';
import { AgricultureTaskMaxOrderByAggregateInputObjectSchema as AgricultureTaskMaxOrderByAggregateInputObjectSchema } from './AgricultureTaskMaxOrderByAggregateInput.schema';
import { AgricultureTaskMinOrderByAggregateInputObjectSchema as AgricultureTaskMinOrderByAggregateInputObjectSchema } from './AgricultureTaskMinOrderByAggregateInput.schema';
import { AgricultureTaskSumOrderByAggregateInputObjectSchema as AgricultureTaskSumOrderByAggregateInputObjectSchema } from './AgricultureTaskSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  plotId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  cropPlanId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  title: SortOrderSchema.optional(),
  assignee: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  priority: SortOrderSchema.optional(),
  tags: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  dueDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => AgricultureTaskCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => AgricultureTaskAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AgricultureTaskMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AgricultureTaskMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => AgricultureTaskSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AgricultureTaskOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AgricultureTaskOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskOrderByWithAggregationInput>;
export const AgricultureTaskOrderByWithAggregationInputObjectZodSchema = makeSchema();
