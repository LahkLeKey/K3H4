import * as z from 'zod';

export const EntityCacheScalarFieldEnumSchema = z.enum(['id', 'entityId', 'key', 'payload', 'expiresAt', 'createdAt', 'updatedAt'])

export type EntityCacheScalarFieldEnum = z.infer<typeof EntityCacheScalarFieldEnumSchema>;