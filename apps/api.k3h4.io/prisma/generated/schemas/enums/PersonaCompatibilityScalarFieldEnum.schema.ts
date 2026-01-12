import * as z from 'zod';

export const PersonaCompatibilityScalarFieldEnumSchema = z.enum(['id', 'userId', 'sourceId', 'targetId', 'jaccardScore', 'intersectionCount', 'unionCount', 'overlappingTokens', 'computedAt', 'rationale', 'status'])

export type PersonaCompatibilityScalarFieldEnum = z.infer<typeof PersonaCompatibilityScalarFieldEnumSchema>;