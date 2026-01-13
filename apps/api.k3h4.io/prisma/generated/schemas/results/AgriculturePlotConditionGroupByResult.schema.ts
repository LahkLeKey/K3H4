import * as z from 'zod';
export const AgriculturePlotConditionGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  plotId: z.string(),
  recordedAt: z.date(),
  temperature: z.number(),
  moisture: z.number(),
  ph: z.number(),
  notes: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    plotId: z.number(),
    user: z.number(),
    plot: z.number(),
    recordedAt: z.number(),
    temperature: z.number(),
    moisture: z.number(),
    ph: z.number(),
    notes: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    temperature: z.number().nullable(),
    moisture: z.number().nullable(),
    ph: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    temperature: z.number().nullable(),
    moisture: z.number().nullable(),
    ph: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    plotId: z.string().nullable(),
    recordedAt: z.date().nullable(),
    temperature: z.number().nullable(),
    moisture: z.number().nullable(),
    ph: z.number().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    plotId: z.string().nullable(),
    recordedAt: z.date().nullable(),
    temperature: z.number().nullable(),
    moisture: z.number().nullable(),
    ph: z.number().nullable(),
    notes: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));