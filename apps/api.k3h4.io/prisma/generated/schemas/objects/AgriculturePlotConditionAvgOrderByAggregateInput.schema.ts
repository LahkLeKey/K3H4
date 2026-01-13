import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  temperature: SortOrderSchema.optional(),
  moisture: SortOrderSchema.optional(),
  ph: SortOrderSchema.optional()
}).strict();
export const AgriculturePlotConditionAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionAvgOrderByAggregateInput>;
export const AgriculturePlotConditionAvgOrderByAggregateInputObjectZodSchema = makeSchema();
