import * as z from 'zod';
export const AssignmentFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  personaId: z.string(),
  persona: z.unknown(),
  title: z.string(),
  hourlyRate: z.number(),
  status: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  timecards: z.array(z.unknown()),
  payouts: z.array(z.unknown())
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