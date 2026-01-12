import * as z from 'zod';

export const AssignmentTimecardScalarFieldEnumSchema = z.enum(['id', 'assignmentId', 'hours', 'amount', 'note', 'status', 'createdAt'])

export type AssignmentTimecardScalarFieldEnum = z.infer<typeof AssignmentTimecardScalarFieldEnumSchema>;