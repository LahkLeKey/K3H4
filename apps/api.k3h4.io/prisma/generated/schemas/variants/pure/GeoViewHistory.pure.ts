import * as z from 'zod';
// prettier-ignore
export const GeoViewHistoryModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    signature: z.string(),
    zoomBand: z.number().int(),
    bboxMinLat: z.number(),
    bboxMinLng: z.number(),
    bboxMaxLat: z.number(),
    bboxMaxLng: z.number(),
    lastPoiIds: z.unknown().nullable(),
    lastPoiCount: z.number().int().nullable(),
    firstViewedAt: z.date(),
    lastViewedAt: z.date(),
    viewCount: z.number().int(),
    staleAfter: z.date().nullable()
}).strict();

export type GeoViewHistoryPureType = z.infer<typeof GeoViewHistoryModelSchema>;
