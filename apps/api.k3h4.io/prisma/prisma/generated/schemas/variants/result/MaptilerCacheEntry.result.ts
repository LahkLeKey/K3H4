import * as z from 'zod';
// prettier-ignore
export const MaptilerCacheEntryResultSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    actorId: z.string().nullable(),
    actor: z.unknown().nullable(),
    queryId: z.string().nullable(),
    query: z.unknown().nullable(),
    kind: z.string(),
    path: z.string(),
    params: z.unknown().nullable(),
    paramsHash: z.string(),
    signature: z.string(),
    method: z.string(),
    responseType: z.string(),
    url: z.string(),
    statusCode: z.number().int().nullable(),
    payload: z.unknown().nullable(),
    data: z.instanceof(Uint8Array).nullable(),
    contentType: z.string().nullable(),
    cacheControl: z.string().nullable(),
    fetchedAt: z.date(),
    expiresAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type MaptilerCacheEntryResultType = z.infer<typeof MaptilerCacheEntryResultSchema>;
