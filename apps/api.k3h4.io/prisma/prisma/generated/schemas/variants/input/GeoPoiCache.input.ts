import * as z from 'zod';
// prettier-ignore
export const GeoPoiCacheInputSchema = z.object({
    id: z.string(),
    userId: z.string().optional().nullable(),
    user: z.unknown().optional().nullable(),
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

export type GeoPoiCacheInputType = z.infer<typeof GeoPoiCacheInputSchema>;
