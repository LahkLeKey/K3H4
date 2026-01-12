import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  priority: z.literal(true).optional()
}).strict();
export const AgricultureTaskSumAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureTaskSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskSumAggregateInputType>;
export const AgricultureTaskSumAggregateInputObjectZodSchema = makeSchema();
