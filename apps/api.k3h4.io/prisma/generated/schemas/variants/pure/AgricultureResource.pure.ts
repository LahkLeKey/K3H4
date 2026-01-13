import * as z from 'zod';
// prettier-ignore
export const AgricultureResourceModelSchema = z.object({
    id: z.string(),
    categoryId: z.string(),
    category: z.unknown(),
    title: z.string(),
    summary: z.string(),
    url: z.string(),
    tags: z.array(z.string()),
    source: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type AgricultureResourcePureType = z.infer<typeof AgricultureResourceModelSchema>;
