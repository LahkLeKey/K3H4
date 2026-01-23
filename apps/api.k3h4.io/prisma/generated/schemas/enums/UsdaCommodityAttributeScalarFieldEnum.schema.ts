import * as z from 'zod';

export const UsdaCommodityAttributeScalarFieldEnumSchema = z.enum(['id', 'dataset', 'code', 'name', 'wikidataId', 'enrichment', 'extra', 'createdAt', 'updatedAt'])

export type UsdaCommodityAttributeScalarFieldEnum = z.infer<typeof UsdaCommodityAttributeScalarFieldEnumSchema>;