import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  ticketId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  price: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const PosLineItemMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PosLineItemMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemMinOrderByAggregateInput>;
export const PosLineItemMinOrderByAggregateInputObjectZodSchema = makeSchema();
