import * as z from 'zod';
// prettier-ignore
export const GeoDirectionSegmentResultSchema = z.object({
    id: z.string(),
    directionId: z.string(),
    direction: z.unknown(),
    sequence: z.number().int(),
    instruction: z.string().nullable(),
    maneuverType: z.string().nullable(),
    maneuverModifier: z.string().nullable(),
    distanceMeters: z.number(),
    durationSeconds: z.number().int().nullable(),
    startLat: z.number(),
    startLng: z.number(),
    endLat: z.number(),
    endLng: z.number(),
    geometry: z.unknown().nullable(),
    metadata: z.unknown().nullable(),
    createdAt: z.date()
}).strict();

export type GeoDirectionSegmentResultType = z.infer<typeof GeoDirectionSegmentResultSchema>;
