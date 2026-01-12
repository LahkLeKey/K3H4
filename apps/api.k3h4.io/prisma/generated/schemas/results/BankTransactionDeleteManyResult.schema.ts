import * as z from 'zod';
export const BankTransactionDeleteManyResultSchema = z.object({
  count: z.number()
});