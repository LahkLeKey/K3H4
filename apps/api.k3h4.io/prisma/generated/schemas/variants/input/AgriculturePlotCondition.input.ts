import * as z from 'zod';
// prettier-ignore
export const AgriculturePlotConditionInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    plotId: z.string(),
    user: z.unknown(),
    plot: z.unknown(),
    recordedAt: z.date(),
    temperature: z.number().optional().nullable(),
    moisture: z.number().optional().nullable(),
    ph: z.number().optional().nullable(),
    notes: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type AgriculturePlotConditionInputType = z.infer<typeof AgriculturePlotConditionInputSchema>;
