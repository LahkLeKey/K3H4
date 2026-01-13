import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UsdaRegionCountOrderByAggregateInputObjectSchema as UsdaRegionCountOrderByAggregateInputObjectSchema } from './UsdaRegionCountOrderByAggregateInput.schema';
import { UsdaRegionMaxOrderByAggregateInputObjectSchema as UsdaRegionMaxOrderByAggregateInputObjectSchema } from './UsdaRegionMaxOrderByAggregateInput.schema';
import { UsdaRegionMinOrderByAggregateInputObjectSchema as UsdaRegionMinOrderByAggregateInputObjectSchema } from './UsdaRegionMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  code: SortOrderSchema.optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  extra: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => UsdaRegionCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => UsdaRegionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => UsdaRegionMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const UsdaRegionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UsdaRegionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaRegionOrderByWithAggregationInput>;
export const UsdaRegionOrderByWithAggregationInputObjectZodSchema = makeSchema();
