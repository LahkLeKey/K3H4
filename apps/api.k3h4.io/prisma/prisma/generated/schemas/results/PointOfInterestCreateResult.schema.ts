import * as z from 'zod';
export const PointOfInterestCreateResultSchema = z.object({
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
  updatedAt: z.date()
});