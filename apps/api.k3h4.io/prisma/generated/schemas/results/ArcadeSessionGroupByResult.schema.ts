import * as z from 'zod';
export const ArcadeSessionGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  machineId: z.string(),
  cardId: z.string(),
  creditsSpent: z.number(),
  score: z.number().int(),
  rewardRedemptionId: z.string(),
  startedAt: z.date(),
  endedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    machineId: z.number(),
    machine: z.number(),
    cardId: z.number(),
    card: z.number(),
    creditsSpent: z.number(),
    score: z.number(),
    rewardRedemptionId: z.number(),
    rewardRedemption: z.number(),
    startedAt: z.number(),
    endedAt: z.number()
  }).optional(),
  _sum: z.object({
    creditsSpent: z.number().nullable(),
    score: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    creditsSpent: z.number().nullable(),
    score: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    machineId: z.string().nullable(),
    cardId: z.string().nullable(),
    creditsSpent: z.number().nullable(),
    score: z.number().int().nullable(),
    rewardRedemptionId: z.string().nullable(),
    startedAt: z.date().nullable(),
    endedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    machineId: z.string().nullable(),
    cardId: z.string().nullable(),
    creditsSpent: z.number().nullable(),
    score: z.number().int().nullable(),
    rewardRedemptionId: z.string().nullable(),
    startedAt: z.date().nullable(),
    endedAt: z.date().nullable()
  }).nullable().optional()
}));