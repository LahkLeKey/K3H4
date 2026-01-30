import * as z from 'zod';
// prettier-ignore
export const EnrichmentCacheResultSchema = z.object({
    id: z.string(),
    provider: z.string(),
    namespace: z.string(),
    kind: z.string(),
    sourceKey: z.string(),
    paramsHash: z.string().nullable(),
    wikidataId: z.string().nullable(),
    payload: z.unknown().nullable(),
    status: z.string().nullable(),
    fetchedAt: z.date(),
    expiresAt: z.date().nullable(),
    note: z.string().nullable()
}).strict();

export type EnrichmentCacheResultType = z.infer<typeof EnrichmentCacheResultSchema>;
