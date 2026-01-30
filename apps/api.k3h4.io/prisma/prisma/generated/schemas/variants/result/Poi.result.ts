import * as z from 'zod';
// prettier-ignore
export const PoiResultSchema = z.object({
    id: z.string(),
    osmType: z.string(),
    osmId: z.bigint(),
    name: z.string().nullable(),
    category: z.string().nullable(),
    latitude: z.number(),
    longitude: z.number(),
    tags: z.unknown().nullable(),
    source: z.string(),
    lastSeenAt: z.date(),
    createdAt: z.date(),
    updatedAt: z.date(),
    buildingId: z.number().int().nullable(),
    building: z.unknown().nullable()
}).strict();

export type PoiResultType = z.infer<typeof PoiResultSchema>;
