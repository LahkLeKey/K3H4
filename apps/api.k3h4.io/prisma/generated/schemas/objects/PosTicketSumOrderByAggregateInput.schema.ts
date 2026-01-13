import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  total: SortOrderSchema.optional(),
  itemsCount: SortOrderSchema.optional()
}).strict();
export const PosTicketSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PosTicketSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketSumOrderByAggregateInput>;
export const PosTicketSumOrderByAggregateInputObjectZodSchema = makeSchema();
