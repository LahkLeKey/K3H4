import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  personaId: z.literal(true).optional(),
  title: z.literal(true).optional(),
  hourlyRate: z.literal(true).optional(),
  status: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const AssignmentCountAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCountAggregateInputType>;
export const AssignmentCountAggregateInputObjectZodSchema = makeSchema();
