import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AgricultureInventoryCountOrderByAggregateInputObjectSchema as AgricultureInventoryCountOrderByAggregateInputObjectSchema } from './AgricultureInventoryCountOrderByAggregateInput.schema';
import { AgricultureInventoryAvgOrderByAggregateInputObjectSchema as AgricultureInventoryAvgOrderByAggregateInputObjectSchema } from './AgricultureInventoryAvgOrderByAggregateInput.schema';
import { AgricultureInventoryMaxOrderByAggregateInputObjectSchema as AgricultureInventoryMaxOrderByAggregateInputObjectSchema } from './AgricultureInventoryMaxOrderByAggregateInput.schema';
import { AgricultureInventoryMinOrderByAggregateInputObjectSchema as AgricultureInventoryMinOrderByAggregateInputObjectSchema } from './AgricultureInventoryMinOrderByAggregateInput.schema';
import { AgricultureInventorySumOrderByAggregateInputObjectSchema as AgricultureInventorySumOrderByAggregateInputObjectSchema } from './AgricultureInventorySumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  sku: SortOrderSchema.optional(),
  description: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  totalQuantity: SortOrderSchema.optional(),
  unit: SortOrderSchema.optional(),
  location: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => AgricultureInventoryCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => AgricultureInventoryAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AgricultureInventoryMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AgricultureInventoryMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => AgricultureInventorySumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AgricultureInventoryOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryOrderByWithAggregationInput>;
export const AgricultureInventoryOrderByWithAggregationInputObjectZodSchema = makeSchema();
