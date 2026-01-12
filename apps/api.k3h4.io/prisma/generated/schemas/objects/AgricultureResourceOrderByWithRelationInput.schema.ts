import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AgricultureResourceCategoryOrderByWithRelationInputObjectSchema as AgricultureResourceCategoryOrderByWithRelationInputObjectSchema } from './AgricultureResourceCategoryOrderByWithRelationInput.schema'

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
  category: z.lazy(() => AgricultureResourceCategoryOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const AgricultureResourceOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AgricultureResourceOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceOrderByWithRelationInput>;
export const AgricultureResourceOrderByWithRelationInputObjectZodSchema = makeSchema();
