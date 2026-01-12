import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { WarehouseItemCountOrderByAggregateInputObjectSchema as WarehouseItemCountOrderByAggregateInputObjectSchema } from './WarehouseItemCountOrderByAggregateInput.schema';
import { WarehouseItemAvgOrderByAggregateInputObjectSchema as WarehouseItemAvgOrderByAggregateInputObjectSchema } from './WarehouseItemAvgOrderByAggregateInput.schema';
import { WarehouseItemMaxOrderByAggregateInputObjectSchema as WarehouseItemMaxOrderByAggregateInputObjectSchema } from './WarehouseItemMaxOrderByAggregateInput.schema';
import { WarehouseItemMinOrderByAggregateInputObjectSchema as WarehouseItemMinOrderByAggregateInputObjectSchema } from './WarehouseItemMinOrderByAggregateInput.schema';
import { WarehouseItemSumOrderByAggregateInputObjectSchema as WarehouseItemSumOrderByAggregateInputObjectSchema } from './WarehouseItemSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  sku: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  quantity: SortOrderSchema.optional(),
  location: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  freightLoadId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => WarehouseItemCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => WarehouseItemAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => WarehouseItemMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => WarehouseItemMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => WarehouseItemSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const WarehouseItemOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.WarehouseItemOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemOrderByWithAggregationInput>;
export const WarehouseItemOrderByWithAggregationInputObjectZodSchema = makeSchema();
