import * as z from 'zod';
// prettier-ignore
export const GeoDirectionSegmentModelSchema = z.object({
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

export type GeoDirectionSegmentPureType = z.infer<typeof GeoDirectionSegmentModelSchema>;
