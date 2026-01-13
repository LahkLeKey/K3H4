import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  hours: z.literal(true).optional(),
  amount: z.literal(true).optional()
}).strict();
export const AssignmentTimecardAvgAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardAvgAggregateInputType>;
export const AssignmentTimecardAvgAggregateInputObjectZodSchema = makeSchema();
