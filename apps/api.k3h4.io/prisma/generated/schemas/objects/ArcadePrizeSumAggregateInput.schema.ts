import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  costCoins: z.literal(true).optional(),
  stock: z.literal(true).optional()
}).strict();
export const ArcadePrizeSumAggregateInputObjectSchema: z.ZodType<Prisma.ArcadePrizeSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeSumAggregateInputType>;
export const ArcadePrizeSumAggregateInputObjectZodSchema = makeSchema();
