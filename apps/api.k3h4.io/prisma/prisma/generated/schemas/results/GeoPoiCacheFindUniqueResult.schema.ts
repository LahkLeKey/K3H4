import * as z from 'zod';
export const GeoPoiCacheFindUniqueResultSchema = z.nullable(z.object({
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
}));