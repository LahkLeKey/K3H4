import * as z from 'zod';
export const OllamaOperationCreateResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  source: z.string(),
  sessionId: z.string().optional(),
  session: z.unknown().optional(),
  model: z.string(),
  temperature: z.number().optional(),
  systemPrompt: z.string().optional(),
  requestBody: z.unknown(),
  responseBody: z.unknown().optional(),
  statusCode: z.number().int().optional(),
  errorMessage: z.string().optional(),
  metadata: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});