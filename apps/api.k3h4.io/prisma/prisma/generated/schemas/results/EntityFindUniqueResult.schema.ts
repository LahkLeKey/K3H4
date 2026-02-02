import * as z from 'zod';
export const EntityFindUniqueResultSchema = z.nullable(z.object({
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
}));