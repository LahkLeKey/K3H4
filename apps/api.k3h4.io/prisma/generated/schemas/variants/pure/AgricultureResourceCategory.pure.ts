import * as z from 'zod';
// prettier-ignore
export const AgricultureResourceCategoryModelSchema = z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    resources: z.array(z.unknown())
}).strict();

export type AgricultureResourceCategoryPureType = z.infer<typeof AgricultureResourceCategoryModelSchema>;
