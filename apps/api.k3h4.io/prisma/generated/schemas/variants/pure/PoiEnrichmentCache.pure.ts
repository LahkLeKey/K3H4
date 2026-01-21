import * as z from 'zod';
// prettier-ignore
export const PoiEnrichmentCacheModelSchema = z.object({
    id: z.string(),
    includeHash: z.string(),
    payload: z.unknown(),
    fetchedAt: z.date(),
    expiresAt: z.date()
}).strict();

export type PoiEnrichmentCachePureType = z.infer<typeof PoiEnrichmentCacheModelSchema>;
