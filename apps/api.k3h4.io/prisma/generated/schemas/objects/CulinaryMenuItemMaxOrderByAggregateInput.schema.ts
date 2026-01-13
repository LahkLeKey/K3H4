import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  prepMinutes: SortOrderSchema.optional(),
  cost: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CulinaryMenuItemMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemMaxOrderByAggregateInput>;
export const CulinaryMenuItemMaxOrderByAggregateInputObjectZodSchema = makeSchema();
