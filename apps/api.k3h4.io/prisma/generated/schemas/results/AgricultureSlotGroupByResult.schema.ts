import * as z from 'zod';
export const AgricultureSlotGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  slotIndex: z.number().int(),
  unlockedAt: z.date(),
  costPaid: z.number(),
  plotId: z.string(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    slotIndex: z.number(),
    unlockedAt: z.number(),
    costPaid: z.number(),
    plotId: z.number(),
    plot: z.number()
  }).optional(),
  _sum: z.object({
    slotIndex: z.number().nullable(),
    costPaid: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    slotIndex: z.number().nullable(),
    costPaid: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    slotIndex: z.number().int().nullable(),
    unlockedAt: z.date().nullable(),
    costPaid: z.number().nullable(),
    plotId: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    slotIndex: z.number().int().nullable(),
    unlockedAt: z.date().nullable(),
    costPaid: z.number().nullable(),
    plotId: z.string().nullable()
  }).nullable().optional()
}));