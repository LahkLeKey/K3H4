import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  cardId: z.literal(true).optional(),
  amount: z.literal(true).optional(),
  source: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const ArcadeTopUpMaxAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpMaxAggregateInputType>;
export const ArcadeTopUpMaxAggregateInputObjectZodSchema = makeSchema();
