import * as z from 'zod';
// prettier-ignore
export const GeoPoiCacheModelSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    signature: z.string(),
    centerLat: z.number(),
    centerLng: z.number(),
    radiusM: z.number().int(),
    kinds: z.string(),
    pois: z.unknown(),
    count: z.number().int(),
    expiresAt: z.date(),
    createdAt: z.date()
}).strict();

export type GeoPoiCachePureType = z.infer<typeof GeoPoiCacheModelSchema>;
