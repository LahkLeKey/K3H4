import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  total: SortOrderSchema.optional(),
  itemsCount: SortOrderSchema.optional()
}).strict();
export const PosTicketAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PosTicketAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketAvgOrderByAggregateInput>;
export const PosTicketAvgOrderByAggregateInputObjectZodSchema = makeSchema();
