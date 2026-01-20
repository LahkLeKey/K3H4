import * as z from 'zod';

export const GeoDemTileCacheScalarFieldEnumSchema = z.enum(['id', 'userId', 'provider', 'source', 'signature', 'z', 'x', 'y', 'format', 'url', 'data', 'byteLength', 'etag', 'cacheControl', 'expiresAt', 'fetchedAt', 'lastAccessed', 'createdAt', 'updatedAt'])

export type GeoDemTileCacheScalarFieldEnum = z.infer<typeof GeoDemTileCacheScalarFieldEnumSchema>;