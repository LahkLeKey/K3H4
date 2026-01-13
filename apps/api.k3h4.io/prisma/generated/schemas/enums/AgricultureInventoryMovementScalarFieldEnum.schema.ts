import * as z from 'zod';

export const AgricultureInventoryMovementScalarFieldEnumSchema = z.enum(['id', 'userId', 'inventoryId', 'shipmentId', 'type', 'quantity', 'reason', 'createdAt', 'updatedAt'])

export type AgricultureInventoryMovementScalarFieldEnum = z.infer<typeof AgricultureInventoryMovementScalarFieldEnumSchema>;