import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  signature: SortOrderSchema.optional(),
  count: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const GeoQueryCacheMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheMinOrderByAggregateInput>;
export const GeoQueryCacheMinOrderByAggregateInputObjectZodSchema = makeSchema();
