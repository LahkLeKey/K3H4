import * as z from 'zod';
// prettier-ignore
export const UsdaUnitResultSchema = z.object({
    id: z.string(),
    dataset: z.string(),
    code: z.string(),
    name: z.string().nullable(),
    wikidataId: z.string().nullable(),
    enrichment: z.unknown().nullable(),
    extra: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type UsdaUnitResultType = z.infer<typeof UsdaUnitResultSchema>;
