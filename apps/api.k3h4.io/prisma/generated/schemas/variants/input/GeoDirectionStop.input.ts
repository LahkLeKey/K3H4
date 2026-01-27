import * as z from 'zod';
// prettier-ignore
export const GeoDirectionStopInputSchema = z.object({
    id: z.string(),
    directionId: z.string(),
    direction: z.unknown(),
    sequence: z.number().int(),
    latitude: z.number(),
    longitude: z.number(),
    label: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    source: z.string().optional().nullable(),
    osmId: z.bigint().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date()
}).strict();

export type GeoDirectionStopInputType = z.infer<typeof GeoDirectionStopInputSchema>;
