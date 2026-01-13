import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  hours: z.literal(true).optional(),
  amount: z.literal(true).optional()
}).strict();
export const AssignmentTimecardSumAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardSumAggregateInputType>;
export const AssignmentTimecardSumAggregateInputObjectZodSchema = makeSchema();
