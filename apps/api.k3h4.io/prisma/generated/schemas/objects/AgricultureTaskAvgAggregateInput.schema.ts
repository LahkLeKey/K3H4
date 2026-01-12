import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  priority: z.literal(true).optional()
}).strict();
export const AgricultureTaskAvgAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureTaskAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskAvgAggregateInputType>;
export const AgricultureTaskAvgAggregateInputObjectZodSchema = makeSchema();
