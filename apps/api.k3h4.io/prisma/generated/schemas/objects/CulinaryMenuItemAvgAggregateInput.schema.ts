import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  prepMinutes: z.literal(true).optional(),
  cost: z.literal(true).optional(),
  price: z.literal(true).optional()
}).strict();
export const CulinaryMenuItemAvgAggregateInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemAvgAggregateInputType>;
export const CulinaryMenuItemAvgAggregateInputObjectZodSchema = makeSchema();
