import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  task: z.literal(true).optional(),
  station: z.literal(true).optional(),
  dueAt: z.literal(true).optional(),
  status: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const CulinaryPrepTaskCountAggregateInputObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskCountAggregateInputType>;
export const CulinaryPrepTaskCountAggregateInputObjectZodSchema = makeSchema();
