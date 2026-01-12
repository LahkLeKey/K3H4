import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const AgricultureResourceCategoryMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryMaxOrderByAggregateInput>;
export const AgricultureResourceCategoryMaxOrderByAggregateInputObjectZodSchema = makeSchema();
