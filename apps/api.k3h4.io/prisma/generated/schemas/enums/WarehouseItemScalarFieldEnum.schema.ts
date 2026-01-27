import * as z from 'zod';

export const WarehouseItemScalarFieldEnumSchema = z.enum(['id', 'userId', 'sku', 'description', 'quantity', 'location', 'status', 'freightLoadId', 'category', 'metadata', 'createdAt', 'updatedAt'])

export type WarehouseItemScalarFieldEnum = z.infer<typeof WarehouseItemScalarFieldEnumSchema>;