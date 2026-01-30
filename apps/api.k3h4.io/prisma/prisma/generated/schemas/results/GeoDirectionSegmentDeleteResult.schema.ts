import * as z from 'zod';
export const GeoDirectionSegmentDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  directionId: z.string(),
  direction: z.unknown(),
  sequence: z.number().int(),
  instruction: z.string().optional(),
  maneuverType: z.string().optional(),
  maneuverModifier: z.string().optional(),
  distanceMeters: z.number(),
  durationSeconds: z.number().int().optional(),
  startLat: z.number(),
  startLng: z.number(),
  endLat: z.number(),
  endLng: z.number(),
  geometry: z.unknown().optional(),
  metadata: z.unknown().optional(),
  createdAt: z.date()
}));