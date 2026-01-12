import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AssignmentPayoutCountOrderByAggregateInputObjectSchema as AssignmentPayoutCountOrderByAggregateInputObjectSchema } from './AssignmentPayoutCountOrderByAggregateInput.schema';
import { AssignmentPayoutAvgOrderByAggregateInputObjectSchema as AssignmentPayoutAvgOrderByAggregateInputObjectSchema } from './AssignmentPayoutAvgOrderByAggregateInput.schema';
import { AssignmentPayoutMaxOrderByAggregateInputObjectSchema as AssignmentPayoutMaxOrderByAggregateInputObjectSchema } from './AssignmentPayoutMaxOrderByAggregateInput.schema';
import { AssignmentPayoutMinOrderByAggregateInputObjectSchema as AssignmentPayoutMinOrderByAggregateInputObjectSchema } from './AssignmentPayoutMinOrderByAggregateInput.schema';
import { AssignmentPayoutSumOrderByAggregateInputObjectSchema as AssignmentPayoutSumOrderByAggregateInputObjectSchema } from './AssignmentPayoutSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  assignmentId: SortOrderSchema.optional(),
  personaId: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  invoiceUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => AssignmentPayoutCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => AssignmentPayoutAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AssignmentPayoutMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AssignmentPayoutMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => AssignmentPayoutSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AssignmentPayoutOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutOrderByWithAggregationInput>;
export const AssignmentPayoutOrderByWithAggregationInputObjectZodSchema = makeSchema();
