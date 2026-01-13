import * as z from 'zod';
export const BankTransactionFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  amount: z.number(),
  kind: z.string(),
  direction: z.string(),
  note: z.string().optional(),
  balanceAfter: z.number(),
  createdAt: z.date()
}));