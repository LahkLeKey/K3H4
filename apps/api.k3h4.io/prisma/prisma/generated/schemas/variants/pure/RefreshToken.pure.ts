import * as z from 'zod';
// prettier-ignore
export const RefreshTokenModelSchema = z.object({
    id: z.string(),
    token: z.string(),
    userId: z.string(),
    user: z.unknown(),
    createdAt: z.date(),
    expiresAt: z.date()
}).strict();

export type RefreshTokenPureType = z.infer<typeof RefreshTokenModelSchema>;
