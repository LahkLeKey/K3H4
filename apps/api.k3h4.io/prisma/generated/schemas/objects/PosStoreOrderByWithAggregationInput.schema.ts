import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { PosStoreCountOrderByAggregateInputObjectSchema as PosStoreCountOrderByAggregateInputObjectSchema } from './PosStoreCountOrderByAggregateInput.schema';
import { PosStoreMaxOrderByAggregateInputObjectSchema as PosStoreMaxOrderByAggregateInputObjectSchema } from './PosStoreMaxOrderByAggregateInput.schema';
import { PosStoreMinOrderByAggregateInputObjectSchema as PosStoreMinOrderByAggregateInputObjectSchema } from './PosStoreMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  channel: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => PosStoreCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PosStoreMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PosStoreMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PosStoreOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PosStoreOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreOrderByWithAggregationInput>;
export const PosStoreOrderByWithAggregationInputObjectZodSchema = makeSchema();
