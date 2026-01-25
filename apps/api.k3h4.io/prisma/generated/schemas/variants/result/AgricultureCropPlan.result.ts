import * as z from 'zod';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
// prettier-ignore
export const AgricultureCropPlanResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    plotId: z.string(),
    user: z.unknown(),
    plot: z.unknown(),
    crop: z.string(),
    phase: z.string(),
    status: LifecycleStatusSchema,
    startDate: z.date(),
    targetHarvestDate: z.date().nullable(),
    endDate: z.date().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    tasks: z.array(z.unknown())
}).strict();

export type AgricultureCropPlanResultType = z.infer<typeof AgricultureCropPlanResultSchema>;
