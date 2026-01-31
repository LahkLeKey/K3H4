import * as z from 'zod';

export const MaptilerCacheEntryScalarFieldEnumSchema = z.enum(['id', 'userId', 'actorId', 'queryId', 'kind', 'path', 'params', 'paramsHash', 'signature', 'method', 'responseType', 'url', 'statusCode', 'payload', 'data', 'contentType', 'cacheControl', 'fetchedAt', 'expiresAt', 'createdAt', 'updatedAt'])

export type MaptilerCacheEntryScalarFieldEnum = z.infer<typeof MaptilerCacheEntryScalarFieldEnumSchema>;