import * as z from 'zod';

export const UsdaReleaseScalarFieldEnumSchema = z.enum(['id', 'dataset', 'scope', 'releasedOn', 'note', 'fetchedAt', 'createdAt', 'updatedAt'])

export type UsdaReleaseScalarFieldEnum = z.infer<typeof UsdaReleaseScalarFieldEnumSchema>;