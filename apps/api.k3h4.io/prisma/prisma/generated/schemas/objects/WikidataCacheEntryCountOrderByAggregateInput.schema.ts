import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  resource: SortOrderSchema.optional(),
  endpoint: SortOrderSchema.optional(),
  params: SortOrderSchema.optional(),
  paramsHash: SortOrderSchema.optional(),
  url: SortOrderSchema.optional(),
  statusCode: SortOrderSchema.optional(),
  payload: SortOrderSchema.optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  cacheControlSeconds: SortOrderSchema.optional(),
  etag: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const WikidataCacheEntryCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.WikidataCacheEntryCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.WikidataCacheEntryCountOrderByAggregateInput>;
export const WikidataCacheEntryCountOrderByAggregateInputObjectZodSchema = makeSchema();
