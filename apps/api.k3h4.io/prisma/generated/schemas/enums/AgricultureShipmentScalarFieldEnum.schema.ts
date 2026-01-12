import * as z from 'zod';

export const AgricultureShipmentScalarFieldEnumSchema = z.enum(['id', 'userId', 'lot', 'destination', 'mode', 'eta', 'freightLoadId', 'createdAt', 'updatedAt'])

export type AgricultureShipmentScalarFieldEnum = z.infer<typeof AgricultureShipmentScalarFieldEnumSchema>;