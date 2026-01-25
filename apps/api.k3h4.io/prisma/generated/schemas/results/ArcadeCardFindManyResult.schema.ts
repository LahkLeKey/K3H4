import * as z from 'zod';
export const ArcadeCardFindManyResultSchema = z.object({
  data: z.array(z.object({
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