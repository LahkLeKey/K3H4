import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  assignmentId: z.literal(true).optional(),
  hours: z.literal(true).optional(),
  amount: z.literal(true).optional(),
  note: z.literal(true).optional(),
  status: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const AssignmentTimecardCountAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardCountAggregateInputType>;
export const AssignmentTimecardCountAggregateInputObjectZodSchema = makeSchema();
