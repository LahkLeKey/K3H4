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
export const CulinaryMenuItemCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemCountOrderByAggregateInput>;
export const CulinaryMenuItemCountOrderByAggregateInputObjectZodSchema = makeSchema();
