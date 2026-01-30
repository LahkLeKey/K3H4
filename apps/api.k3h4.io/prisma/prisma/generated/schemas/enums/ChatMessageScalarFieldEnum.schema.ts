import * as z from 'zod';

export const ChatMessageScalarFieldEnumSchema = z.enum(['id', 'sessionId', 'role', 'content', 'metadata', 'createdAt'])

export type ChatMessageScalarFieldEnum = z.infer<typeof ChatMessageScalarFieldEnumSchema>;