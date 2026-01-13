import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AgricultureInventoryMovementCountOrderByAggregateInputObjectSchema as AgricultureInventoryMovementCountOrderByAggregateInputObjectSchema } from './AgricultureInventoryMovementCountOrderByAggregateInput.schema';
import { AgricultureInventoryMovementAvgOrderByAggregateInputObjectSchema as AgricultureInventoryMovementAvgOrderByAggregateInputObjectSchema } from './AgricultureInventoryMovementAvgOrderByAggregateInput.schema';
import { AgricultureInventoryMovementMaxOrderByAggregateInputObjectSchema as AgricultureInventoryMovementMaxOrderByAggregateInputObjectSchema } from './AgricultureInventoryMovementMaxOrderByAggregateInput.schema';
import { AgricultureInventoryMovementMinOrderByAggregateInputObjectSchema as AgricultureInventoryMovementMinOrderByAggregateInputObjectSchema } from './AgricultureInventoryMovementMinOrderByAggregateInput.schema';
import { AgricultureInventoryMovementSumOrderByAggregateInputObjectSchema as AgricultureInventoryMovementSumOrderByAggregateInputObjectSchema } from './AgricultureInventoryMovementSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  inventoryId: SortOrderSchema.optional(),
  shipmentId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  type: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  reason: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => AgricultureInventoryMovementCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => AgricultureInventoryMovementAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => AgricultureInventoryMovementMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => AgricultureInventoryMovementMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => AgricultureInventoryMovementSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const AgricultureInventoryMovementOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementOrderByWithAggregationInput>;
export const AgricultureInventoryMovementOrderByWithAggregationInputObjectZodSchema = makeSchema();
