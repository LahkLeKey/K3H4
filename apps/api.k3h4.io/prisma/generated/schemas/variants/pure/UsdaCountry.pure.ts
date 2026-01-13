import * as z from 'zod';
// prettier-ignore
export const UsdaCountryModelSchema = z.object({
    id: z.string(),
    dataset: z.string(),
    code: z.string(),
    name: z.string().nullable(),
    regionCode: z.string().nullable(),
    extra: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type UsdaCountryPureType = z.infer<typeof UsdaCountryModelSchema>;
