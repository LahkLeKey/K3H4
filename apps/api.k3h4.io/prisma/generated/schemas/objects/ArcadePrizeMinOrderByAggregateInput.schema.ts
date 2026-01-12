import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  sku: SortOrderSchema.optional(),
  costCoins: SortOrderSchema.optional(),
  stock: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ArcadePrizeMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ArcadePrizeMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeMinOrderByAggregateInput>;
export const ArcadePrizeMinOrderByAggregateInputObjectZodSchema = makeSchema();
