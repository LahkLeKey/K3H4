import * as z from 'zod';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
import { CoverageStatusSchema } from '../../enums/CoverageStatus.schema';
// prettier-ignore
export const StaffingShiftResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    roleId: z.string().nullable(),
    role: z.unknown().nullable(),
    title: z.string(),
    location: z.string().nullable(),
    startsAt: z.date(),
    endsAt: z.date(),
    status: LifecycleStatusSchema,
    coverageStatus: CoverageStatusSchema,
    assignedPersonaId: z.string().nullable(),
    assignedPersona: z.unknown().nullable(),
    assignedCandidateId: z.string().nullable(),
    assignedCandidate: z.unknown().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type StaffingShiftResultType = z.infer<typeof StaffingShiftResultSchema>;
