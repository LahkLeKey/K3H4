import * as z from 'zod';
export const ArcadeSessionFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  machineId: z.string(),
  machine: z.unknown(),
  cardId: z.string(),
  card: z.unknown(),
  creditsSpent: z.number(),
  score: z.number().int().optional(),
  rewardRedemptionId: z.string().optional(),
  rewardRedemption: z.unknown().optional(),
  startedAt: z.date(),
  endedAt: z.date().optional()
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