import * as z from 'zod';
export const AgricultureTaskFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  plotId: z.string().optional(),
  plot: z.unknown().optional(),
  cropPlanId: z.string().optional(),
  cropPlan: z.unknown().optional(),
  title: z.string(),
  assignee: z.string().optional(),
  priority: z.number().int(),
  tags: z.unknown().optional(),
  notes: z.string().optional(),
  dueDate: z.date().optional(),
  status: z.string(),
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