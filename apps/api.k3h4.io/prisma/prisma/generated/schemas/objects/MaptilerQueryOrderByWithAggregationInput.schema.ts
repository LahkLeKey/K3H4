import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { MaptilerQueryCountOrderByAggregateInputObjectSchema as MaptilerQueryCountOrderByAggregateInputObjectSchema } from './MaptilerQueryCountOrderByAggregateInput.schema';
import { MaptilerQueryMaxOrderByAggregateInputObjectSchema as MaptilerQueryMaxOrderByAggregateInputObjectSchema } from './MaptilerQueryMaxOrderByAggregateInput.schema';
import { MaptilerQueryMinOrderByAggregateInputObjectSchema as MaptilerQueryMinOrderByAggregateInputObjectSchema } from './MaptilerQueryMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  signature: SortOrderSchema.optional(),
  kind: SortOrderSchema.optional(),
  path: SortOrderSchema.optional(),
  params: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastUsedAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => MaptilerQueryCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => MaptilerQueryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => MaptilerQueryMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const MaptilerQueryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.MaptilerQueryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryOrderByWithAggregationInput>;
export const MaptilerQueryOrderByWithAggregationInputObjectZodSchema = makeSchema();
