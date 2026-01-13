import * as z from 'zod';
export const AgricultureSlotDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  slotIndex: z.number().int(),
  unlockedAt: z.date(),
  costPaid: z.number(),
  plotId: z.string().optional(),
  plot: z.unknown().optional()
}));