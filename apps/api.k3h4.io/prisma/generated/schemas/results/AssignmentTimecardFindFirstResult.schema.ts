import * as z from 'zod';
export const AssignmentTimecardFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  assignmentId: z.string(),
  assignment: z.unknown(),
  hours: z.number(),
  amount: z.number(),
  note: z.string().optional(),
  status: z.string(),
  createdAt: z.date()
}));