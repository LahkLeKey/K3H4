import * as z from 'zod';
export const FreightLoadFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  title: z.string(),
  originName: z.string(),
  originLat: z.number(),
  originLng: z.number(),
  destinationName: z.string(),
  destinationLat: z.number(),
  destinationLng: z.number(),
  distanceKm: z.number(),
  durationMinutes: z.number().int(),
  cost: z.number(),
  status: z.string(),
  routeGeoJson: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
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