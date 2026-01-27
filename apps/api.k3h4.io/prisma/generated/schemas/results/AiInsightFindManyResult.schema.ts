import * as z from 'zod';
export const AiInsightFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  targetType: z.string().optional(),
  targetId: z.string().optional(),
  targetLabel: z.string().optional(),
  description: z.string(),
  metadata: z.unknown().optional(),
  payload: z.unknown().optional(),
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