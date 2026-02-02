import * as z from 'zod';
export const EntityFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  actorId: z.string(),
  actor: z.unknown(),
  kind: z.string(),
  direction: z.string().optional(),
  name: z.string().optional(),
  targetType: z.string().optional(),
  targetId: z.string().optional(),
  source: z.string().optional(),
  metadata: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
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