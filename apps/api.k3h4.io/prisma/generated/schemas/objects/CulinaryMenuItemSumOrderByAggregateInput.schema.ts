import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  prepMinutes: SortOrderSchema.optional(),
  cost: SortOrderSchema.optional(),
  price: SortOrderSchema.optional()
}).strict();
export const CulinaryMenuItemSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemSumOrderByAggregateInput>;
export const CulinaryMenuItemSumOrderByAggregateInputObjectZodSchema = makeSchema();
