import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  scope: SortOrderSchema.optional(),
  endpoint: SortOrderSchema.optional(),
  params: SortOrderSchema.optional(),
  paramsHash: SortOrderSchema.optional(),
  payload: SortOrderSchema.optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ApiCacheEntryCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ApiCacheEntryCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ApiCacheEntryCountOrderByAggregateInput>;
export const ApiCacheEntryCountOrderByAggregateInputObjectZodSchema = makeSchema();
