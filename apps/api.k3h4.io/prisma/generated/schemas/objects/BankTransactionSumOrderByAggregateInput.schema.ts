import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  amount: SortOrderSchema.optional(),
  balanceAfter: SortOrderSchema.optional()
}).strict();
export const BankTransactionSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.BankTransactionSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionSumOrderByAggregateInput>;
export const BankTransactionSumOrderByAggregateInputObjectZodSchema = makeSchema();
