import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { EntityCountOrderByAggregateInputObjectSchema as EntityCountOrderByAggregateInputObjectSchema } from './EntityCountOrderByAggregateInput.schema';
import { EntityMaxOrderByAggregateInputObjectSchema as EntityMaxOrderByAggregateInputObjectSchema } from './EntityMaxOrderByAggregateInput.schema';
import { EntityMinOrderByAggregateInputObjectSchema as EntityMinOrderByAggregateInputObjectSchema } from './EntityMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  actorId: SortOrderSchema.optional(),
  kind: SortOrderSchema.optional(),
  direction: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  targetType: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  targetId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  source: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => EntityCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => EntityMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => EntityMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const EntityOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.EntityOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityOrderByWithAggregationInput>;
export const EntityOrderByWithAggregationInputObjectZodSchema = makeSchema();
