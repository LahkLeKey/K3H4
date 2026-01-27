import * as z from 'zod';

export const AiInsightScalarFieldEnumSchema = z.enum(['id', 'userId', 'targetType', 'targetId', 'targetLabel', 'description', 'metadata', 'payload', 'createdAt', 'updatedAt'])

export type AiInsightScalarFieldEnum = z.infer<typeof AiInsightScalarFieldEnumSchema>;