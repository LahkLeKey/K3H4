import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  priority: SortOrderSchema.optional()
}).strict();
export const AgricultureTaskSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureTaskSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskSumOrderByAggregateInput>;
export const AgricultureTaskSumOrderByAggregateInputObjectZodSchema = makeSchema();
