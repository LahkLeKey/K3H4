import * as z from 'zod';
// prettier-ignore
export const UsdaSyncStateModelSchema = z.object({
    id: z.string(),
    dataset: z.string(),
    scope: z.string(),
    lastReleaseOn: z.date().nullable(),
    lastSyncedAt: z.date().nullable(),
    note: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type UsdaSyncStatePureType = z.infer<typeof UsdaSyncStateModelSchema>;
