import * as z from 'zod';
// prettier-ignore
export const GeoViewHistoryInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    signature: z.string(),
    zoomBand: z.number().int(),
    bboxMinLat: z.number(),
    bboxMinLng: z.number(),
    bboxMaxLat: z.number(),
    bboxMaxLng: z.number(),
    lastPoiIds: z.unknown().optional().nullable(),
    lastPoiCount: z.number().int().optional().nullable(),
    firstViewedAt: z.date(),
    lastViewedAt: z.date(),
    viewCount: z.number().int(),
    staleAfter: z.date().optional().nullable()
}).strict();

export type GeoViewHistoryInputType = z.infer<typeof GeoViewHistoryInputSchema>;
