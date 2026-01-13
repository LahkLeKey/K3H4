import * as z from 'zod';

export const PosLineItemScalarFieldEnumSchema = z.enum(['id', 'ticketId', 'name', 'quantity', 'price', 'createdAt'])

export type PosLineItemScalarFieldEnum = z.infer<typeof PosLineItemScalarFieldEnumSchema>;