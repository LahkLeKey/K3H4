import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AgricultureResourceCountOrderByAggregateInputObjectSchema as AgricultureResourceCountOrderByAggregateInputObjectSchema } from './AgricultureResourceCountOrderByAggregateInput.schema';
import { AgricultureResourceMaxOrderByAggregateInputObjectSchema as AgricultureResourceMaxOrderByAggregateInputObjectSchema } from './AgricultureResourceMaxOrderByAggregateInput.schema';
import { AgricultureResourceMinOrderByAggregateInputObjectSchema as AgricultureResourceMinOrderByAggregateInputObjectSchema } from './AgricultureResourceMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  categoryId: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  summary: SortOrderSchema.optional(),
  url: SortOrderSchema.optional(),
  tags: SortOrderSchema.optional(),
  source: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => AgricultureResourceCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AgricultureResourceMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AgricultureResourceMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AgricultureResourceOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AgricultureResourceOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceOrderByWithAggregationInput>;
export const AgricultureResourceOrderByWithAggregationInputObjectZodSchema = makeSchema();
