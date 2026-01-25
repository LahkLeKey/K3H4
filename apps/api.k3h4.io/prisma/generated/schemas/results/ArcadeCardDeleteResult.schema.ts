import * as z from 'zod';
export const ArcadeCardDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  label: z.string().optional(),
  balance: z.number(),
  status: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  topUps: z.array(z.unknown()),
  sessions: z.array(z.unknown()),
  redemptions: z.array(z.unknown())
}));