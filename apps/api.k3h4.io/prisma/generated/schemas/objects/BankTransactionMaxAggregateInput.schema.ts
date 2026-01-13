import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  amount: z.literal(true).optional(),
  kind: z.literal(true).optional(),
  direction: z.literal(true).optional(),
  note: z.literal(true).optional(),
  balanceAfter: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const BankTransactionMaxAggregateInputObjectSchema: z.ZodType<Prisma.BankTransactionMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionMaxAggregateInputType>;
export const BankTransactionMaxAggregateInputObjectZodSchema = makeSchema();
