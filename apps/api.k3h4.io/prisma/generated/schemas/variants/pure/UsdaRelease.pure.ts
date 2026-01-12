import * as z from 'zod';
// prettier-ignore
export const UsdaReleaseModelSchema = z.object({
    id: z.string(),
    dataset: z.string(),
    scope: z.string(),
    releasedOn: z.date(),
    note: z.string().nullable(),
    fetchedAt: z.date(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type UsdaReleasePureType = z.infer<typeof UsdaReleaseModelSchema>;
