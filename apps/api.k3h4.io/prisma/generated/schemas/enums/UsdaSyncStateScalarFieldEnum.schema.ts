import * as z from 'zod';

export const UsdaSyncStateScalarFieldEnumSchema = z.enum(['id', 'dataset', 'scope', 'lastReleaseOn', 'lastSyncedAt', 'note', 'createdAt', 'updatedAt'])

export type UsdaSyncStateScalarFieldEnum = z.infer<typeof UsdaSyncStateScalarFieldEnumSchema>;