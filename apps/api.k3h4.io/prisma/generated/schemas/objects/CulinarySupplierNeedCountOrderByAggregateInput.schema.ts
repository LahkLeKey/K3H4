import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  item: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  dueDate: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CulinarySupplierNeedCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedCountOrderByAggregateInput>;
export const CulinarySupplierNeedCountOrderByAggregateInputObjectZodSchema = makeSchema();
