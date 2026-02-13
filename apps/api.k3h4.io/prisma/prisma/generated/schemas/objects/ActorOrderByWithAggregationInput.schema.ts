import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ActorCountOrderByAggregateInputObjectSchema as ActorCountOrderByAggregateInputObjectSchema } from './ActorCountOrderByAggregateInput.schema';
import { ActorMaxOrderByAggregateInputObjectSchema as ActorMaxOrderByAggregateInputObjectSchema } from './ActorMaxOrderByAggregateInput.schema';
import { ActorMinOrderByAggregateInputObjectSchema as ActorMinOrderByAggregateInputObjectSchema } from './ActorMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  label: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  source: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  category: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastSeenAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  isGlobal: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ActorCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ActorMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ActorMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ActorOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ActorOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorOrderByWithAggregationInput>;
export const ActorOrderByWithAggregationInputObjectZodSchema = makeSchema();
