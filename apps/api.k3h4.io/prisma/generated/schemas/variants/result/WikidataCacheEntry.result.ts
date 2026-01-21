import * as z from 'zod';
// prettier-ignore
export const WikidataCacheEntryResultSchema = z.object({
    id: z.string(),
    resource: z.string(),
    endpoint: z.string(),
    params: z.unknown().nullable(),
    paramsHash: z.string(),
    url: z.string(),
    statusCode: z.number().int(),
    payload: z.unknown().nullable(),
    fetchedAt: z.date(),
    expiresAt: z.date().nullable(),
    cacheControlSeconds: z.number().int().nullable(),
    etag: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type WikidataCacheEntryResultType = z.infer<typeof WikidataCacheEntryResultSchema>;
