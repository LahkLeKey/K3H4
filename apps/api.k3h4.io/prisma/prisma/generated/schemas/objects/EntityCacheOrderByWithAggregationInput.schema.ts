import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { EntityCacheCountOrderByAggregateInputObjectSchema as EntityCacheCountOrderByAggregateInputObjectSchema } from './EntityCacheCountOrderByAggregateInput.schema';
import { EntityCacheMaxOrderByAggregateInputObjectSchema as EntityCacheMaxOrderByAggregateInputObjectSchema } from './EntityCacheMaxOrderByAggregateInput.schema';
import { EntityCacheMinOrderByAggregateInputObjectSchema as EntityCacheMinOrderByAggregateInputObjectSchema } from './EntityCacheMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  entityId: SortOrderSchema.optional(),
  key: SortOrderSchema.optional(),
  payload: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  expiresAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => EntityCacheCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => EntityCacheMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => EntityCacheMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const EntityCacheOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.EntityCacheOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheOrderByWithAggregationInput>;
export const EntityCacheOrderByWithAggregationInputObjectZodSchema = makeSchema();
