import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  assignmentId: SortOrderSchema.optional(),
  personaId: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  note: SortOrderSchema.optional(),
  invoiceUrl: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const AssignmentPayoutCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutCountOrderByAggregateInput>;
export const AssignmentPayoutCountOrderByAggregateInputObjectZodSchema = makeSchema();
