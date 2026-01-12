import * as z from 'zod';

export const AssignmentScalarFieldEnumSchema = z.enum(['id', 'userId', 'personaId', 'title', 'hourlyRate', 'status', 'createdAt', 'updatedAt'])

export type AssignmentScalarFieldEnum = z.infer<typeof AssignmentScalarFieldEnumSchema>;