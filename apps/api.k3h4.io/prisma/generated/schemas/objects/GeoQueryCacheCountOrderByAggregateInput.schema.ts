import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  params: SortOrderSchema.optional(),
  payload: SortOrderSchema.optional(),
  count: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const GeoQueryCacheCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheCountOrderByAggregateInput>;
export const GeoQueryCacheCountOrderByAggregateInputObjectZodSchema = makeSchema();
