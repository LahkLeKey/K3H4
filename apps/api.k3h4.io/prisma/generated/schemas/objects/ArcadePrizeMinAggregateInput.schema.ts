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
  updatedAt: z.literal(true).optional()
}).strict();
export const ArcadePrizeMinAggregateInputObjectSchema: z.ZodType<Prisma.ArcadePrizeMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeMinAggregateInputType>;
export const ArcadePrizeMinAggregateInputObjectZodSchema = makeSchema();
