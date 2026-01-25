import * as z from 'zod';
export const ArcadeRedemptionDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  cardId: z.string().optional(),
  card: z.unknown().optional(),
  prizeId: z.string(),
  prize: z.unknown(),
  status: z.unknown(),
  fulfilledAt: z.date().optional(),
  createdAt: z.date(),
  sessions: z.array(z.unknown())
}));