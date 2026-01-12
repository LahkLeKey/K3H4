import * as z from 'zod';

export const ArcadeTopUpScalarFieldEnumSchema = z.enum(['id', 'userId', 'cardId', 'amount', 'source', 'createdAt'])

export type ArcadeTopUpScalarFieldEnum = z.infer<typeof ArcadeTopUpScalarFieldEnumSchema>;