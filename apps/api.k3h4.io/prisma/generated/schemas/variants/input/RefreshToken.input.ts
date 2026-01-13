import * as z from 'zod';
// prettier-ignore
export const RefreshTokenInputSchema = z.object({
    id: z.string(),
    token: z.string(),
    userId: z.string(),
    user: z.unknown(),
    createdAt: z.date(),
    expiresAt: z.date()
}).strict();

export type RefreshTokenInputType = z.infer<typeof RefreshTokenInputSchema>;
