import * as z from 'zod';

export const PoiEnrichmentCacheScalarFieldEnumSchema = z.enum(['id', 'includeHash', 'payload', 'fetchedAt', 'expiresAt'])

export type PoiEnrichmentCacheScalarFieldEnum = z.infer<typeof PoiEnrichmentCacheScalarFieldEnumSchema>;