import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ArcadeCardCountOrderByAggregateInputObjectSchema as ArcadeCardCountOrderByAggregateInputObjectSchema } from './ArcadeCardCountOrderByAggregateInput.schema';
import { ArcadeCardAvgOrderByAggregateInputObjectSchema as ArcadeCardAvgOrderByAggregateInputObjectSchema } from './ArcadeCardAvgOrderByAggregateInput.schema';
import { ArcadeCardMaxOrderByAggregateInputObjectSchema as ArcadeCardMaxOrderByAggregateInputObjectSchema } from './ArcadeCardMaxOrderByAggregateInput.schema';
import { ArcadeCardMinOrderByAggregateInputObjectSchema as ArcadeCardMinOrderByAggregateInputObjectSchema } from './ArcadeCardMinOrderByAggregateInput.schema';
import { ArcadeCardSumOrderByAggregateInputObjectSchema as ArcadeCardSumOrderByAggregateInputObjectSchema } from './ArcadeCardSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  label: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  balance: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ArcadeCardCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ArcadeCardAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ArcadeCardMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ArcadeCardMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ArcadeCardSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ArcadeCardOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ArcadeCardOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardOrderByWithAggregationInput>;
export const ArcadeCardOrderByWithAggregationInputObjectZodSchema = makeSchema();
