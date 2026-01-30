import * as z from 'zod';

export const EntityKindSchema = z.enum(['DEPOSIT', 'WITHDRAWAL', 'SET', 'ASSIGNMENT_PAYOUT', 'FREIGHT_PAYMENT', 'ARCADE_TOPUP', 'ARCADE_SESSION', 'ARCADE_PRIZE_REDEMPTION'])

export type EntityKind = z.infer<typeof EntityKindSchema>;