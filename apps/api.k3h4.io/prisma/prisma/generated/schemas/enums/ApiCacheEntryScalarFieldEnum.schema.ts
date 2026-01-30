import * as z from 'zod';

export const ApiCacheEntryScalarFieldEnumSchema = z.enum(['id', 'provider', 'scope', 'endpoint', 'params', 'paramsHash', 'payload', 'fetchedAt', 'expiresAt', 'createdAt', 'updatedAt'])

export type ApiCacheEntryScalarFieldEnum = z.infer<typeof ApiCacheEntryScalarFieldEnumSchema>;