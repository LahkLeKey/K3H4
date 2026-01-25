import * as z from 'zod';
export const PersonaCompatibilityFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  sourceId: z.string(),
  source: z.unknown(),
  targetId: z.string(),
  target: z.unknown(),
  jaccardScore: z.number(),
  intersectionCount: z.number().int(),
  unionCount: z.number().int(),
  overlappingTokens: z.unknown().optional(),
  computedAt: z.date(),
  rationale: z.string().optional(),
  status: z.unknown()
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