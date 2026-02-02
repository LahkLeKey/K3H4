import * as z from 'zod';
export const ActorUpdateResultSchema = z.nullable(z.object({
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
  createdAt: z.date(),
  updatedAt: z.date(),
  entities: z.array(z.unknown()),
  caches: z.array(z.unknown())
}));