import * as z from 'zod';
// prettier-ignore
export const OllamaOperationModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    source: z.string(),
    sessionId: z.string().nullable(),
    session: z.unknown().nullable(),
    model: z.string(),
    temperature: z.number().nullable(),
    systemPrompt: z.string().nullable(),
    requestBody: z.unknown(),
    responseBody: z.unknown().nullable(),
    statusCode: z.number().int().nullable(),
    errorMessage: z.string().nullable(),
    metadata: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type OllamaOperationPureType = z.infer<typeof OllamaOperationModelSchema>;
