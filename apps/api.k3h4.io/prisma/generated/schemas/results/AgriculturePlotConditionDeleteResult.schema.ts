import * as z from 'zod';
export const AgriculturePlotConditionDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  userId: z.string(),
  plotId: z.string(),
  user: z.unknown(),
  plot: z.unknown(),
  recordedAt: z.date(),
  temperature: z.number().optional(),
  moisture: z.number().optional(),
  ph: z.number().optional(),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));