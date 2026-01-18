import * as z from 'zod';
export const GeoPoiCacheFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string().optional(),
  user: z.unknown().optional(),
  signature: z.string(),
  centerLat: z.number(),
  centerLng: z.number(),
  radiusM: z.number().int(),
  kinds: z.string(),
  pois: z.unknown(),
  count: z.number().int(),
  expiresAt: z.date(),
  createdAt: z.date()
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