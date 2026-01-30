import * as z from 'zod';
// prettier-ignore
export const AiInsightInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    targetType: z.string().optional().nullable(),
    targetId: z.string().optional().nullable(),
    targetLabel: z.string().optional().nullable(),
    description: z.string(),
    metadata: z.unknown().optional().nullable(),
    payload: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type AiInsightInputType = z.infer<typeof AiInsightInputSchema>;
