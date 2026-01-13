import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  cardId: z.literal(true).optional(),
  prizeId: z.literal(true).optional(),
  status: z.literal(true).optional(),
  fulfilledAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const ArcadeRedemptionMaxAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionMaxAggregateInputType>;
export const ArcadeRedemptionMaxAggregateInputObjectZodSchema = makeSchema();
