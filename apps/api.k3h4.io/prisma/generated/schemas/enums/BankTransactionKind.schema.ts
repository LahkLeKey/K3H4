import * as z from 'zod';

export const BankTransactionKindSchema = z.enum(['DEPOSIT', 'WITHDRAWAL', 'SET', 'ASSIGNMENT_PAYOUT', 'FREIGHT_PAYMENT', 'ARCADE_TOPUP'])

export type BankTransactionKind = z.infer<typeof BankTransactionKindSchema>;