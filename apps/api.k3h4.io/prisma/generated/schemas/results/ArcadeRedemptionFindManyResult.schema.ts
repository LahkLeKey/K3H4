import * as z from 'zod';
export const ArcadeRedemptionFindManyResultSchema = z.object({
  data: z.array(z.object({
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