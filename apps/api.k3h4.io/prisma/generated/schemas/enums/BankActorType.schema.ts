import * as z from 'zod';

export const BankActorTypeSchema = z.enum(['BANK_ACCOUNT', 'ARCADE_MACHINE', 'ARCADE_PLAYER_CARD', 'ARCADE_PRIZE'])

export type BankActorType = z.infer<typeof BankActorTypeSchema>;