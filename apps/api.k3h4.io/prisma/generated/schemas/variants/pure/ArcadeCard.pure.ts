import * as z from 'zod';
// prettier-ignore
export const ArcadeCardModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    label: z.string().nullable(),
    balance: z.number(),
    status: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    topUps: z.array(z.unknown()),
    sessions: z.array(z.unknown()),
    redemptions: z.array(z.unknown())
}).strict();

export type ArcadeCardPureType = z.infer<typeof ArcadeCardModelSchema>;
