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
export const AgricultureInventoryMovementCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementCountOrderByAggregateInput>;
export const AgricultureInventoryMovementCountOrderByAggregateInputObjectZodSchema = makeSchema();
