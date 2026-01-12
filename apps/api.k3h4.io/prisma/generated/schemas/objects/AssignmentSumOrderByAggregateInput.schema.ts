import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  hourlyRate: SortOrderSchema.optional()
}).strict();
export const AssignmentSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentSumOrderByAggregateInput>;
export const AssignmentSumOrderByAggregateInputObjectZodSchema = makeSchema();
