import * as z from 'zod';
// prettier-ignore
export const GeoRouteCacheResultSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    provider: z.string(),
    signature: z.string(),
    originLat: z.number(),
    originLng: z.number(),
    destinationLat: z.number(),
    destinationLng: z.number(),
    distanceKm: z.number(),
    durationMinutes: z.number().int().nullable(),
    geojson: z.unknown().nullable(),
    expiresAt: z.date(),
    createdAt: z.date()
}).strict();

export type GeoRouteCacheResultType = z.infer<typeof GeoRouteCacheResultSchema>;
