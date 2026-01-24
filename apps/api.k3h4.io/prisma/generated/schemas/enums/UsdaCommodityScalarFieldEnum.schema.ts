import * as z from 'zod';

export const UsdaCommodityScalarFieldEnumSchema = z.enum(['id', 'dataset', 'code', 'name', 'wikidataId', 'enrichment', 'extra', 'createdAt', 'updatedAt'])

export type UsdaCommodityScalarFieldEnum = z.infer<typeof UsdaCommodityScalarFieldEnumSchema>;