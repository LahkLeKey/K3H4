import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UsdaSyncStateCountOrderByAggregateInputObjectSchema as UsdaSyncStateCountOrderByAggregateInputObjectSchema } from './UsdaSyncStateCountOrderByAggregateInput.schema';
import { UsdaSyncStateMaxOrderByAggregateInputObjectSchema as UsdaSyncStateMaxOrderByAggregateInputObjectSchema } from './UsdaSyncStateMaxOrderByAggregateInput.schema';
import { UsdaSyncStateMinOrderByAggregateInputObjectSchema as UsdaSyncStateMinOrderByAggregateInputObjectSchema } from './UsdaSyncStateMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  scope: SortOrderSchema.optional(),
  lastReleaseOn: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lastSyncedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => UsdaSyncStateCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => UsdaSyncStateMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => UsdaSyncStateMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const UsdaSyncStateOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UsdaSyncStateOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaSyncStateOrderByWithAggregationInput>;
export const UsdaSyncStateOrderByWithAggregationInputObjectZodSchema = makeSchema();
