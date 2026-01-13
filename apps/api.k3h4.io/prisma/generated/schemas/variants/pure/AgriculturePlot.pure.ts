import * as z from 'zod';
// prettier-ignore
export const AgriculturePlotModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    name: z.string(),
    fieldCode: z.string().nullable(),
    crop: z.string(),
    stage: z.string(),
    acres: z.number(),
    health: z.string(),
    soilType: z.string().nullable(),
    irrigationZone: z.string().nullable(),
    notes: z.string().nullable(),
    lastConditionAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    cropPlans: z.array(z.unknown()),
    conditions: z.array(z.unknown()),
    tasks: z.array(z.unknown()),
    slots: z.array(z.unknown())
}).strict();

export type AgriculturePlotPureType = z.infer<typeof AgriculturePlotModelSchema>;
