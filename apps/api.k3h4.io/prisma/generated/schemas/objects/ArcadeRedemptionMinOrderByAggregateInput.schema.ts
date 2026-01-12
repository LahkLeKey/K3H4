import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  cardId: SortOrderSchema.optional(),
  prizeId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  fulfilledAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const ArcadeRedemptionMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionMinOrderByAggregateInput>;
export const ArcadeRedemptionMinOrderByAggregateInputObjectZodSchema = makeSchema();
