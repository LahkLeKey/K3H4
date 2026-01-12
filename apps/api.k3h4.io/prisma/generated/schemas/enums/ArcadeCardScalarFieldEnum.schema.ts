import * as z from 'zod';

export const ArcadeCardScalarFieldEnumSchema = z.enum(['id', 'userId', 'label', 'balance', 'status', 'createdAt', 'updatedAt'])

export type ArcadeCardScalarFieldEnum = z.infer<typeof ArcadeCardScalarFieldEnumSchema>;