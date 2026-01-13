import * as z from 'zod';

export const CulinaryPrepTaskScalarFieldEnumSchema = z.enum(['id', 'userId', 'task', 'station', 'dueAt', 'status', 'createdAt', 'updatedAt'])

export type CulinaryPrepTaskScalarFieldEnum = z.infer<typeof CulinaryPrepTaskScalarFieldEnumSchema>;