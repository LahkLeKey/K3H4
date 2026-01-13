import * as z from 'zod';
// prettier-ignore
export const UsdaRegionModelSchema = z.object({
    id: z.string(),
    dataset: z.string(),
    code: z.string(),
    name: z.string().nullable(),
    extra: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type UsdaRegionPureType = z.infer<typeof UsdaRegionModelSchema>;
