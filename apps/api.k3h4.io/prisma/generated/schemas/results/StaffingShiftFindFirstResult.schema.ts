import * as z from 'zod';
export const StaffingShiftFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  roleId: z.string().optional(),
  role: z.unknown().optional(),
  title: z.string(),
  location: z.string().optional(),
  startsAt: z.date(),
  endsAt: z.date(),
  status: z.unknown(),
  coverageStatus: z.unknown(),
  assignedPersonaId: z.string().optional(),
  assignedPersona: z.unknown().optional(),
  assignedCandidateId: z.string().optional(),
  assignedCandidate: z.unknown().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));