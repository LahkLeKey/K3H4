import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  actorId: SortOrderSchema.optional(),
  queryId: SortOrderSchema.optional(),
  kind: SortOrderSchema.optional(),
  path: SortOrderSchema.optional(),
  params: SortOrderSchema.optional(),
  paramsHash: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  method: SortOrderSchema.optional(),
  responseType: SortOrderSchema.optional(),
  url: SortOrderSchema.optional(),
  statusCode: SortOrderSchema.optional(),
  payload: SortOrderSchema.optional(),
  data: SortOrderSchema.optional(),
  contentType: SortOrderSchema.optional(),
  cacheControl: SortOrderSchema.optional(),
  fetchedAt: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const MaptilerCacheEntryCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryCountOrderByAggregateInput>;
export const MaptilerCacheEntryCountOrderByAggregateInputObjectZodSchema = makeSchema();
