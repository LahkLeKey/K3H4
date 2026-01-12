import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RefreshTokenCountOrderByAggregateInputObjectSchema as RefreshTokenCountOrderByAggregateInputObjectSchema } from './RefreshTokenCountOrderByAggregateInput.schema';
import { RefreshTokenMaxOrderByAggregateInputObjectSchema as RefreshTokenMaxOrderByAggregateInputObjectSchema } from './RefreshTokenMaxOrderByAggregateInput.schema';
import { RefreshTokenMinOrderByAggregateInputObjectSchema as RefreshTokenMinOrderByAggregateInputObjectSchema } from './RefreshTokenMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  token: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  _count: z.lazy(() => RefreshTokenCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => RefreshTokenMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => RefreshTokenMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const RefreshTokenOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RefreshTokenOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenOrderByWithAggregationInput>;
export const RefreshTokenOrderByWithAggregationInputObjectZodSchema = makeSchema();
