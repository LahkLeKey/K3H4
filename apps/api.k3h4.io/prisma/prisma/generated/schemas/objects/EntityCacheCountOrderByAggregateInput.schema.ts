import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  entityId: SortOrderSchema.optional(),
  key: SortOrderSchema.optional(),
  payload: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const EntityCacheCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.EntityCacheCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheCountOrderByAggregateInput>;
export const EntityCacheCountOrderByAggregateInputObjectZodSchema = makeSchema();
