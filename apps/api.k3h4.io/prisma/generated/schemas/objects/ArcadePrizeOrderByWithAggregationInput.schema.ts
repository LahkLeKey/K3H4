import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ArcadePrizeCountOrderByAggregateInputObjectSchema as ArcadePrizeCountOrderByAggregateInputObjectSchema } from './ArcadePrizeCountOrderByAggregateInput.schema';
import { ArcadePrizeAvgOrderByAggregateInputObjectSchema as ArcadePrizeAvgOrderByAggregateInputObjectSchema } from './ArcadePrizeAvgOrderByAggregateInput.schema';
import { ArcadePrizeMaxOrderByAggregateInputObjectSchema as ArcadePrizeMaxOrderByAggregateInputObjectSchema } from './ArcadePrizeMaxOrderByAggregateInput.schema';
import { ArcadePrizeMinOrderByAggregateInputObjectSchema as ArcadePrizeMinOrderByAggregateInputObjectSchema } from './ArcadePrizeMinOrderByAggregateInput.schema';
import { ArcadePrizeSumOrderByAggregateInputObjectSchema as ArcadePrizeSumOrderByAggregateInputObjectSchema } from './ArcadePrizeSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  sku: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  costCoins: SortOrderSchema.optional(),
  stock: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ArcadePrizeCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ArcadePrizeAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ArcadePrizeMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ArcadePrizeMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ArcadePrizeSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ArcadePrizeOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ArcadePrizeOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeOrderByWithAggregationInput>;
export const ArcadePrizeOrderByWithAggregationInputObjectZodSchema = makeSchema();
