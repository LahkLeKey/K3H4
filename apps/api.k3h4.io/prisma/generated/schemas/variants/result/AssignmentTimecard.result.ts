import * as z from 'zod';
// prettier-ignore
export const AssignmentTimecardResultSchema = z.object({
    id: z.string(),
    assignmentId: z.string(),
    assignment: z.unknown(),
    hours: z.number(),
    amount: z.number(),
    note: z.string().nullable(),
    status: z.string(),
    createdAt: z.date()
}).strict();

export type AssignmentTimecardResultType = z.infer<typeof AssignmentTimecardResultSchema>;
