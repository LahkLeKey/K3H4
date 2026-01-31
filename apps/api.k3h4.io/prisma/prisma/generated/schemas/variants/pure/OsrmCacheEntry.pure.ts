import * as z from 'zod';
// prettier-ignore
export const OsrmCacheEntryModelSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    actorId: z.string().nullable(),
    actor: z.unknown().nullable(),
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

export type OsrmCacheEntryPureType = z.infer<typeof OsrmCacheEntryModelSchema>;
