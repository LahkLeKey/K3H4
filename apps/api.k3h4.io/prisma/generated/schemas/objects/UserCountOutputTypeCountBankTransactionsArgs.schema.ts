import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionWhereInputObjectSchema as BankTransactionWhereInputObjectSchema } from './BankTransactionWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => BankTransactionWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountBankTransactionsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountBankTransactionsArgsObjectZodSchema = makeSchema();
