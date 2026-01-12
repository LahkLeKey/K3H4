import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  prepMinutes: z.literal(true).optional(),
  cost: z.literal(true).optional(),
  price: z.literal(true).optional()
}).strict();
export const CulinaryMenuItemSumAggregateInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemSumAggregateInputType>;
export const CulinaryMenuItemSumAggregateInputObjectZodSchema = makeSchema();
