import * as z from 'zod';
// prettier-ignore
export const GeoQueryCacheInputSchema = z.object({
    id: z.string(),
    userId: z.string().optional().nullable(),
    user: z.unknown().optional().nullable(),
    type: z.string(),
    signature: z.string(),
    params: z.unknown(),
    payload: z.unknown(),
    count: z.number().int().optional().nullable(),
    expiresAt: z.date(),
    createdAt: z.date()
}).strict();

export type GeoQueryCacheInputType = z.infer<typeof GeoQueryCacheInputSchema>;
