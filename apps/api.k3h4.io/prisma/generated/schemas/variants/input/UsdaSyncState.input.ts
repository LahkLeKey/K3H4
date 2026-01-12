import * as z from 'zod';
// prettier-ignore
export const UsdaSyncStateInputSchema = z.object({
    id: z.string(),
    dataset: z.string(),
    scope: z.string(),
    lastReleaseOn: z.date().optional().nullable(),
    lastSyncedAt: z.date().optional().nullable(),
    note: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type UsdaSyncStateInputType = z.infer<typeof UsdaSyncStateInputSchema>;
