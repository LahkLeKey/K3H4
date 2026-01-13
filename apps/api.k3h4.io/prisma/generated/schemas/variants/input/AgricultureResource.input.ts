import * as z from 'zod';
// prettier-ignore
export const AgricultureResourceInputSchema = z.object({
    id: z.string(),
    categoryId: z.string(),
    category: z.unknown(),
    title: z.string(),
    summary: z.string(),
    url: z.string(),
    tags: z.array(z.string()),
    source: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type AgricultureResourceInputType = z.infer<typeof AgricultureResourceInputSchema>;
