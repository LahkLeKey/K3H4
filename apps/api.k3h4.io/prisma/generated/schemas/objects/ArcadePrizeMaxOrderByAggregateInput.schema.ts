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
export const ArcadePrizeMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ArcadePrizeMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeMaxOrderByAggregateInput>;
export const ArcadePrizeMaxOrderByAggregateInputObjectZodSchema = makeSchema();
