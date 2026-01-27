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
  category: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const WarehouseItemMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WarehouseItemMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemMaxOrderByAggregateInput>;
export const WarehouseItemMaxOrderByAggregateInputObjectZodSchema = makeSchema();
