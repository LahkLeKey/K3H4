import * as z from 'zod';

export const ArcadeSessionScalarFieldEnumSchema = z.enum(['id', 'userId', 'machineId', 'cardId', 'creditsSpent', 'score', 'rewardRedemptionId', 'startedAt', 'endedAt'])

export type ArcadeSessionScalarFieldEnum = z.infer<typeof ArcadeSessionScalarFieldEnumSchema>;