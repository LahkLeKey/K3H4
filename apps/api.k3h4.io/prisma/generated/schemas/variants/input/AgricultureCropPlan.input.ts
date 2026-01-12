import * as z from 'zod';
// prettier-ignore
export const AgricultureCropPlanInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    plotId: z.string(),
    user: z.unknown(),
    plot: z.unknown(),
    crop: z.string(),
    phase: z.string(),
    status: z.string(),
    startDate: z.date(),
    targetHarvestDate: z.date().optional().nullable(),
    endDate: z.date().optional().nullable(),
    notes: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    tasks: z.array(z.unknown())
}).strict();

export type AgricultureCropPlanInputType = z.infer<typeof AgricultureCropPlanInputSchema>;
