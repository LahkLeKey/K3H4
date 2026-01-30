import * as z from 'zod';

export const GeoQueryCacheScalarFieldEnumSchema = z.enum(['id', 'userId', 'type', 'signature', 'params', 'payload', 'count', 'expiresAt', 'createdAt'])

export type GeoQueryCacheScalarFieldEnum = z.infer<typeof GeoQueryCacheScalarFieldEnumSchema>;