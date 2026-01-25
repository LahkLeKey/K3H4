import * as z from 'zod';
export const AgricultureTaskUpdateResultSchema = z.nullable(z.object({
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
  status: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
}));