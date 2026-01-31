import * as z from 'zod';
// prettier-ignore
export const GeoDirectionInputSchema = z.object({
    id: z.string(),
    userId: z.string().optional().nullable(),
    user: z.unknown().optional().nullable(),
    actorId: z.string().optional().nullable(),
    actor: z.unknown().optional().nullable(),
    provider: z.string(),
    profile: z.string().optional().nullable(),
    signature: z.string(),
    inputPoints: z.unknown().optional().nullable(),
    originLat: z.number().optional().nullable(),
    originLng: z.number().optional().nullable(),
    destinationLat: z.number().optional().nullable(),
    destinationLng: z.number().optional().nullable(),
    distanceMeters: z.number().optional().nullable(),
    durationSeconds: z.number().int().optional().nullable(),
    geometry: z.unknown().optional().nullable(),
    instructions: z.unknown().optional().nullable(),
    payload: z.unknown().optional().nullable(),
    statusCode: z.number().int().optional().nullable(),
    statusMessage: z.string().optional().nullable(),
    expiresAt: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    stops: z.array(z.unknown()),
    segments: z.array(z.unknown())
}).strict();

export type GeoDirectionInputType = z.infer<typeof GeoDirectionInputSchema>;
