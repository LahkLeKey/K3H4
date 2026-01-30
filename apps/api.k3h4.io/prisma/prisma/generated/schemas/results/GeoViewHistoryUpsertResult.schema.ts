import * as z from 'zod';
export const GeoViewHistoryUpsertResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  signature: z.string(),
  zoomBand: z.number().int(),
  bboxMinLat: z.number(),
  bboxMinLng: z.number(),
  bboxMaxLat: z.number(),
  bboxMaxLng: z.number(),
  lastPoiIds: z.unknown().optional(),
  lastPoiCount: z.number().int().optional(),
  firstViewedAt: z.date(),
  lastViewedAt: z.date(),
  viewCount: z.number().int(),
  staleAfter: z.date().optional()
});