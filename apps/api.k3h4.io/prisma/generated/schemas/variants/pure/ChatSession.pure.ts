import * as z from 'zod';
// prettier-ignore
export const ChatSessionModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    title: z.string().nullable(),
    systemPrompt: z.string().nullable(),
    model: z.string().nullable(),
    temperature: z.number().nullable(),
    metadata: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    messages: z.array(z.unknown())
}).strict();

export type ChatSessionPureType = z.infer<typeof ChatSessionModelSchema>;
