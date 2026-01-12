import * as z from 'zod';
export const BankTransactionFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  amount: z.number(),
  kind: z.string(),
  direction: z.string(),
  note: z.string().optional(),
  balanceAfter: z.number(),
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