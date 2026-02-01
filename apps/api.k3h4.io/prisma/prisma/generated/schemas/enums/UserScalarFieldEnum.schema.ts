import * as z from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id', 'email', 'provider', 'providerId', 'k3h4CoinBalance', 'displayName', 'avatarUrl', 'createdAt', 'updatedAt'])

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;