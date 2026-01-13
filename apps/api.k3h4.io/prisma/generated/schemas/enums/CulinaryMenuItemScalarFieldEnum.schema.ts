import * as z from 'zod';

export const CulinaryMenuItemScalarFieldEnumSchema = z.enum(['id', 'userId', 'name', 'prepMinutes', 'cost', 'price', 'createdAt', 'updatedAt'])

export type CulinaryMenuItemScalarFieldEnum = z.infer<typeof CulinaryMenuItemScalarFieldEnumSchema>;