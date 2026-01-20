import * as z from 'zod';
export const GeoStatusLogFindUniqueResultSchema = z.nullable(z.object({
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
}));