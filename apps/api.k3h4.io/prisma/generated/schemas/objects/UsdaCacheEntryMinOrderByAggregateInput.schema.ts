import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  endpoint: SortOrderSchema.optional(),
  paramsHash: SortOrderSchema.optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const UsdaCacheEntryMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UsdaCacheEntryMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCacheEntryMinOrderByAggregateInput>;
export const UsdaCacheEntryMinOrderByAggregateInputObjectZodSchema = makeSchema();
