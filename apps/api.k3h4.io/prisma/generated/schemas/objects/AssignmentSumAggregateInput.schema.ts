import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  hourlyRate: z.literal(true).optional()
}).strict();
export const AssignmentSumAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentSumAggregateInputType>;
export const AssignmentSumAggregateInputObjectZodSchema = makeSchema();
