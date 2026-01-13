import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  priority: SortOrderSchema.optional()
}).strict();
export const AgricultureTaskAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureTaskAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskAvgOrderByAggregateInput>;
export const AgricultureTaskAvgOrderByAggregateInputObjectZodSchema = makeSchema();
