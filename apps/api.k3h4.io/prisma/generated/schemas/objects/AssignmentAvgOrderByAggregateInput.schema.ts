import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  hourlyRate: SortOrderSchema.optional()
}).strict();
export const AssignmentAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentAvgOrderByAggregateInput>;
export const AssignmentAvgOrderByAggregateInputObjectZodSchema = makeSchema();
