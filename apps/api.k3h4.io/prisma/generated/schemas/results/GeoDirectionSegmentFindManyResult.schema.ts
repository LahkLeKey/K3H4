import * as z from 'zod';
export const GeoDirectionSegmentFindManyResultSchema = z.object({
  data: z.array(z.object({
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