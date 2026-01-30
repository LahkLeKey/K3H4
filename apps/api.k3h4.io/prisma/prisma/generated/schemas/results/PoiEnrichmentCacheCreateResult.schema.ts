import * as z from 'zod';
export const PoiEnrichmentCacheCreateResultSchema = z.object({
  id: z.string(),
  includeHash: z.string(),
  payload: z.unknown(),
  fetchedAt: z.date(),
  expiresAt: z.date()
});