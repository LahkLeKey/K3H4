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
export const PosLineItemMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PosLineItemMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemMaxOrderByAggregateInput>;
export const PosLineItemMaxOrderByAggregateInputObjectZodSchema = makeSchema();
