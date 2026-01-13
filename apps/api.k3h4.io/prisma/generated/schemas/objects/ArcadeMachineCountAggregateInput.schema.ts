import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  gameTitle: z.literal(true).optional(),
  status: z.literal(true).optional(),
  location: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ArcadeMachineCountAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeMachineCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineCountAggregateInputType>;
export const ArcadeMachineCountAggregateInputObjectZodSchema = makeSchema();
