import * as z from 'zod';
// prettier-ignore
export const ArcadeSessionInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    machineId: z.string(),
    machine: z.unknown(),
    cardId: z.string(),
    card: z.unknown(),
    creditsSpent: z.number(),
    score: z.number().int().optional().nullable(),
    rewardRedemptionId: z.string().optional().nullable(),
    rewardRedemption: z.unknown().optional().nullable(),
    startedAt: z.date(),
    endedAt: z.date().optional().nullable()
}).strict();

export type ArcadeSessionInputType = z.infer<typeof ArcadeSessionInputSchema>;
