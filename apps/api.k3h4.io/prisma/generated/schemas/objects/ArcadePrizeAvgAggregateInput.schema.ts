import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  costCoins: z.literal(true).optional(),
  stock: z.literal(true).optional()
}).strict();
export const ArcadePrizeAvgAggregateInputObjectSchema: z.ZodType<Prisma.ArcadePrizeAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeAvgAggregateInputType>;
export const ArcadePrizeAvgAggregateInputObjectZodSchema = makeSchema();
