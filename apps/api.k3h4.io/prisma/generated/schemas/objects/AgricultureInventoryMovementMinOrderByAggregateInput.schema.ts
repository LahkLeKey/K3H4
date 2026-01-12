import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  inventoryId: SortOrderSchema.optional(),
  shipmentId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  reason: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const AgricultureInventoryMovementMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementMinOrderByAggregateInput>;
export const AgricultureInventoryMovementMinOrderByAggregateInputObjectZodSchema = makeSchema();
