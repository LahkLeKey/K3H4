import * as z from 'zod';

export const EnrichmentCacheScalarFieldEnumSchema = z.enum(['id', 'provider', 'namespace', 'kind', 'sourceKey', 'paramsHash', 'wikidataId', 'payload', 'status', 'fetchedAt', 'expiresAt', 'note'])

export type EnrichmentCacheScalarFieldEnum = z.infer<typeof EnrichmentCacheScalarFieldEnumSchema>;