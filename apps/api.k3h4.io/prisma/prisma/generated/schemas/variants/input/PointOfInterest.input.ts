import * as z from 'zod';
// prettier-ignore
export const PointOfInterestInputSchema = z.object({
    id: z.string(),
    osmType: z.string(),
    osmId: z.bigint(),
    name: z.string().optional().nullable(),
    category: z.string().optional().nullable(),
    latitude: z.number(),
    longitude: z.number(),
    tags: z.unknown().optional().nullable(),
    source: z.string(),
    lastSeenAt: z.date(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type PointOfInterestInputType = z.infer<typeof PointOfInterestInputSchema>;
