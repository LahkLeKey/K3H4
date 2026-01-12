import * as z from 'zod';
// prettier-ignore
export const CulinaryMenuItemResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    name: z.string(),
    prepMinutes: z.number().int(),
    cost: z.number(),
    price: z.number(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type CulinaryMenuItemResultType = z.infer<typeof CulinaryMenuItemResultSchema>;
