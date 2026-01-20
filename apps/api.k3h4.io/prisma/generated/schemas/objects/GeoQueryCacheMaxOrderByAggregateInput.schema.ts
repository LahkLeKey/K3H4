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
export const GeoQueryCacheMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheMaxOrderByAggregateInput>;
export const GeoQueryCacheMaxOrderByAggregateInputObjectZodSchema = makeSchema();
