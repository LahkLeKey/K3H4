import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  acres: SortOrderSchema.optional()
}).strict();
export const AgriculturePlotAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgriculturePlotAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotAvgOrderByAggregateInput>;
export const AgriculturePlotAvgOrderByAggregateInputObjectZodSchema = makeSchema();
