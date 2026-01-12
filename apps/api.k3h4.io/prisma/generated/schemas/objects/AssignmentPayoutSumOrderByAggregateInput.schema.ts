import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  amount: SortOrderSchema.optional()
}).strict();
export const AssignmentPayoutSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutSumOrderByAggregateInput>;
export const AssignmentPayoutSumOrderByAggregateInputObjectZodSchema = makeSchema();
