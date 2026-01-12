import * as z from 'zod';
export const AssignmentPayoutUpsertResultSchema = z.object({
  id: z.string(),
  assignmentId: z.string(),
  assignment: z.unknown(),
  personaId: z.string(),
  persona: z.unknown(),
  amount: z.number(),
  note: z.string().optional(),
  invoiceUrl: z.string().optional(),
  status: z.string(),
  createdAt: z.date()
});