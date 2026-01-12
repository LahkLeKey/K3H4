import * as z from 'zod';

export const UsdaCacheEntryScalarFieldEnumSchema = z.enum(['id', 'dataset', 'endpoint', 'params', 'paramsHash', 'payload', 'fetchedAt', 'expiresAt', 'createdAt', 'updatedAt'])

export type UsdaCacheEntryScalarFieldEnum = z.infer<typeof UsdaCacheEntryScalarFieldEnumSchema>;