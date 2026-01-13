import * as z from 'zod';
// prettier-ignore
export const AgriculturePlotConditionResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    plotId: z.string(),
    user: z.unknown(),
    plot: z.unknown(),
    recordedAt: z.date(),
    temperature: z.number().nullable(),
    moisture: z.number().nullable(),
    ph: z.number().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type AgriculturePlotConditionResultType = z.infer<typeof AgriculturePlotConditionResultSchema>;
