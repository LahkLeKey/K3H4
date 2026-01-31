import * as z from 'zod';

export const MaptilerQueryScalarFieldEnumSchema = z.enum(['id', 'userId', 'actorId', 'signature', 'kind', 'path', 'params', 'lastUsedAt', 'createdAt', 'updatedAt'])

export type MaptilerQueryScalarFieldEnum = z.infer<typeof MaptilerQueryScalarFieldEnumSchema>;