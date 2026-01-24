import * as z from 'zod';

export const ChatSessionScalarFieldEnumSchema = z.enum(['id', 'userId', 'title', 'systemPrompt', 'model', 'temperature', 'metadata', 'createdAt', 'updatedAt'])

export type ChatSessionScalarFieldEnum = z.infer<typeof ChatSessionScalarFieldEnumSchema>;