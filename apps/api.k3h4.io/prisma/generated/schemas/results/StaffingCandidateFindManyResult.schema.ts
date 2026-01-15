import * as z from 'zod';
export const StaffingCandidateFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  engagementId: z.string().optional(),
  engagement: z.unknown().optional(),
  roleId: z.string().optional(),
  role: z.unknown().optional(),
  personaId: z.string().optional(),
  persona: z.unknown().optional(),
  fullName: z.string(),
  email: z.string().optional(),
  phone: z.string().optional(),
  source: z.string().optional(),
  stage: z.string(),
  score: z.number().optional(),
  desiredRate: z.number().optional(),
  availability: z.string().optional(),
  location: z.string().optional(),
  note: z.string().optional(),
  tags: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  placements: z.array(z.unknown()),
  shiftsAssigned: z.array(z.unknown())
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