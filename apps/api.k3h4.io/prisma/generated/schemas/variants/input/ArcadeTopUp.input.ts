import * as z from 'zod';
// prettier-ignore
export const ArcadeTopUpInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    cardId: z.string(),
    card: z.unknown(),
    amount: z.number(),
    source: z.string(),
    createdAt: z.date()
}).strict();

export type ArcadeTopUpInputType = z.infer<typeof ArcadeTopUpInputSchema>;
