import * as z from 'zod';
// prettier-ignore
export const GeoQueryCacheModelSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    type: z.string(),
    signature: z.string(),
    params: z.unknown(),
    payload: z.unknown(),
    count: z.number().int().nullable(),
    expiresAt: z.date(),
    createdAt: z.date()
}).strict();

export type GeoQueryCachePureType = z.infer<typeof GeoQueryCacheModelSchema>;
