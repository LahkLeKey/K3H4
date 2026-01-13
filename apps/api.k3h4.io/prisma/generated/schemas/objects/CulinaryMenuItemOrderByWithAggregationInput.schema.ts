import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { CulinaryMenuItemCountOrderByAggregateInputObjectSchema as CulinaryMenuItemCountOrderByAggregateInputObjectSchema } from './CulinaryMenuItemCountOrderByAggregateInput.schema';
import { CulinaryMenuItemAvgOrderByAggregateInputObjectSchema as CulinaryMenuItemAvgOrderByAggregateInputObjectSchema } from './CulinaryMenuItemAvgOrderByAggregateInput.schema';
import { CulinaryMenuItemMaxOrderByAggregateInputObjectSchema as CulinaryMenuItemMaxOrderByAggregateInputObjectSchema } from './CulinaryMenuItemMaxOrderByAggregateInput.schema';
import { CulinaryMenuItemMinOrderByAggregateInputObjectSchema as CulinaryMenuItemMinOrderByAggregateInputObjectSchema } from './CulinaryMenuItemMinOrderByAggregateInput.schema';
import { CulinaryMenuItemSumOrderByAggregateInputObjectSchema as CulinaryMenuItemSumOrderByAggregateInputObjectSchema } from './CulinaryMenuItemSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  prepMinutes: SortOrderSchema.optional(),
  cost: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => CulinaryMenuItemCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => CulinaryMenuItemAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CulinaryMenuItemMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CulinaryMenuItemMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => CulinaryMenuItemSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CulinaryMenuItemOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemOrderByWithAggregationInput>;
export const CulinaryMenuItemOrderByWithAggregationInputObjectZodSchema = makeSchema();
