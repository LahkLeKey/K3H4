import * as z from 'zod';
export const GeoDirectionStopCreateResultSchema = z.object({
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
});