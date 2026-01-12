import * as z from 'zod';
// prettier-ignore
export const UsdaCacheEntryResultSchema = z.object({
    id: z.string(),
    dataset: z.string(),
    endpoint: z.string(),
    params: z.unknown().nullable(),
    paramsHash: z.string(),
    payload: z.unknown().nullable(),
    fetchedAt: z.date(),
    expiresAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type UsdaCacheEntryResultType = z.infer<typeof UsdaCacheEntryResultSchema>;
