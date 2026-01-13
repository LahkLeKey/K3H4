import * as z from 'zod';

export const ProviderGrantScalarFieldEnumSchema = z.enum(['id', 'userId', 'provider', 'providerId', 'accessToken', 'scope', 'expiresAt', 'createdAt'])

export type ProviderGrantScalarFieldEnum = z.infer<typeof ProviderGrantScalarFieldEnumSchema>;