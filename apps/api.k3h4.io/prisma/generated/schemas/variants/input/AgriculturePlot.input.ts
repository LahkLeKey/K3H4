import * as z from 'zod';
// prettier-ignore
export const AgriculturePlotInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    name: z.string(),
    fieldCode: z.string().optional().nullable(),
    crop: z.string(),
    stage: z.string(),
    acres: z.number(),
    health: z.string(),
    soilType: z.string().optional().nullable(),
    irrigationZone: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
    lastConditionAt: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    cropPlans: z.array(z.unknown()),
    conditions: z.array(z.unknown()),
    tasks: z.array(z.unknown()),
    slots: z.array(z.unknown())
}).strict();

export type AgriculturePlotInputType = z.infer<typeof AgriculturePlotInputSchema>;
