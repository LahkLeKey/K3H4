import * as z from 'zod';
// prettier-ignore
export const ProviderGrantInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    provider: z.string(),
    providerId: z.string(),
    accessToken: z.string(),
    scope: z.string().optional().nullable(),
    expiresAt: z.date().optional().nullable(),
    createdAt: z.date()
}).strict();

export type ProviderGrantInputType = z.infer<typeof ProviderGrantInputSchema>;
