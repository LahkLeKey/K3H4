import * as z from 'zod';

export const BankTransactionScalarFieldEnumSchema = z.enum(['id', 'userId', 'amount', 'kind', 'direction', 'note', 'balanceAfter', 'createdAt'])

export type BankTransactionScalarFieldEnum = z.infer<typeof BankTransactionScalarFieldEnumSchema>;