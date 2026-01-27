import * as z from 'zod';
// prettier-ignore
export const GeoDirectionStopResultSchema = z.object({
    id: z.string(),
    directionId: z.string(),
    direction: z.unknown(),
    sequence: z.number().int(),
    latitude: z.number(),
    longitude: z.number(),
    label: z.string().nullable(),
    address: z.string().nullable(),
    source: z.string().nullable(),
    osmId: z.bigint().nullable(),
    metadata: z.unknown().nullable(),
    createdAt: z.date()
}).strict();

export type GeoDirectionStopResultType = z.infer<typeof GeoDirectionStopResultSchema>;
