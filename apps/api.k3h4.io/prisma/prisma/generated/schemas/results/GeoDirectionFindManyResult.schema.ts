import * as z from 'zod';
export const GeoDirectionFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string().optional(),
  user: z.unknown().optional(),
  actorId: z.string().optional(),
  actor: z.unknown().optional(),
  provider: z.string(),
  profile: z.string().optional(),
  signature: z.string(),
  inputPoints: z.unknown().optional(),
  originLat: z.number().optional(),
  originLng: z.number().optional(),
  destinationLat: z.number().optional(),
  destinationLng: z.number().optional(),
  distanceMeters: z.number().optional(),
  durationSeconds: z.number().int().optional(),
  geometry: z.unknown().optional(),
  instructions: z.unknown().optional(),
  payload: z.unknown().optional(),
  statusCode: z.number().int().optional(),
  statusMessage: z.string().optional(),
  expiresAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  stops: z.array(z.unknown()),
  segments: z.array(z.unknown())
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