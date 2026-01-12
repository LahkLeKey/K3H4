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
export const AssignmentTimecardCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardCountOrderByAggregateInput>;
export const AssignmentTimecardCountOrderByAggregateInputObjectZodSchema = makeSchema();
