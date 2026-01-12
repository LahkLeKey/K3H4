import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  kind: SortOrderSchema.optional(),
  direction: SortOrderSchema.optional(),
  note: SortOrderSchema.optional(),
  balanceAfter: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const BankTransactionCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BankTransactionCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionCountOrderByAggregateInput>;
export const BankTransactionCountOrderByAggregateInputObjectZodSchema = makeSchema();
