import * as z from 'zod';
// prettier-ignore
export const ArcadeSessionModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    machineId: z.string(),
    machine: z.unknown(),
    cardId: z.string(),
    card: z.unknown(),
    creditsSpent: z.number(),
    score: z.number().int().nullable(),
    rewardRedemptionId: z.string().nullable(),
    rewardRedemption: z.unknown().nullable(),
    startedAt: z.date(),
    endedAt: z.date().nullable()
}).strict();

export type ArcadeSessionPureType = z.infer<typeof ArcadeSessionModelSchema>;
