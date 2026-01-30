import * as z from 'zod';
export const ActorCacheDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  actorId: z.string(),
  actor: z.unknown(),
  key: z.string(),
  payload: z.unknown().optional(),
  expiresAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));