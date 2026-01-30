import * as z from 'zod';

export const WikidataCacheEntryScalarFieldEnumSchema = z.enum(['id', 'resource', 'endpoint', 'params', 'paramsHash', 'url', 'statusCode', 'payload', 'fetchedAt', 'expiresAt', 'cacheControlSeconds', 'etag', 'createdAt', 'updatedAt'])

export type WikidataCacheEntryScalarFieldEnum = z.infer<typeof WikidataCacheEntryScalarFieldEnumSchema>;