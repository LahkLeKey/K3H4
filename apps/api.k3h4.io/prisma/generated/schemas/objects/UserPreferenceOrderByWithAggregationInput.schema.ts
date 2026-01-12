import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserPreferenceCountOrderByAggregateInputObjectSchema as UserPreferenceCountOrderByAggregateInputObjectSchema } from './UserPreferenceCountOrderByAggregateInput.schema';
import { UserPreferenceMaxOrderByAggregateInputObjectSchema as UserPreferenceMaxOrderByAggregateInputObjectSchema } from './UserPreferenceMaxOrderByAggregateInput.schema';
import { UserPreferenceMinOrderByAggregateInputObjectSchema as UserPreferenceMinOrderByAggregateInputObjectSchema } from './UserPreferenceMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  theme: SortOrderSchema.optional(),
  locale: SortOrderSchema.optional(),
  timezone: SortOrderSchema.optional(),
  marketingOptIn: SortOrderSchema.optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => UserPreferenceCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => UserPreferenceMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => UserPreferenceMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const UserPreferenceOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UserPreferenceOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceOrderByWithAggregationInput>;
export const UserPreferenceOrderByWithAggregationInputObjectZodSchema = makeSchema();
