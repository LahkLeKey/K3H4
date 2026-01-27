import * as z from 'zod';
// prettier-ignore
export const GeoDirectionSegmentInputSchema = z.object({
    id: z.string(),
    directionId: z.string(),
    direction: z.unknown(),
    sequence: z.number().int(),
    instruction: z.string().optional().nullable(),
    maneuverType: z.string().optional().nullable(),
    maneuverModifier: z.string().optional().nullable(),
    distanceMeters: z.number(),
    durationSeconds: z.number().int().optional().nullable(),
    startLat: z.number(),
    startLng: z.number(),
    endLat: z.number(),
    endLng: z.number(),
    geometry: z.unknown().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date()
}).strict();

export type GeoDirectionSegmentInputType = z.infer<typeof GeoDirectionSegmentInputSchema>;
