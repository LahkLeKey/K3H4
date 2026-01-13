import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  sku: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  totalQuantity: SortOrderSchema.optional(),
  unit: SortOrderSchema.optional(),
  location: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const AgricultureInventoryMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMinOrderByAggregateInput>;
export const AgricultureInventoryMinOrderByAggregateInputObjectZodSchema = makeSchema();
