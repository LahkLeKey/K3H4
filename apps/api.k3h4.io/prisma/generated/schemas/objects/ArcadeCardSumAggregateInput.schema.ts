import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  balance: z.literal(true).optional()
}).strict();
export const ArcadeCardSumAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeCardSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardSumAggregateInputType>;
export const ArcadeCardSumAggregateInputObjectZodSchema = makeSchema();
