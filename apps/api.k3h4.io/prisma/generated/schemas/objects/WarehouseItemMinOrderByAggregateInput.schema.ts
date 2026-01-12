import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  sku: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  location: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  freightLoadId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const WarehouseItemMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WarehouseItemMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemMinOrderByAggregateInput>;
export const WarehouseItemMinOrderByAggregateInputObjectZodSchema = makeSchema();
