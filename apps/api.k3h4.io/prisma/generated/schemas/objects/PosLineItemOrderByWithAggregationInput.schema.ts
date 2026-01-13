import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { PosLineItemCountOrderByAggregateInputObjectSchema as PosLineItemCountOrderByAggregateInputObjectSchema } from './PosLineItemCountOrderByAggregateInput.schema';
import { PosLineItemAvgOrderByAggregateInputObjectSchema as PosLineItemAvgOrderByAggregateInputObjectSchema } from './PosLineItemAvgOrderByAggregateInput.schema';
import { PosLineItemMaxOrderByAggregateInputObjectSchema as PosLineItemMaxOrderByAggregateInputObjectSchema } from './PosLineItemMaxOrderByAggregateInput.schema';
import { PosLineItemMinOrderByAggregateInputObjectSchema as PosLineItemMinOrderByAggregateInputObjectSchema } from './PosLineItemMinOrderByAggregateInput.schema';
import { PosLineItemSumOrderByAggregateInputObjectSchema as PosLineItemSumOrderByAggregateInputObjectSchema } from './PosLineItemSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  ticketId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => PosLineItemCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => PosLineItemAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PosLineItemMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PosLineItemMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => PosLineItemSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PosLineItemOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PosLineItemOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemOrderByWithAggregationInput>;
export const PosLineItemOrderByWithAggregationInputObjectZodSchema = makeSchema();
