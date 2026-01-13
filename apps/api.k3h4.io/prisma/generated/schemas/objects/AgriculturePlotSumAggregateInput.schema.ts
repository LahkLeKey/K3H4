import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  acres: z.literal(true).optional()
}).strict();
export const AgriculturePlotSumAggregateInputObjectSchema: z.ZodType<Prisma.AgriculturePlotSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotSumAggregateInputType>;
export const AgriculturePlotSumAggregateInputObjectZodSchema = makeSchema();
