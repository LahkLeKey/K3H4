import * as z from 'zod';
// prettier-ignore
export const UsdaReleaseInputSchema = z.object({
    id: z.string(),
    dataset: z.string(),
    scope: z.string(),
    releasedOn: z.date(),
    note: z.string().optional().nullable(),
    fetchedAt: z.date(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type UsdaReleaseInputType = z.infer<typeof UsdaReleaseInputSchema>;
