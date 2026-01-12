import * as z from 'zod';
// prettier-ignore
export const UsdaCommodityInputSchema = z.object({
    id: z.string(),
    dataset: z.string(),
    code: z.string(),
    name: z.string().optional().nullable(),
    extra: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type UsdaCommodityInputType = z.infer<typeof UsdaCommodityInputSchema>;
