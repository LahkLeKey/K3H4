import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  storeId: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  itemsCount: SortOrderSchema.optional(),
  channel: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const PosTicketMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PosTicketMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketMaxOrderByAggregateInput>;
export const PosTicketMaxOrderByAggregateInputObjectZodSchema = makeSchema();
