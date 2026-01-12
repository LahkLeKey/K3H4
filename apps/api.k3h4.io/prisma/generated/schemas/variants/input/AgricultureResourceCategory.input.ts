import * as z from 'zod';
// prettier-ignore
export const AgricultureResourceCategoryInputSchema = z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    description: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    resources: z.array(z.unknown())
}).strict();

export type AgricultureResourceCategoryInputType = z.infer<typeof AgricultureResourceCategoryInputSchema>;
