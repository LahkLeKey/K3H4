import * as z from 'zod';

export const AgricultureResourceScalarFieldEnumSchema = z.enum(['id', 'categoryId', 'title', 'summary', 'url', 'tags', 'source', 'createdAt', 'updatedAt'])

export type AgricultureResourceScalarFieldEnum = z.infer<typeof AgricultureResourceScalarFieldEnumSchema>;