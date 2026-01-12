import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  theme: SortOrderSchema.optional(),
  locale: SortOrderSchema.optional(),
  timezone: SortOrderSchema.optional(),
  marketingOptIn: SortOrderSchema.optional(),
  note: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const UserPreferenceMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserPreferenceMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceMinOrderByAggregateInput>;
export const UserPreferenceMinOrderByAggregateInputObjectZodSchema = makeSchema();
