import * as z from 'zod';
export const GeoViewHistoryFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});