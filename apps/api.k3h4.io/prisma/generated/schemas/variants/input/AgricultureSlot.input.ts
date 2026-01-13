import * as z from 'zod';
// prettier-ignore
export const AgricultureSlotInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    slotIndex: z.number().int(),
    unlockedAt: z.date(),
    costPaid: z.number(),
    plotId: z.string().optional().nullable(),
    plot: z.unknown().optional().nullable()
}).strict();

export type AgricultureSlotInputType = z.infer<typeof AgricultureSlotInputSchema>;
