import * as z from 'zod';

export const PersonaScalarFieldEnumSchema = z.enum(['id', 'userId', 'alias', 'account', 'handle', 'note', 'tags', 'createdAt', 'updatedAt'])

export type PersonaScalarFieldEnum = z.infer<typeof PersonaScalarFieldEnumSchema>;