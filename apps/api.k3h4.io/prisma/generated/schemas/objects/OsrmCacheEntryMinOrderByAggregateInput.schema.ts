import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  service: SortOrderSchema.optional(),
  profile: SortOrderSchema.optional(),
  coordinates: SortOrderSchema.optional(),
  paramsHash: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  url: SortOrderSchema.optional(),
  statusCode: SortOrderSchema.optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const OsrmCacheEntryMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryMinOrderByAggregateInput>;
export const OsrmCacheEntryMinOrderByAggregateInputObjectZodSchema = makeSchema();
