import * as z from 'zod';
// prettier-ignore
export const GeoDemTileCacheModelSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    provider: z.string(),
    source: z.string().nullable(),
    signature: z.string(),
    z: z.number().int(),
    x: z.number().int(),
    y: z.number().int(),
    format: z.string(),
    url: z.string().nullable(),
    data: z.instanceof(Uint8Array).nullable(),
    byteLength: z.number().int().nullable(),
    etag: z.string().nullable(),
    cacheControl: z.string().nullable(),
    expiresAt: z.date().nullable(),
    fetchedAt: z.date(),
    lastAccessed: z.date(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type GeoDemTileCachePureType = z.infer<typeof GeoDemTileCacheModelSchema>;
