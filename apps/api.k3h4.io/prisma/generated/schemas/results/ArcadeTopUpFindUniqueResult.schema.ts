import * as z from 'zod';
export const ArcadeTopUpFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  cardId: z.string(),
  card: z.unknown(),
  amount: z.number(),
  source: z.string(),
  createdAt: z.date()
}));