import * as z from 'zod';
export const GeoStatusLogFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string().optional(),
  user: z.unknown().optional(),
  status: z.string(),
  poiStatus: z.string().optional(),
  centerLat: z.number().optional(),
  centerLng: z.number().optional(),
  error: z.string().optional(),
  userAgent: z.string().optional(),
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