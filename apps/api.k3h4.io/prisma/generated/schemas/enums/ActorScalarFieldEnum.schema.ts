import * as z from 'zod';

export const ActorScalarFieldEnumSchema = z.enum(['id', 'userId', 'label', 'type', 'note', 'source', 'metadata', 'createdAt', 'updatedAt'])

export type ActorScalarFieldEnum = z.infer<typeof ActorScalarFieldEnumSchema>;