import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  slotIndex: SortOrderSchema.optional(),
  costPaid: SortOrderSchema.optional()
}).strict();
export const AgricultureSlotSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureSlotSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotSumOrderByAggregateInput>;
export const AgricultureSlotSumOrderByAggregateInputObjectZodSchema = makeSchema();
