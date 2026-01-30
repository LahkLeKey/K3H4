import * as z from 'zod';
export const GeoRouteCacheFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string().optional(),
  user: z.unknown().optional(),
  provider: z.string(),
  signature: z.string(),
  originLat: z.number(),
  originLng: z.number(),
  destinationLat: z.number(),
  destinationLng: z.number(),
  distanceKm: z.number(),
  durationMinutes: z.number().int().optional(),
  geojson: z.unknown().optional(),
  expiresAt: z.date(),
  createdAt: z.date(),
  directions: z.array(z.unknown())
}));