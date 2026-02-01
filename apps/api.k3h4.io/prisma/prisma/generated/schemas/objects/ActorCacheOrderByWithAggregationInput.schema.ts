import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ActorCacheCountOrderByAggregateInputObjectSchema as ActorCacheCountOrderByAggregateInputObjectSchema } from './ActorCacheCountOrderByAggregateInput.schema';
import { ActorCacheMaxOrderByAggregateInputObjectSchema as ActorCacheMaxOrderByAggregateInputObjectSchema } from './ActorCacheMaxOrderByAggregateInput.schema';
import { ActorCacheMinOrderByAggregateInputObjectSchema as ActorCacheMinOrderByAggregateInputObjectSchema } from './ActorCacheMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  actorId: SortOrderSchema.optional(),
  key: SortOrderSchema.optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ActorCacheCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ActorCacheMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ActorCacheMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ActorCacheOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ActorCacheOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCacheOrderByWithAggregationInput>;
export const ActorCacheOrderByWithAggregationInputObjectZodSchema = makeSchema();
