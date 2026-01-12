import * as z from 'zod';

export const CulinarySupplierNeedScalarFieldEnumSchema = z.enum(['id', 'userId', 'item', 'quantity', 'status', 'dueDate', 'createdAt', 'updatedAt'])

export type CulinarySupplierNeedScalarFieldEnum = z.infer<typeof CulinarySupplierNeedScalarFieldEnumSchema>;