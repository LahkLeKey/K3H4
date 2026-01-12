import * as z from 'zod';

export const ArcadePrizeScalarFieldEnumSchema = z.enum(['id', 'userId', 'name', 'sku', 'costCoins', 'stock', 'createdAt', 'updatedAt'])

export type ArcadePrizeScalarFieldEnum = z.infer<typeof ArcadePrizeScalarFieldEnumSchema>;