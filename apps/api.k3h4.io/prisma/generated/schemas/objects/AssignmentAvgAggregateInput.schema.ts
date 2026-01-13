import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  hourlyRate: z.literal(true).optional()
}).strict();
export const AssignmentAvgAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentAvgAggregateInputType>;
export const AssignmentAvgAggregateInputObjectZodSchema = makeSchema();
