import * as z from 'zod';
// prettier-ignore
export const AssignmentPayoutInputSchema = z.object({
    id: z.string(),
    assignmentId: z.string(),
    assignment: z.unknown(),
    personaId: z.string(),
    persona: z.unknown(),
    amount: z.number(),
    note: z.string().optional().nullable(),
    invoiceUrl: z.string().optional().nullable(),
    status: z.string(),
    createdAt: z.date()
}).strict();

export type AssignmentPayoutInputType = z.infer<typeof AssignmentPayoutInputSchema>;
