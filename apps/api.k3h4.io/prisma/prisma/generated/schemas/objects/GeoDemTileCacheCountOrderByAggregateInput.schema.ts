import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  z: SortOrderSchema.optional(),
  x: SortOrderSchema.optional(),
  y: SortOrderSchema.optional(),
  format: SortOrderSchema.optional(),
  url: SortOrderSchema.optional(),
  data: SortOrderSchema.optional(),
  byteLength: SortOrderSchema.optional(),
  etag: SortOrderSchema.optional(),
  cacheControl: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  fetchedAt: SortOrderSchema.optional(),
  lastAccessed: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const GeoDemTileCacheCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheCountOrderByAggregateInput>;
export const GeoDemTileCacheCountOrderByAggregateInputObjectZodSchema = makeSchema();
