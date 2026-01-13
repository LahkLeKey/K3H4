import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  slotIndex: SortOrderSchema.optional(),
  costPaid: SortOrderSchema.optional()
}).strict();
export const AgricultureSlotAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureSlotAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotAvgOrderByAggregateInput>;
export const AgricultureSlotAvgOrderByAggregateInputObjectZodSchema = makeSchema();
