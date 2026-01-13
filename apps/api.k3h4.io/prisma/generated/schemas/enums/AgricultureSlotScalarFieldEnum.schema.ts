import * as z from 'zod';

export const AgricultureSlotScalarFieldEnumSchema = z.enum(['id', 'userId', 'slotIndex', 'unlockedAt', 'costPaid', 'plotId'])

export type AgricultureSlotScalarFieldEnum = z.infer<typeof AgricultureSlotScalarFieldEnumSchema>;