import * as z from 'zod';
export const CulinaryPrepTaskFindUniqueResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  task: z.string(),
  station: z.string(),
  dueAt: z.date().optional(),
  status: z.unknown(),
  createdAt: z.date(),
  updatedAt: z.date()
}));