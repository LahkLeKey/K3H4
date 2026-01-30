import * as z from 'zod';
// prettier-ignore
export const OsrmCacheEntryInputSchema = z.object({
    id: z.string(),
    userId: z.string().optional().nullable(),
    user: z.unknown().optional().nullable(),
    service: z.string(),
    profile: z.string(),
    coordinates: z.string().optional().nullable(),
    params: z.unknown().optional().nullable(),
    paramsHash: z.string(),
    signature: z.string(),
    url: z.string(),
    statusCode: z.number().int().optional().nullable(),
    payload: z.unknown().optional().nullable(),
    fetchedAt: z.date(),
    expiresAt: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type OsrmCacheEntryInputType = z.infer<typeof OsrmCacheEntryInputSchema>;
