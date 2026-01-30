import * as z from 'zod';
// prettier-ignore
export const PoiEnrichmentCacheInputSchema = z.object({
    id: z.string(),
    includeHash: z.string(),
    payload: z.unknown(),
    fetchedAt: z.date(),
    expiresAt: z.date()
}).strict();

export type PoiEnrichmentCacheInputType = z.infer<typeof PoiEnrichmentCacheInputSchema>;
