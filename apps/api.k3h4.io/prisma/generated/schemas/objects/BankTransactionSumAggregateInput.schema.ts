import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  amount: z.literal(true).optional(),
  balanceAfter: z.literal(true).optional()
}).strict();
export const BankTransactionSumAggregateInputObjectSchema: z.ZodType<Prisma.BankTransactionSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionSumAggregateInputType>;
export const BankTransactionSumAggregateInputObjectZodSchema = makeSchema();
