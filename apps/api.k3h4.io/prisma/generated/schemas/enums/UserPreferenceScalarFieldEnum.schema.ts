import * as z from 'zod';

export const UserPreferenceScalarFieldEnumSchema = z.enum(['id', 'userId', 'theme', 'locale', 'timezone', 'marketingOptIn', 'note', 'createdAt', 'updatedAt'])

export type UserPreferenceScalarFieldEnum = z.infer<typeof UserPreferenceScalarFieldEnumSchema>;