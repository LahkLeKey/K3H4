import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UsdaCommodityAttributeCountOrderByAggregateInputObjectSchema as UsdaCommodityAttributeCountOrderByAggregateInputObjectSchema } from './UsdaCommodityAttributeCountOrderByAggregateInput.schema';
import { UsdaCommodityAttributeMaxOrderByAggregateInputObjectSchema as UsdaCommodityAttributeMaxOrderByAggregateInputObjectSchema } from './UsdaCommodityAttributeMaxOrderByAggregateInput.schema';
import { UsdaCommodityAttributeMinOrderByAggregateInputObjectSchema as UsdaCommodityAttributeMinOrderByAggregateInputObjectSchema } from './UsdaCommodityAttributeMinOrderByAggregateInput.schema'

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
  _count: z.lazy(() => UsdaCommodityAttributeCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => UsdaCommodityAttributeMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => UsdaCommodityAttributeMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const UsdaCommodityAttributeOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UsdaCommodityAttributeOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCommodityAttributeOrderByWithAggregationInput>;
export const UsdaCommodityAttributeOrderByWithAggregationInputObjectZodSchema = makeSchema();
