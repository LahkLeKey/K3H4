import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  scope: SortOrderSchema.optional(),
  endpoint: SortOrderSchema.optional(),
  paramsHash: SortOrderSchema.optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ApiCacheEntryMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApiCacheEntryMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ApiCacheEntryMaxOrderByAggregateInput>;
export const ApiCacheEntryMaxOrderByAggregateInputObjectZodSchema = makeSchema();
