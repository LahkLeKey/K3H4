import * as z from 'zod';
// prettier-ignore
export const AssignmentTimecardModelSchema = z.object({
    id: z.string(),
    assignmentId: z.string(),
    assignment: z.unknown(),
    hours: z.number(),
    amount: z.number(),
    note: z.string().nullable(),
    status: z.string(),
    createdAt: z.date()
}).strict();

export type AssignmentTimecardPureType = z.infer<typeof AssignmentTimecardModelSchema>;
