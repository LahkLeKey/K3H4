import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  acres: z.literal(true).optional()
}).strict();
export const AgriculturePlotAvgAggregateInputObjectSchema: z.ZodType<Prisma.AgriculturePlotAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotAvgAggregateInputType>;
export const AgriculturePlotAvgAggregateInputObjectZodSchema = makeSchema();
