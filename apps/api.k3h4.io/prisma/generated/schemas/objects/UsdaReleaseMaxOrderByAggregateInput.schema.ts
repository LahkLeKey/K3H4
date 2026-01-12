import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  scope: SortOrderSchema.optional(),
  releasedOn: SortOrderSchema.optional(),
  note: SortOrderSchema.optional(),
  fetchedAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const UsdaReleaseMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UsdaReleaseMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaReleaseMaxOrderByAggregateInput>;
export const UsdaReleaseMaxOrderByAggregateInputObjectZodSchema = makeSchema();
