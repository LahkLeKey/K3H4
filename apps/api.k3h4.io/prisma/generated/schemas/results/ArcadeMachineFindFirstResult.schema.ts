import * as z from 'zod';
export const ArcadeMachineFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  name: z.string(),
  gameTitle: z.string(),
  status: z.string(),
  location: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  sessions: z.array(z.unknown())
}));