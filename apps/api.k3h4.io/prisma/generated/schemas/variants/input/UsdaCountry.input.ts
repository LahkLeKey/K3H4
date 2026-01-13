import * as z from 'zod';
// prettier-ignore
export const UsdaCountryInputSchema = z.object({
    id: z.string(),
    dataset: z.string(),
    code: z.string(),
    name: z.string().optional().nullable(),
    regionCode: z.string().optional().nullable(),
    extra: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type UsdaCountryInputType = z.infer<typeof UsdaCountryInputSchema>;
