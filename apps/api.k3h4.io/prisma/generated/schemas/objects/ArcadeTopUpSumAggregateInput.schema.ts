import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  amount: z.literal(true).optional()
}).strict();
export const ArcadeTopUpSumAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpSumAggregateInputType>;
export const ArcadeTopUpSumAggregateInputObjectZodSchema = makeSchema();
