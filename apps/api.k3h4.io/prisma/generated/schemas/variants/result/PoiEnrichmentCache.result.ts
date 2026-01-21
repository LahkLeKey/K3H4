import * as z from 'zod';
// prettier-ignore
export const PoiEnrichmentCacheResultSchema = z.object({
    id: z.string(),
    includeHash: z.string(),
    payload: z.unknown(),
    fetchedAt: z.date(),
    expiresAt: z.date()
}).strict();

export type PoiEnrichmentCacheResultType = z.infer<typeof PoiEnrichmentCacheResultSchema>;
