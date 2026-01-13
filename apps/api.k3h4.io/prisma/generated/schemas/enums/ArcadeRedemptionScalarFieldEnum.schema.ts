import * as z from 'zod';

export const ArcadeRedemptionScalarFieldEnumSchema = z.enum(['id', 'userId', 'cardId', 'prizeId', 'status', 'fulfilledAt', 'createdAt'])

export type ArcadeRedemptionScalarFieldEnum = z.infer<typeof ArcadeRedemptionScalarFieldEnumSchema>;