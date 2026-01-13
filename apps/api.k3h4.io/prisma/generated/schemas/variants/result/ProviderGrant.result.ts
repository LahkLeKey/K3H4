import * as z from 'zod';
// prettier-ignore
export const ProviderGrantResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    provider: z.string(),
    providerId: z.string(),
    accessToken: z.string(),
    scope: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date()
}).strict();

export type ProviderGrantResultType = z.infer<typeof ProviderGrantResultSchema>;
