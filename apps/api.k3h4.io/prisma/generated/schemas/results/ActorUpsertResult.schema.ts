import * as z from 'zod';
export const ActorUpsertResultSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  user: z.unknown().optional(),
  label: z.string(),
  type: z.unknown(),
  note: z.string().optional(),
  source: z.string().optional(),
  metadata: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  entities: z.array(z.unknown())
});