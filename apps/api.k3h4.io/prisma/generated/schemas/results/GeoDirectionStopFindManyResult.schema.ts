import * as z from 'zod';
export const GeoDirectionStopFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  directionId: z.string(),
  direction: z.unknown(),
  sequence: z.number().int(),
  latitude: z.number(),
  longitude: z.number(),
  label: z.string().optional(),
  address: z.string().optional(),
  source: z.string().optional(),
  osmId: z.bigint().optional(),
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