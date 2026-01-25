import * as z from 'zod';
export const ArcadeMachineUpsertResultSchema = z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  name: z.string(),
  gameTitle: z.string(),
  status: z.unknown(),
  location: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  sessions: z.array(z.unknown())
});