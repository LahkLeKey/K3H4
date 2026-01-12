import * as z from 'zod';

export const PosStoreScalarFieldEnumSchema = z.enum(['id', 'userId', 'name', 'channel', 'createdAt', 'updatedAt'])

export type PosStoreScalarFieldEnum = z.infer<typeof PosStoreScalarFieldEnumSchema>;