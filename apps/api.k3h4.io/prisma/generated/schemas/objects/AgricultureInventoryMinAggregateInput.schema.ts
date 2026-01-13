import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  sku: z.literal(true).optional(),
  description: z.literal(true).optional(),
  totalQuantity: z.literal(true).optional(),
  unit: z.literal(true).optional(),
  location: z.literal(true).optional(),
  status: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const AgricultureInventoryMinAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMinAggregateInputType>;
export const AgricultureInventoryMinAggregateInputObjectZodSchema = makeSchema();
