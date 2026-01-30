import * as z from 'zod';
// prettier-ignore
export const ApiCacheEntryModelSchema = z.object({
    id: z.string(),
    provider: z.string(),
    scope: z.string(),
    endpoint: z.string(),
    params: z.unknown().nullable(),
    paramsHash: z.string(),
    payload: z.unknown().nullable(),
    fetchedAt: z.date(),
    expiresAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ApiCacheEntryPureType = z.infer<typeof ApiCacheEntryModelSchema>;
