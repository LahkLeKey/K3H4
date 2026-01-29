import * as z from 'zod';

export const EntityScalarFieldEnumSchema = z.enum(['id', 'actorId', 'kind', 'name', 'targetType', 'targetId', 'source', 'metadata', 'createdAt', 'updatedAt'])

export type EntityScalarFieldEnum = z.infer<typeof EntityScalarFieldEnumSchema>;