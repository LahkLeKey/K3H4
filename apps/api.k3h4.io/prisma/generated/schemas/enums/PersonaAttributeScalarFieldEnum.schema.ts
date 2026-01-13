import * as z from 'zod';

export const PersonaAttributeScalarFieldEnumSchema = z.enum(['id', 'userId', 'personaId', 'category', 'value', 'weight', 'createdAt', 'updatedAt'])

export type PersonaAttributeScalarFieldEnum = z.infer<typeof PersonaAttributeScalarFieldEnumSchema>;