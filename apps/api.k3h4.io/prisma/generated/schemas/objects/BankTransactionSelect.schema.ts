import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  amount: z.boolean().optional(),
  kind: z.boolean().optional(),
  direction: z.boolean().optional(),
  note: z.boolean().optional(),
  balanceAfter: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const BankTransactionSelectObjectSchema: z.ZodType<Prisma.BankTransactionSelect> = makeSchema() as unknown as z.ZodType<Prisma.BankTransactionSelect>;
export const BankTransactionSelectObjectZodSchema = makeSchema();
