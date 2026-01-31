import * as z from 'zod';

export const OsrmCacheEntryScalarFieldEnumSchema = z.enum(['id', 'userId', 'actorId', 'service', 'profile', 'coordinates', 'params', 'paramsHash', 'signature', 'url', 'statusCode', 'payload', 'fetchedAt', 'expiresAt', 'createdAt', 'updatedAt'])

export type OsrmCacheEntryScalarFieldEnum = z.infer<typeof OsrmCacheEntryScalarFieldEnumSchema>;