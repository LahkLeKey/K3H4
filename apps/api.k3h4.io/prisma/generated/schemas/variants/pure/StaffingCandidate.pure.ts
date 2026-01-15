import * as z from 'zod';
// prettier-ignore
export const StaffingCandidateModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    engagementId: z.string().nullable(),
    engagement: z.unknown().nullable(),
    roleId: z.string().nullable(),
    role: z.unknown().nullable(),
    personaId: z.string().nullable(),
    persona: z.unknown().nullable(),
    fullName: z.string(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    source: z.string().nullable(),
    stage: z.string(),
    score: z.number().nullable(),
    desiredRate: z.number().nullable(),
    availability: z.string().nullable(),
    location: z.string().nullable(),
    note: z.string().nullable(),
    tags: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    placements: z.array(z.unknown()),
    shiftsAssigned: z.array(z.unknown())
}).strict();

export type StaffingCandidatePureType = z.infer<typeof StaffingCandidateModelSchema>;
