import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  resource: SortOrderSchema.optional(),
  endpoint: SortOrderSchema.optional(),
  paramsHash: SortOrderSchema.optional(),
  url: SortOrderSchema.optional(),
  statusCode: SortOrderSchema.optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  cacheControlSeconds: SortOrderSchema.optional(),
  etag: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const WikidataCacheEntryMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WikidataCacheEntryMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WikidataCacheEntryMinOrderByAggregateInput>;
export const WikidataCacheEntryMinOrderByAggregateInputObjectZodSchema = makeSchema();
