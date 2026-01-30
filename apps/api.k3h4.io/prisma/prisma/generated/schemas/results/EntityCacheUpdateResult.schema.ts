import * as z from 'zod';
export const EntityCacheUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  entityId: z.string(),
  entity: z.unknown(),
  key: z.string(),
  payload: z.unknown().optional(),
  expiresAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));