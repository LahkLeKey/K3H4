import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  cardId: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const ArcadeTopUpMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpMinOrderByAggregateInput>;
export const ArcadeTopUpMinOrderByAggregateInputObjectZodSchema = makeSchema();
