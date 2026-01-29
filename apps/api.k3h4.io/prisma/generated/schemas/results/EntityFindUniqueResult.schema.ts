import * as z from 'zod';
export const EntityFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  actorId: z.string(),
  actor: z.unknown(),
  kind: z.unknown(),
  direction: z.unknown().optional(),
  name: z.string().optional(),
  targetType: z.string().optional(),
  targetId: z.string().optional(),
  source: z.string().optional(),
  metadata: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));