import * as z from 'zod';
// prettier-ignore
export const OllamaOperationInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    source: z.string(),
    sessionId: z.string().optional().nullable(),
    session: z.unknown().optional().nullable(),
    model: z.string(),
    temperature: z.number().optional().nullable(),
    systemPrompt: z.string().optional().nullable(),
    requestBody: z.unknown(),
    responseBody: z.unknown().optional().nullable(),
    statusCode: z.number().int().optional().nullable(),
    errorMessage: z.string().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type OllamaOperationInputType = z.infer<typeof OllamaOperationInputSchema>;
