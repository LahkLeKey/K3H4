import * as z from 'zod';
// prettier-ignore
export const MaptilerCacheEntryInputSchema = z.object({
    id: z.string(),
    userId: z.string().optional().nullable(),
    user: z.unknown().optional().nullable(),
    actorId: z.string().optional().nullable(),
    actor: z.unknown().optional().nullable(),
    queryId: z.string().optional().nullable(),
    query: z.unknown().optional().nullable(),
    kind: z.string(),
    path: z.string(),
    params: z.unknown().optional().nullable(),
    paramsHash: z.string(),
    signature: z.string(),
    method: z.string(),
    responseType: z.string(),
    url: z.string(),
    statusCode: z.number().int().optional().nullable(),
    payload: z.unknown().optional().nullable(),
    data: z.instanceof(Uint8Array).optional().nullable(),
    contentType: z.string().optional().nullable(),
    cacheControl: z.string().optional().nullable(),
    fetchedAt: z.date(),
    expiresAt: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type MaptilerCacheEntryInputType = z.infer<typeof MaptilerCacheEntryInputSchema>;
