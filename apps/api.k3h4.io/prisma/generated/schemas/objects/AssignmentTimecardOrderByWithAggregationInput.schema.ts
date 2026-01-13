import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AssignmentTimecardCountOrderByAggregateInputObjectSchema as AssignmentTimecardCountOrderByAggregateInputObjectSchema } from './AssignmentTimecardCountOrderByAggregateInput.schema';
import { AssignmentTimecardAvgOrderByAggregateInputObjectSchema as AssignmentTimecardAvgOrderByAggregateInputObjectSchema } from './AssignmentTimecardAvgOrderByAggregateInput.schema';
import { AssignmentTimecardMaxOrderByAggregateInputObjectSchema as AssignmentTimecardMaxOrderByAggregateInputObjectSchema } from './AssignmentTimecardMaxOrderByAggregateInput.schema';
import { AssignmentTimecardMinOrderByAggregateInputObjectSchema as AssignmentTimecardMinOrderByAggregateInputObjectSchema } from './AssignmentTimecardMinOrderByAggregateInput.schema';
import { AssignmentTimecardSumOrderByAggregateInputObjectSchema as AssignmentTimecardSumOrderByAggregateInputObjectSchema } from './AssignmentTimecardSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  assignmentId: SortOrderSchema.optional(),
  hours: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => AssignmentTimecardCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => AssignmentTimecardAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AssignmentTimecardMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AssignmentTimecardMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => AssignmentTimecardSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AssignmentTimecardOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardOrderByWithAggregationInput>;
export const AssignmentTimecardOrderByWithAggregationInputObjectZodSchema = makeSchema();
