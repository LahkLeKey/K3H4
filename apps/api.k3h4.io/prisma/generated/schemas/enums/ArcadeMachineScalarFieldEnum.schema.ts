import * as z from 'zod';

export const ArcadeMachineScalarFieldEnumSchema = z.enum(['id', 'userId', 'name', 'gameTitle', 'status', 'location', 'createdAt', 'updatedAt'])

export type ArcadeMachineScalarFieldEnum = z.infer<typeof ArcadeMachineScalarFieldEnumSchema>;