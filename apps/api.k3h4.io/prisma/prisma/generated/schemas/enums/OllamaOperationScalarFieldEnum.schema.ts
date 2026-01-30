import * as z from 'zod';

export const OllamaOperationScalarFieldEnumSchema = z.enum(['id', 'userId', 'source', 'sessionId', 'model', 'temperature', 'systemPrompt', 'requestBody', 'responseBody', 'statusCode', 'errorMessage', 'metadata', 'createdAt', 'updatedAt'])

export type OllamaOperationScalarFieldEnum = z.infer<typeof OllamaOperationScalarFieldEnumSchema>;