import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  name: z.literal(true).optional(),
  prepMinutes: z.literal(true).optional(),
  cost: z.literal(true).optional(),
  price: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const CulinaryMenuItemMaxAggregateInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemMaxAggregateInputType>;
export const CulinaryMenuItemMaxAggregateInputObjectZodSchema = makeSchema();
