import * as z from 'zod';
// prettier-ignore
export const GeoRouteCacheInputSchema = z.object({
    id: z.string(),
    userId: z.string().optional().nullable(),
    user: z.unknown().optional().nullable(),
    provider: z.string(),
    signature: z.string(),
    originLat: z.number(),
    originLng: z.number(),
    destinationLat: z.number(),
    destinationLng: z.number(),
    distanceKm: z.number(),
    durationMinutes: z.number().int().optional().nullable(),
    geojson: z.unknown().optional().nullable(),
    expiresAt: z.date(),
    createdAt: z.date()
}).strict();

export type GeoRouteCacheInputType = z.infer<typeof GeoRouteCacheInputSchema>;
