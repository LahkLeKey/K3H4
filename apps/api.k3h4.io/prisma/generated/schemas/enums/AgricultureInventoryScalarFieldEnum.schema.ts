import * as z from 'zod';

export const AgricultureInventoryScalarFieldEnumSchema = z.enum(['id', 'userId', 'sku', 'description', 'totalQuantity', 'unit', 'location', 'status', 'createdAt', 'updatedAt'])

export type AgricultureInventoryScalarFieldEnum = z.infer<typeof AgricultureInventoryScalarFieldEnumSchema>;