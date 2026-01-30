import * as z from 'zod';
// prettier-ignore
export const ApiCacheEntryInputSchema = z.object({
    id: z.string(),
    provider: z.string(),
    scope: z.string(),
    endpoint: z.string(),
    params: z.unknown().optional().nullable(),
    paramsHash: z.string(),
    payload: z.unknown().optional().nullable(),
    fetchedAt: z.date(),
    expiresAt: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ApiCacheEntryInputType = z.infer<typeof ApiCacheEntryInputSchema>;
