import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  actorId: SortOrderSchema.optional(),
  key: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ActorCacheMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ActorCacheMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheMaxOrderByAggregateInput>;
export const ActorCacheMaxOrderByAggregateInputObjectZodSchema = makeSchema();
