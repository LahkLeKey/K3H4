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
export const UsdaReleaseCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UsdaReleaseCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaReleaseCountOrderByAggregateInput>;
export const UsdaReleaseCountOrderByAggregateInputObjectZodSchema = makeSchema();
