import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  label: z.literal(true).optional(),
  balance: z.literal(true).optional(),
  status: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ArcadeCardCountAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeCardCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardCountAggregateInputType>;
export const ArcadeCardCountAggregateInputObjectZodSchema = makeSchema();
