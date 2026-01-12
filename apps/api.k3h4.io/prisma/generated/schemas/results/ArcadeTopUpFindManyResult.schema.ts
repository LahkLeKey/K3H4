import * as z from 'zod';
export const ArcadeTopUpFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  cardId: z.string(),
  card: z.unknown(),
  amount: z.number(),
  source: z.string(),
  createdAt: z.date()
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