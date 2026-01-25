import * as z from 'zod';
export const AssignmentDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  personaId: z.string(),
  persona: z.unknown(),
  title: z.string(),
  hourlyRate: z.number(),
  status: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date(),
  timecards: z.array(z.unknown()),
  payouts: z.array(z.unknown())
}));