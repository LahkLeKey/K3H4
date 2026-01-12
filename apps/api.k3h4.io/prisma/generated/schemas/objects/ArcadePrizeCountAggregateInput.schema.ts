import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  sku: z.literal(true).optional(),
  costCoins: z.literal(true).optional(),
  stock: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ArcadePrizeCountAggregateInputObjectSchema: z.ZodType<Prisma.ArcadePrizeCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeCountAggregateInputType>;
export const ArcadePrizeCountAggregateInputObjectZodSchema = makeSchema();
