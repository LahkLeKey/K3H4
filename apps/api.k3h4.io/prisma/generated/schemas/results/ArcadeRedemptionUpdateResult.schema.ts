import * as z from 'zod';
export const ArcadeRedemptionUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  cardId: z.string().optional(),
  card: z.unknown().optional(),
  prizeId: z.string(),
  prize: z.unknown(),
  status: z.string(),
  fulfilledAt: z.date().optional(),
  createdAt: z.date(),
  sessions: z.array(z.unknown())
}));