import * as z from 'zod';
// prettier-ignore
export const AssignmentTimecardInputSchema = z.object({
    id: z.string(),
    assignmentId: z.string(),
    assignment: z.unknown(),
    hours: z.number(),
    amount: z.number(),
    note: z.string().optional().nullable(),
    status: z.string(),
    createdAt: z.date()
}).strict();

export type AssignmentTimecardInputType = z.infer<typeof AssignmentTimecardInputSchema>;
