import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  inventoryId: z.literal(true).optional(),
  shipmentId: z.literal(true).optional(),
  type: z.literal(true).optional(),
  quantity: z.literal(true).optional(),
  reason: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const AgricultureInventoryMovementCountAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementCountAggregateInputType>;
export const AgricultureInventoryMovementCountAggregateInputObjectZodSchema = makeSchema();
