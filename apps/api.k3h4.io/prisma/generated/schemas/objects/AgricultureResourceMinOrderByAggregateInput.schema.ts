import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  categoryId: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  summary: SortOrderSchema.optional(),
  url: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const AgricultureResourceMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureResourceMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceMinOrderByAggregateInput>;
export const AgricultureResourceMinOrderByAggregateInputObjectZodSchema = makeSchema();
