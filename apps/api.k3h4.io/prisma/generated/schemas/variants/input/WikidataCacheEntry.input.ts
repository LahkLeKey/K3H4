import * as z from 'zod';
// prettier-ignore
export const WikidataCacheEntryInputSchema = z.object({
    id: z.string(),
    resource: z.string(),
    endpoint: z.string(),
    params: z.unknown().optional().nullable(),
    paramsHash: z.string(),
    url: z.string(),
    statusCode: z.number().int(),
    payload: z.unknown().optional().nullable(),
    fetchedAt: z.date(),
    expiresAt: z.date().optional().nullable(),
    cacheControlSeconds: z.number().int().optional().nullable(),
    etag: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type WikidataCacheEntryInputType = z.infer<typeof WikidataCacheEntryInputSchema>;
