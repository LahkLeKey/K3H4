import * as z from 'zod';
// prettier-ignore
export const FreightLoadInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    title: z.string(),
    originName: z.string(),
    originLat: z.number(),
    originLng: z.number(),
    destinationName: z.string(),
    destinationLat: z.number(),
    destinationLng: z.number(),
    distanceKm: z.number(),
    durationMinutes: z.number().int(),
    cost: z.number(),
    status: z.string(),
    routeGeoJson: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    warehouseItems: z.array(z.unknown()),
    agricultureShipments: z.array(z.unknown())
}).strict();

export type FreightLoadInputType = z.infer<typeof FreightLoadInputSchema>;
