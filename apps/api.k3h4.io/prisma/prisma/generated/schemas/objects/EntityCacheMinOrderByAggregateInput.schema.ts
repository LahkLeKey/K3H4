import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  entityId: SortOrderSchema.optional(),
  key: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const EntityCacheMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EntityCacheMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheMinOrderByAggregateInput>;
export const EntityCacheMinOrderByAggregateInputObjectZodSchema = makeSchema();
