import * as z from 'zod';
// prettier-ignore
export const BankTransactionInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    amount: z.number(),
    kind: z.string(),
    direction: z.string(),
    note: z.string().optional().nullable(),
    balanceAfter: z.number(),
    createdAt: z.date()
}).strict();

export type BankTransactionInputType = z.infer<typeof BankTransactionInputSchema>;
