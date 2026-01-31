import * as z from 'zod';
// prettier-ignore
export const GeoDirectionModelSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    actorId: z.string().nullable(),
    actor: z.unknown().nullable(),
    provider: z.string(),
    profile: z.string().nullable(),
    signature: z.string(),
    inputPoints: z.unknown().nullable(),
    originLat: z.number().nullable(),
    originLng: z.number().nullable(),
    destinationLat: z.number().nullable(),
    destinationLng: z.number().nullable(),
    distanceMeters: z.number().nullable(),
    durationSeconds: z.number().int().nullable(),
    geometry: z.unknown().nullable(),
    instructions: z.unknown().nullable(),
    payload: z.unknown().nullable(),
    statusCode: z.number().int().nullable(),
    statusMessage: z.string().nullable(),
    expiresAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    stops: z.array(z.unknown()),
    segments: z.array(z.unknown())
}).strict();

export type GeoDirectionPureType = z.infer<typeof GeoDirectionModelSchema>;
