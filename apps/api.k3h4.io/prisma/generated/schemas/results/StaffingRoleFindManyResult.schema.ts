import * as z from 'zod';
export const StaffingRoleFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  engagementId: z.string().optional(),
  engagement: z.unknown().optional(),
  title: z.string(),
  location: z.string().optional(),
  modality: z.string().optional(),
  openings: z.number().int(),
  filled: z.number().int(),
  priority: z.unknown(),
  status: z.unknown(),
  rateMin: z.number().optional(),
  rateMax: z.number().optional(),
  billRate: z.number().optional(),
  payRate: z.number().optional(),
  tags: z.string().optional(),
  skills: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  candidates: z.array(z.unknown()),
  shifts: z.array(z.unknown()),
  placements: z.array(z.unknown())
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