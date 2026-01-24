import * as z from 'zod';

export const UsdaUnitScalarFieldEnumSchema = z.enum(['id', 'dataset', 'code', 'name', 'wikidataId', 'enrichment', 'extra', 'createdAt', 'updatedAt'])

export type UsdaUnitScalarFieldEnum = z.infer<typeof UsdaUnitScalarFieldEnumSchema>;