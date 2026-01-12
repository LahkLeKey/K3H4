import * as z from 'zod';
// prettier-ignore
export const AgricultureSlotResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    slotIndex: z.number().int(),
    unlockedAt: z.date(),
    costPaid: z.number(),
    plotId: z.string().nullable(),
    plot: z.unknown().nullable()
}).strict();

export type AgricultureSlotResultType = z.infer<typeof AgricultureSlotResultSchema>;
