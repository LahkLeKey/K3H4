import * as z from 'zod';
export const AssignmentPayoutFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});