import * as z from 'zod';
export const ArcadeCardCreateResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  label: z.string().optional(),
  balance: z.number(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  topUps: z.array(z.unknown()),
  sessions: z.array(z.unknown()),
  redemptions: z.array(z.unknown())
});