import * as z from 'zod';
export const AgricultureSlotFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  slotIndex: z.number().int(),
  unlockedAt: z.date(),
  costPaid: z.number(),
  plotId: z.string().optional(),
  plot: z.unknown().optional()
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