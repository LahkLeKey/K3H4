import * as z from 'zod';

export const UsdaCountryScalarFieldEnumSchema = z.enum(['id', 'dataset', 'code', 'name', 'regionCode', 'wikidataId', 'enrichment', 'extra', 'createdAt', 'updatedAt'])

export type UsdaCountryScalarFieldEnum = z.infer<typeof UsdaCountryScalarFieldEnumSchema>;