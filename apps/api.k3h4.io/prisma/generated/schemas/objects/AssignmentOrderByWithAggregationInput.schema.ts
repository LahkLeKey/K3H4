import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { AssignmentCountOrderByAggregateInputObjectSchema as AssignmentCountOrderByAggregateInputObjectSchema } from './AssignmentCountOrderByAggregateInput.schema';
import { AssignmentAvgOrderByAggregateInputObjectSchema as AssignmentAvgOrderByAggregateInputObjectSchema } from './AssignmentAvgOrderByAggregateInput.schema';
import { AssignmentMaxOrderByAggregateInputObjectSchema as AssignmentMaxOrderByAggregateInputObjectSchema } from './AssignmentMaxOrderByAggregateInput.schema';
import { AssignmentMinOrderByAggregateInputObjectSchema as AssignmentMinOrderByAggregateInputObjectSchema } from './AssignmentMinOrderByAggregateInput.schema';
import { AssignmentSumOrderByAggregateInputObjectSchema as AssignmentSumOrderByAggregateInputObjectSchema } from './AssignmentSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  personaId: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  hourlyRate: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => AssignmentCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => AssignmentAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AssignmentMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AssignmentMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => AssignmentSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AssignmentOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AssignmentOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentOrderByWithAggregationInput>;
export const AssignmentOrderByWithAggregationInputObjectZodSchema = makeSchema();
