import * as z from 'zod';
// prettier-ignore
export const ArcadePrizeResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    name: z.string(),
    sku: z.string().nullable(),
    costCoins: z.number(),
    stock: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    redemptions: z.array(z.unknown())
}).strict();

export type ArcadePrizeResultType = z.infer<typeof ArcadePrizeResultSchema>;
