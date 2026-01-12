import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  hours: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional()
}).strict();
export const AssignmentTimecardAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardAvgOrderByAggregateInput>;
export const AssignmentTimecardAvgOrderByAggregateInputObjectZodSchema = makeSchema();
