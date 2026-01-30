import * as z from 'zod';
// prettier-ignore
export const ChatSessionInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    title: z.string().optional().nullable(),
    systemPrompt: z.string().optional().nullable(),
    model: z.string().optional().nullable(),
    temperature: z.number().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    messages: z.array(z.unknown()),
    ollamaOperations: z.array(z.unknown())
}).strict();

export type ChatSessionInputType = z.infer<typeof ChatSessionInputSchema>;
