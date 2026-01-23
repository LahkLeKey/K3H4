import * as z from 'zod';
// prettier-ignore
export const EnrichmentCacheInputSchema = z.object({
    id: z.string(),
    provider: z.string(),
    namespace: z.string(),
    kind: z.string(),
    sourceKey: z.string(),
    paramsHash: z.string().optional().nullable(),
    wikidataId: z.string().optional().nullable(),
    payload: z.unknown().optional().nullable(),
    status: z.string().optional().nullable(),
    fetchedAt: z.date(),
    expiresAt: z.date().optional().nullable(),
    note: z.string().optional().nullable()
}).strict();

export type EnrichmentCacheInputType = z.infer<typeof EnrichmentCacheInputSchema>;
