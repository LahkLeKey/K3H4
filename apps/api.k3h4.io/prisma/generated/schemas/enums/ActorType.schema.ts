import * as z from 'zod';

export const ActorTypeSchema = z.enum(['BANK_ACCOUNT', 'ARCADE_MACHINE', 'ARCADE_PLAYER_CARD', 'ARCADE_PRIZE'])

export type ActorType = z.infer<typeof ActorTypeSchema>;