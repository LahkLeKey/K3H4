import * as z from 'zod';
export const AgricultureCropPlanAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    plotId: z.number(),
    user: z.number(),
    plot: z.number(),
    crop: z.number(),
    phase: z.number(),
    status: z.number(),
    startDate: z.number(),
    targetHarvestDate: z.number(),
    endDate: z.number(),
    notes: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    tasks: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    plotId: z.string().nullable(),
    crop: z.string().nullable(),
    phase: z.string().nullable(),
    startDate: z.date().nullable(),
    targetHarvestDate: z.date().nullable(),
    endDate: z.date().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    plotId: z.string().nullable(),
    crop: z.string().nullable(),
    phase: z.string().nullable(),
    startDate: z.date().nullable(),
    targetHarvestDate: z.date().nullable(),
    endDate: z.date().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});