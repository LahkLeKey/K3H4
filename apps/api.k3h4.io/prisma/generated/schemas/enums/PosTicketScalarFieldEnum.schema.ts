import * as z from 'zod';

export const PosTicketScalarFieldEnumSchema = z.enum(['id', 'userId', 'storeId', 'total', 'itemsCount', 'channel', 'status', 'createdAt', 'updatedAt'])

export type PosTicketScalarFieldEnum = z.infer<typeof PosTicketScalarFieldEnumSchema>;