import * as z from 'zod';

export const AgricultureResourceCategoryScalarFieldEnumSchema = z.enum(['id', 'slug', 'title', 'description', 'createdAt', 'updatedAt'])

export type AgricultureResourceCategoryScalarFieldEnum = z.infer<typeof AgricultureResourceCategoryScalarFieldEnumSchema>;