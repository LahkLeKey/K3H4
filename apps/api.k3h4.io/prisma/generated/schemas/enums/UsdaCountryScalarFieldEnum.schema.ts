import * as z from 'zod';

export const UsdaCountryScalarFieldEnumSchema = z.enum(['id', 'dataset', 'code', 'name', 'regionCode', 'extra', 'createdAt', 'updatedAt'])

export type UsdaCountryScalarFieldEnum = z.infer<typeof UsdaCountryScalarFieldEnumSchema>;