import * as z from 'zod';
// prettier-ignore
export const GeoDemTileCacheInputSchema = z.object({
    id: z.string(),
    userId: z.string().optional().nullable(),
    user: z.unknown().optional().nullable(),
    provider: z.string(),
    source: z.string().optional().nullable(),
    signature: z.string(),
    z: z.number().int(),
    x: z.number().int(),
    y: z.number().int(),
    format: z.string(),
    url: z.string().optional().nullable(),
    data: z.instanceof(Uint8Array).optional().nullable(),
    byteLength: z.number().int().optional().nullable(),
    etag: z.string().optional().nullable(),
    cacheControl: z.string().optional().nullable(),
    expiresAt: z.date().optional().nullable(),
    fetchedAt: z.date(),
    lastAccessed: z.date(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type GeoDemTileCacheInputType = z.infer<typeof GeoDemTileCacheInputSchema>;
