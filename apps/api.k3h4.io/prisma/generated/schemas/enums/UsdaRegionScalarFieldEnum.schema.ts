import * as z from 'zod';

export const UsdaRegionScalarFieldEnumSchema = z.enum(['id', 'dataset', 'code', 'name', 'wikidataId', 'enrichment', 'extra', 'createdAt', 'updatedAt'])

export type UsdaRegionScalarFieldEnum = z.infer<typeof UsdaRegionScalarFieldEnumSchema>;