import * as z from 'zod';
export const GeoQueryCacheFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string().optional(),
  user: z.unknown().optional(),
  type: z.string(),
  signature: z.string(),
  params: z.unknown(),
  payload: z.unknown(),
  count: z.number().int().optional(),
  expiresAt: z.date(),
  createdAt: z.date()
}));