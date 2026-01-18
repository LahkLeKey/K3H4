import * as z from 'zod';
// prettier-ignore
export const OsrmCacheEntryResultSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    service: z.string(),
    profile: z.string(),
    coordinates: z.string().nullable(),
    params: z.unknown().nullable(),
    paramsHash: z.string(),
    signature: z.string(),
    url: z.string(),
    statusCode: z.number().int().nullable(),
    payload: z.unknown().nullable(),
    fetchedAt: z.date(),
    expiresAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type OsrmCacheEntryResultType = z.infer<typeof OsrmCacheEntryResultSchema>;
