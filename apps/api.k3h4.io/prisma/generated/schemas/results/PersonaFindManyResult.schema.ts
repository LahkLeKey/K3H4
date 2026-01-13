import * as z from 'zod';
export const PersonaFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  alias: z.string(),
  account: z.string(),
  handle: z.string().optional(),
  note: z.string().optional(),
  tags: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  assignments: z.array(z.unknown()),
  assignmentPayouts: z.array(z.unknown()),
  attributes: z.array(z.unknown()),
  compatibilitySources: z.array(z.unknown()),
  compatibilityTargets: z.array(z.unknown())
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