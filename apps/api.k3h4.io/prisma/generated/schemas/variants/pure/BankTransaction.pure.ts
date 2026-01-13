import * as z from 'zod';
// prettier-ignore
export const BankTransactionModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    amount: z.number(),
    kind: z.string(),
    direction: z.string(),
    note: z.string().nullable(),
    balanceAfter: z.number(),
    createdAt: z.date()
}).strict();

export type BankTransactionPureType = z.infer<typeof BankTransactionModelSchema>;
