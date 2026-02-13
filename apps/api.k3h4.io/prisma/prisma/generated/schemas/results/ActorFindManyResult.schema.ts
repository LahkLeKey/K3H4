import * as z from 'zod';
export const ActorFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string().optional(),
  user: z.unknown().optional(),
  label: z.string(),
  type: z.string(),
  note: z.string().optional(),
  source: z.string().optional(),
  metadata: z.unknown().optional(),
  category: z.string().optional(),
  lastSeenAt: z.date().optional(),
  isGlobal: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  entities: z.array(z.unknown()),
  caches: z.array(z.unknown())
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