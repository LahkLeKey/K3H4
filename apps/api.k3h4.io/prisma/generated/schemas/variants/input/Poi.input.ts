import * as z from 'zod';
// prettier-ignore
export const PoiInputSchema = z.object({
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
    updatedAt: z.date(),
    buildingId: z.number().int().optional().nullable(),
    building: z.unknown().optional().nullable()
}).strict();

export type PoiInputType = z.infer<typeof PoiInputSchema>;
