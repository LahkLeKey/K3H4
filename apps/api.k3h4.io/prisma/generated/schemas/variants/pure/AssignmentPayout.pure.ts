import * as z from 'zod';
// prettier-ignore
export const AssignmentPayoutModelSchema = z.object({
    id: z.string(),
    assignmentId: z.string(),
    assignment: z.unknown(),
    personaId: z.string(),
    persona: z.unknown(),
    amount: z.number(),
    note: z.string().nullable(),
    invoiceUrl: z.string().nullable(),
    status: z.string(),
    createdAt: z.date()
}).strict();

export type AssignmentPayoutPureType = z.infer<typeof AssignmentPayoutModelSchema>;
