import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  slotIndex: SortOrderSchema.optional(),
  unlockedAt: SortOrderSchema.optional(),
  costPaid: SortOrderSchema.optional(),
  plotId: SortOrderSchema.optional()
}).strict();
export const AgricultureSlotMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureSlotMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotMinOrderByAggregateInput>;
export const AgricultureSlotMinOrderByAggregateInputObjectZodSchema = makeSchema();
