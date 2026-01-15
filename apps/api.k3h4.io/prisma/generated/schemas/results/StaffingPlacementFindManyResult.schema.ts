import * as z from 'zod';
export const StaffingPlacementFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});