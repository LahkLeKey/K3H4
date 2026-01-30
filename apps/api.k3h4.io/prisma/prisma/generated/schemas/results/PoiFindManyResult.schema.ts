import * as z from 'zod';
export const PoiFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  osmType: z.string(),
  osmId: z.bigint(),
  name: z.string().optional(),
  category: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  tags: z.unknown().optional(),
  source: z.string(),
  lastSeenAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  buildingId: z.number().int().optional(),
  building: z.unknown().optional()
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