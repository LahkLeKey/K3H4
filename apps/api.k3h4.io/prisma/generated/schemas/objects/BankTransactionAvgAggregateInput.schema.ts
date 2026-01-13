import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  amount: z.literal(true).optional(),
  balanceAfter: z.literal(true).optional()
}).strict();
export const BankTransactionAvgAggregateInputObjectSchema: z.ZodType<Prisma.BankTransactionAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionAvgAggregateInputType>;
export const BankTransactionAvgAggregateInputObjectZodSchema = makeSchema();
