import * as z from 'zod';
// prettier-ignore
export const ProviderGrantModelSchema = z.object({
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

export type ProviderGrantPureType = z.infer<typeof ProviderGrantModelSchema>;
