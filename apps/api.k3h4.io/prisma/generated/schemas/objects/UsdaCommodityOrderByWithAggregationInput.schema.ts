import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UsdaCommodityCountOrderByAggregateInputObjectSchema as UsdaCommodityCountOrderByAggregateInputObjectSchema } from './UsdaCommodityCountOrderByAggregateInput.schema';
import { UsdaCommodityMaxOrderByAggregateInputObjectSchema as UsdaCommodityMaxOrderByAggregateInputObjectSchema } from './UsdaCommodityMaxOrderByAggregateInput.schema';
import { UsdaCommodityMinOrderByAggregateInputObjectSchema as UsdaCommodityMinOrderByAggregateInputObjectSchema } from './UsdaCommodityMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  dataset: SortOrderSchema.optional(),
  code: SortOrderSchema.optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  wikidataId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  enrichment: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  extra: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => UsdaCommodityCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => UsdaCommodityMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => UsdaCommodityMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const UsdaCommodityOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UsdaCommodityOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCommodityOrderByWithAggregationInput>;
export const UsdaCommodityOrderByWithAggregationInputObjectZodSchema = makeSchema();
