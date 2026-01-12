import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AgricultureResourceOrderByRelationAggregateInputObjectSchema as AgricultureResourceOrderByRelationAggregateInputObjectSchema } from './AgricultureResourceOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  resources: z.lazy(() => AgricultureResourceOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const AgricultureResourceCategoryOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCategoryOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryOrderByWithRelationInput>;
export const AgricultureResourceCategoryOrderByWithRelationInputObjectZodSchema = makeSchema();
