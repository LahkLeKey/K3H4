import * as z from 'zod';
export const StaffingPlacementCreateResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  engagementId: z.string().optional(),
  engagement: z.unknown().optional(),
  roleId: z.string().optional(),
  role: z.unknown().optional(),
  candidateId: z.string().optional(),
  candidate: z.unknown().optional(),
  personaId: z.string().optional(),
  persona: z.unknown().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  status: z.string(),
  billRate: z.number().optional(),
  payRate: z.number().optional(),
  margin: z.number().optional(),
  note: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});