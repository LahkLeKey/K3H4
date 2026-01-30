import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  actorId: SortOrderSchema.optional(),
  key: SortOrderSchema.optional(),
  payload: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ActorCacheCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ActorCacheCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheCountOrderByAggregateInput>;
export const ActorCacheCountOrderByAggregateInputObjectZodSchema = makeSchema();
