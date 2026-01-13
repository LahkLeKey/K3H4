import * as z from 'zod';
export const ArcadeMachineFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  name: z.string(),
  gameTitle: z.string(),
  status: z.string(),
  location: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
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