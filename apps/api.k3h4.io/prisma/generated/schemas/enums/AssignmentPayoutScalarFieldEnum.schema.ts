import * as z from 'zod';

export const AssignmentPayoutScalarFieldEnumSchema = z.enum(['id', 'assignmentId', 'personaId', 'amount', 'note', 'invoiceUrl', 'status', 'createdAt'])

export type AssignmentPayoutScalarFieldEnum = z.infer<typeof AssignmentPayoutScalarFieldEnumSchema>;