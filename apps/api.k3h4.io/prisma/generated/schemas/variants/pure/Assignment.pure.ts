import * as z from 'zod';
// prettier-ignore
export const AssignmentModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    personaId: z.string(),
    persona: z.unknown(),
    title: z.string(),
    hourlyRate: z.number(),
    status: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    timecards: z.array(z.unknown()),
    payouts: z.array(z.unknown())
}).strict();

export type AssignmentPureType = z.infer<typeof AssignmentModelSchema>;
