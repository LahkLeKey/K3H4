import * as z from 'zod';
export const AgriculturePlotAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    name: z.number(),
    fieldCode: z.number(),
    crop: z.number(),
    stage: z.number(),
    acres: z.number(),
    health: z.number(),
    soilType: z.number(),
    irrigationZone: z.number(),
    notes: z.number(),
    lastConditionAt: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    cropPlans: z.number(),
    conditions: z.number(),
    tasks: z.number(),
    slots: z.number()
  }).optional(),
  _sum: z.object({
    acres: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    acres: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    name: z.string().nullable(),
    fieldCode: z.string().nullable(),
    crop: z.string().nullable(),
    stage: z.string().nullable(),
    acres: z.number().nullable(),
    health: z.string().nullable(),
    soilType: z.string().nullable(),
    irrigationZone: z.string().nullable(),
    notes: z.string().nullable(),
    lastConditionAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    name: z.string().nullable(),
    fieldCode: z.string().nullable(),
    crop: z.string().nullable(),
    stage: z.string().nullable(),
    acres: z.number().nullable(),
    health: z.string().nullable(),
    soilType: z.string().nullable(),
    irrigationZone: z.string().nullable(),
    notes: z.string().nullable(),
    lastConditionAt: z.date().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});