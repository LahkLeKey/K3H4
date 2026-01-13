import * as z from 'zod';
export const PersonaCompatibilityFindFirstResultSchema = z.nullable(z.object({
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
  status: z.string()
}));