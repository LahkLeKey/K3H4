import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AgricultureResourceCategoryCountOrderByAggregateInputObjectSchema as AgricultureResourceCategoryCountOrderByAggregateInputObjectSchema } from './AgricultureResourceCategoryCountOrderByAggregateInput.schema';
import { AgricultureResourceCategoryMaxOrderByAggregateInputObjectSchema as AgricultureResourceCategoryMaxOrderByAggregateInputObjectSchema } from './AgricultureResourceCategoryMaxOrderByAggregateInput.schema';
import { AgricultureResourceCategoryMinOrderByAggregateInputObjectSchema as AgricultureResourceCategoryMinOrderByAggregateInputObjectSchema } from './AgricultureResourceCategoryMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => AgricultureResourceCategoryCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AgricultureResourceCategoryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AgricultureResourceCategoryMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AgricultureResourceCategoryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryOrderByWithAggregationInput>;
export const AgricultureResourceCategoryOrderByWithAggregationInputObjectZodSchema = makeSchema();
