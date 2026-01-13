import * as z from 'zod';
export const ArcadeSessionCreateResultSchema = z.object({
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
});