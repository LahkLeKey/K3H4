import * as z from 'zod';
export const AiInsightCreateResultSchema = z.object({
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
});