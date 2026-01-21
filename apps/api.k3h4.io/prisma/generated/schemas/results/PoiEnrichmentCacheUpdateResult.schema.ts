import * as z from 'zod';
export const PoiEnrichmentCacheUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  includeHash: z.string(),
  payload: z.unknown(),
  fetchedAt: z.date(),
  expiresAt: z.date()
}));