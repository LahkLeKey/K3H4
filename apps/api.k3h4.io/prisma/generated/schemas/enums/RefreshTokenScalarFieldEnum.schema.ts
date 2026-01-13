import * as z from 'zod';

export const RefreshTokenScalarFieldEnumSchema = z.enum(['id', 'token', 'userId', 'createdAt', 'expiresAt'])

export type RefreshTokenScalarFieldEnum = z.infer<typeof RefreshTokenScalarFieldEnumSchema>;