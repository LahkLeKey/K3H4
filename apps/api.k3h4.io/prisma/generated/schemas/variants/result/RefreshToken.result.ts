import * as z from 'zod';
// prettier-ignore
export const RefreshTokenResultSchema = z.object({
    id: z.string(),
    token: z.string(),
    userId: z.string(),
    user: z.unknown(),
    createdAt: z.date(),
    expiresAt: z.date()
}).strict();

export type RefreshTokenResultType = z.infer<typeof RefreshTokenResultSchema>;
