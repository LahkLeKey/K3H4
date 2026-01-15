import * as z from 'zod';
// prettier-ignore
export const StaffingCandidateInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    engagementId: z.string().optional().nullable(),
    engagement: z.unknown().optional().nullable(),
    roleId: z.string().optional().nullable(),
    role: z.unknown().optional().nullable(),
    personaId: z.string().optional().nullable(),
    persona: z.unknown().optional().nullable(),
    fullName: z.string(),
    email: z.string().optional().nullable(),
    phone: z.string().optional().nullable(),
    source: z.string().optional().nullable(),
    stage: z.string(),
    score: z.number().optional().nullable(),
    desiredRate: z.number().optional().nullable(),
    availability: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    note: z.string().optional().nullable(),
    tags: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    placements: z.array(z.unknown()),
    shiftsAssigned: z.array(z.unknown())
}).strict();

export type StaffingCandidateInputType = z.infer<typeof StaffingCandidateInputSchema>;
