import * as z from 'zod';

export const ActorCacheScalarFieldEnumSchema = z.enum(['id', 'actorId', 'key', 'payload', 'expiresAt', 'createdAt', 'updatedAt'])

export type ActorCacheScalarFieldEnum = z.infer<typeof ActorCacheScalarFieldEnumSchema>;