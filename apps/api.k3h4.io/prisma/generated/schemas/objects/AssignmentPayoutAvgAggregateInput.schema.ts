import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  amount: z.literal(true).optional()
}).strict();
export const AssignmentPayoutAvgAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutAvgAggregateInputType>;
export const AssignmentPayoutAvgAggregateInputObjectZodSchema = makeSchema();
