import * as z from 'zod';

export const BankTransactionDirectionSchema = z.enum(['CREDIT', 'DEBIT'])

export type BankTransactionDirection = z.infer<typeof BankTransactionDirectionSchema>;