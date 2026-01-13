import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionSelectObjectSchema as BankTransactionSelectObjectSchema } from './BankTransactionSelect.schema';
import { BankTransactionIncludeObjectSchema as BankTransactionIncludeObjectSchema } from './BankTransactionInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => BankTransactionSelectObjectSchema).optional(),
  include: z.lazy(() => BankTransactionIncludeObjectSchema).optional()
}).strict();
export const BankTransactionArgsObjectSchema = makeSchema();
export const BankTransactionArgsObjectZodSchema = makeSchema();
