import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  temperature: z.literal(true).optional(),
  moisture: z.literal(true).optional(),
  ph: z.literal(true).optional()
}).strict();
export const AgriculturePlotConditionSumAggregateInputObjectSchema: z.ZodType<Prisma.AgriculturePlotConditionSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotConditionSumAggregateInputType>;
export const AgriculturePlotConditionSumAggregateInputObjectZodSchema = makeSchema();
