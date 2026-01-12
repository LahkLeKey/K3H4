import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  cardId: z.literal(true).optional(),
  prizeId: z.literal(true).optional(),
  status: z.literal(true).optional(),
  fulfilledAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ArcadeRedemptionCountAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCountAggregateInputType>;
export const ArcadeRedemptionCountAggregateInputObjectZodSchema = makeSchema();
