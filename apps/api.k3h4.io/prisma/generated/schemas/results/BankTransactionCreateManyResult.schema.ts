import * as z from 'zod';
export const BankTransactionCreateManyResultSchema = z.object({
  count: z.number()
});