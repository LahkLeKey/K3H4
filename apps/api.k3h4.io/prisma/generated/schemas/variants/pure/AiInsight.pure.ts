import * as z from 'zod';
// prettier-ignore
export const AiInsightModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    targetType: z.string().nullable(),
    targetId: z.string().nullable(),
    targetLabel: z.string().nullable(),
    description: z.string(),
    metadata: z.unknown().nullable(),
    payload: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type AiInsightPureType = z.infer<typeof AiInsightModelSchema>;
