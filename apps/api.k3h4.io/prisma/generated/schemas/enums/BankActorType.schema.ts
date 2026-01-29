import * as z from 'zod';

export const BankActorTypeSchema = z.enum(['BANK_ACCOUNT'])

export type BankActorType = z.infer<typeof BankActorTypeSchema>;