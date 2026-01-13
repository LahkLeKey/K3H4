import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ArcadeRedemptionCountOrderByAggregateInputObjectSchema as ArcadeRedemptionCountOrderByAggregateInputObjectSchema } from './ArcadeRedemptionCountOrderByAggregateInput.schema';
import { ArcadeRedemptionMaxOrderByAggregateInputObjectSchema as ArcadeRedemptionMaxOrderByAggregateInputObjectSchema } from './ArcadeRedemptionMaxOrderByAggregateInput.schema';
import { ArcadeRedemptionMinOrderByAggregateInputObjectSchema as ArcadeRedemptionMinOrderByAggregateInputObjectSchema } from './ArcadeRedemptionMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  cardId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  prizeId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  fulfilledAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ArcadeRedemptionCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ArcadeRedemptionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ArcadeRedemptionMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ArcadeRedemptionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionOrderByWithAggregationInput>;
export const ArcadeRedemptionOrderByWithAggregationInputObjectZodSchema = makeSchema();
