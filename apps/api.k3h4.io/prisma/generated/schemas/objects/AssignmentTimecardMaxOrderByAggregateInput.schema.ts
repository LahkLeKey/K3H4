import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  assignmentId: SortOrderSchema.optional(),
  hours: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  note: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const AssignmentTimecardMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardMaxOrderByAggregateInput>;
export const AssignmentTimecardMaxOrderByAggregateInputObjectZodSchema = makeSchema();
