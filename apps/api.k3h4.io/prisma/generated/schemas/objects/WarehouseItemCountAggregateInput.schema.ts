import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  sku: z.literal(true).optional(),
  description: z.literal(true).optional(),
  quantity: z.literal(true).optional(),
  location: z.literal(true).optional(),
  status: z.literal(true).optional(),
  freightLoadId: z.literal(true).optional(),
  category: z.literal(true).optional(),
  metadata: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const WarehouseItemCountAggregateInputObjectSchema: z.ZodType<Prisma.WarehouseItemCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemCountAggregateInputType>;
export const WarehouseItemCountAggregateInputObjectZodSchema = makeSchema();
