import * as z from 'zod';
// prettier-ignore
export const ArcadeRedemptionResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    cardId: z.string().nullable(),
    card: z.unknown().nullable(),
    prizeId: z.string(),
    prize: z.unknown(),
    status: z.string(),
    fulfilledAt: z.date().nullable(),
    createdAt: z.date(),
    sessions: z.array(z.unknown())
}).strict();

export type ArcadeRedemptionResultType = z.infer<typeof ArcadeRedemptionResultSchema>;
