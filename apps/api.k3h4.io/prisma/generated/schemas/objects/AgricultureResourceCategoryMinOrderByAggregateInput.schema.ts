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
export const AgricultureResourceCategoryMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryMinOrderByAggregateInput>;
export const AgricultureResourceCategoryMinOrderByAggregateInputObjectZodSchema = makeSchema();
