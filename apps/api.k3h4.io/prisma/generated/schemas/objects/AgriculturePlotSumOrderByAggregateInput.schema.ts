import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  acres: SortOrderSchema.optional()
}).strict();
export const AgriculturePlotSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgriculturePlotSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotSumOrderByAggregateInput>;
export const AgriculturePlotSumOrderByAggregateInputObjectZodSchema = makeSchema();
