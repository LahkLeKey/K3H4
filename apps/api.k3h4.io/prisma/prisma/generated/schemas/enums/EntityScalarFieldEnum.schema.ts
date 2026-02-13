import * as z from 'zod';

export const EntityScalarFieldEnumSchema = z.enum(['id', 'actorId', 'kind', 'direction', 'name', 'targetType', 'targetId', 'source', 'metadata', 'isGlobal', 'createdAt', 'updatedAt'])

export type EntityScalarFieldEnum = z.infer<typeof EntityScalarFieldEnumSchema>;